/**
 * ZeroTrace Robust Web Scraper & Source Extraction Service
 * Multi-layer HTML parser using Readability + Cheerio fallback + Metadata extraction + LRU Caching.
 */

const axios = require("axios");
const cheerio = require("cheerio");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");
const { cleanText } = require("../utils/normalizer");

// In-memory cache for scraped pages (URL -> { content, title, timestamp })
const SCRAPE_CACHE = new Map();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const MAX_CACHE_SIZE = 200;

// High authority domains
const HIGH_AUTHORITY_DOMAINS = new Set([
  "leetcode.com", "github.com", "stackoverflow.com", "geeksforgeeks.org",
  "developer.mozilla.org", "wikipedia.org", "w3schools.com", "arxiv.org",
  "medium.com", "hackerrank.com", "codeforces.com", "nih.gov", "ieee.org"
]);

/**
 * Checks SSRF safety to block local/private network addresses.
 */
function isSafeUrl(targetUrl) {
  try {
    const parsed = new URL(targetUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host.startsWith("192.168.") ||
      host.startsWith("10.") ||
      host.startsWith("172.16.") ||
      host.startsWith("169.254.")
    ) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Evaluates domain quality score (0.0 to 1.0).
 */
function getSourceQualityScore(domain) {
  if (!domain) return 0.5;
  const d = domain.toLowerCase().replace(/^www\./, "");
  if (HIGH_AUTHORITY_DOMAINS.has(d)) return 1.0;
  if (d.endsWith(".edu") || d.endsWith(".gov") || d.endsWith(".org")) return 0.9;
  if (d.endsWith(".ac.in") || d.endsWith(".edu.in")) return 0.9;
  return 0.7;
}

/**
 * Scrapes website content using multiple fallbacks.
 */
async function scrapeWebsite(url) {
  if (!url || typeof url !== "string" || !isSafeUrl(url)) {
    return { title: "", content: "", success: false };
  }

  // Check Cache
  const cached = SCRAPE_CACHE.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached;
  }

  try {
    const response = await axios.get(url, {
      timeout: 6000,
      maxRedirects: 5,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const html = response.data;
    if (!html || typeof html !== "string") {
      return { title: "", content: "", success: false };
    }

    let extractedText = "";
    let extractedTitle = "";

    // Layer 1: Readability parser
    try {
      const dom = new JSDOM(html, { url });
      const reader = new Readability(dom.window.document);
      const article = reader.parse();
      if (article && article.textContent && article.textContent.trim().length > 100) {
        extractedText = article.textContent;
        extractedTitle = article.title || "";
      }
    } catch (readabilityErr) {
      // Continue to Cheerio fallback
    }

    // Layer 2: Cheerio fallback if readability returned insufficient text
    if (!extractedText || extractedText.trim().length < 80) {
      const $ = cheerio.load(html);

      // Remove non-content elements
      $("script, style, noscript, nav, header, footer, aside, svg, form, iframe, button, .ad, .ads, .cookie-banner, .popup").remove();

      extractedTitle = $("title").text() || $("meta[property='og:title']").attr("content") || "";

      // Prioritize main container
      const mainContent = $("article, main, [role='main'], .content, .post-content, #content, .article-body");
      if (mainContent.length > 0) {
        extractedText = mainContent.text();
      } else {
        extractedText = $("body").text();
      }
    }

    const clean = cleanText(extractedText);
    const result = {
      title: extractedTitle.trim() || url,
      content: clean,
      success: clean.length > 0,
      timestamp: Date.now(),
    };

    // Cache result
    if (SCRAPE_CACHE.size >= MAX_CACHE_SIZE) {
      const oldestKey = SCRAPE_CACHE.keys().next().value;
      SCRAPE_CACHE.delete(oldestKey);
    }
    SCRAPE_CACHE.set(url, result);

    return result;
  } catch (err) {
    return { title: "", content: "", success: false };
  }
}

module.exports = scrapeWebsite;
module.exports.scrapeWebsite = scrapeWebsite;
module.exports.getSourceQualityScore = getSourceQualityScore;
module.exports.isSafeUrl = isSafeUrl;

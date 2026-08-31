/**
 * ZeroTrace Web Search Service
 * Integrates with Serper / Google Search to retrieve candidate source URLs.
 * Handles deduplication, timeouts, retries, and error resilience.
 */

const axios = require("axios");

/**
 * Normalizes URL by removing tracking query parameters and hash fragments.
 */
function normalizeUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    parsed.searchParams.delete("utm_source");
    parsed.searchParams.delete("utm_medium");
    parsed.searchParams.delete("utm_campaign");
    parsed.searchParams.delete("utm_term");
    parsed.searchParams.delete("utm_content");
    parsed.hash = "";
    return parsed.toString();
  } catch (e) {
    return rawUrl;
  }
}

/**
 * Extracts normalized domain name from a URL.
 */
function extractDomain(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    return parsed.hostname.replace(/^www\./, "");
  } catch (e) {
    return "";
  }
}

/**
 * Searches the web using Serper API.
 */
async function searchWeb(query, retries = 2) {
  const apiKey = process.env.SERPER_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    console.warn("[SEARCH] SERPER_API_KEY missing. Web search skipped.");
    return [];
  }

  if (!query || typeof query !== "string" || query.trim().length < 3) {
    return [];
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios({
        method: "post",
        url: "https://google.serper.dev/search",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        data: {
          q: query,
          num: 10,
        },
        timeout: 6000,
      });

      const organic = response.data?.organic || [];
      const results = [];

      for (const item of organic) {
        if (!item.link) continue;
        const normalizedLink = normalizeUrl(item.link);
        const domain = extractDomain(normalizedLink);

        results.push({
          title: item.title || domain,
          link: normalizedLink,
          snippet: item.snippet || "",
          domain,
          position: item.position || 0,
        });
      }

      return results;
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        console.warn(`[SEARCH] Serper authentication error (${status}). Check SERPER_API_KEY.`);
        return [];
      }
      if (attempt === retries) {
        console.warn(`[SEARCH] Search query failed after ${retries} attempts: "${query}". (${err.message})`);
        return [];
      }
      // Wait briefly before retry
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return [];
}

module.exports = searchWeb;
module.exports.searchWeb = searchWeb;
module.exports.normalizeUrl = normalizeUrl;
module.exports.extractDomain = extractDomain;

/**
 * ZeroTrace Plagiarism Detection Engine
 * Comprehensive multi-layer detection pipeline executing:
 * Normalization -> Query Generation -> Retrieval -> Scraping ->
 * Multi-Signal Matching -> Passage Alignment -> Token Coverage Scoring -> Source Ranking.
 */

const { cleanText } = require("../utils/normalizer");
const { extractSentences } = require("../utils/sentenceUtils");
const { tokenizeWords } = require("../utils/tokenizer");
const { generateQueries } = require("../utils/queryGenerator");
const { searchWeb, extractDomain } = require("../services/searchService");
const { scrapeWebsite, getSourceQualityScore } = require("../services/scraperService");
const { findBestPassageMatch } = require("./rankingEngine");
const { computeDocumentScore } = require("../utils/scoringEngine");

/**
 * Main Plagiarism Engine execution function.
 * @param {string} text - The input text to check.
 * @param {Object} [options] - Optional configurations (e.g. referenceDocs, localOnly).
 */
async function plagiarismEngine(text, options = {}) {
  const cleanedText = cleanText(text);

  if (!cleanedText || cleanedText.trim().length === 0) {
    return {
      plagiarismScore: 0,
      risk: "LOW",
      analysis: { exactMatch: 0, nearExactMatch: 0, semanticSimilarity: 0 },
      matchedSources: [],
      matchedSentences: [],
      stats: { inputWords: 0, matchedWords: 0, totalSentences: 0, matchedSentencesCount: 0, coveragePercent: 0 },
      warnings: [],
    };
  }

  const warnings = [];
  const candidatePages = [];

  // 1. Add any local reference documents provided
  if (options.referenceDocs && Array.isArray(options.referenceDocs)) {
    for (const doc of options.referenceDocs) {
      if (doc.content) {
        candidatePages.push({
          link: doc.link || "Internal Document",
          title: doc.title || "Internal Document",
          domain: doc.domain || "internal",
          content: doc.content,
        });
      }
    }
  }

  if (options.referenceText) {
    candidatePages.push({
      link: "Direct Comparison",
      title: "Comparison Target Document",
      domain: "internal",
      content: options.referenceText,
    });
  }

  // 2. Web Retrieval (unless localOnly is requested)
  if (!options.localOnly) {
    const queries = generateQueries(cleanedText, 4);
    console.log(`[PLAGIARISM] Generated ${queries.length} queries:`, queries);

    let searchResults = [];
    try {
      const searchPromises = queries.map((q) => searchWeb(q));
      const nestedResults = await Promise.all(searchPromises);
      searchResults = nestedResults.flat();
    } catch (searchErr) {
      console.warn("[SEARCH] Web retrieval error:", searchErr.message);
    }

    if (searchResults.length === 0 && candidatePages.length === 0) {
      warnings.push("Web verification unavailable or returned no candidate links.");
    }

    // Deduplicate search results by URL
    const uniqueUrlMap = new Map();
    for (const res of searchResults) {
      if (res.link && !uniqueUrlMap.has(res.link)) {
        uniqueUrlMap.set(res.link, res);
      }
    }

    const candidateUrls = Array.from(uniqueUrlMap.values()).slice(0, 8);
    console.log(`[PLAGIARISM] Scraping ${candidateUrls.length} candidate URLs...`);

    // Scrape candidate web pages in parallel
    const scrapedResults = await Promise.all(
      candidateUrls.map(async (item) => {
        const scrapeRes = await scrapeWebsite(item.link);
        return {
          link: item.link,
          title: scrapeRes.title || item.title || item.domain,
          domain: item.domain || extractDomain(item.link),
          content: scrapeRes.content,
          quality: getSourceQualityScore(item.domain),
        };
      })
    );

    for (const p of scrapedResults) {
      if (p.content && p.content.length > 30) {
        candidatePages.push(p);
      }
    }
  }

  console.log(`[PLAGIARISM] Comparing against ${candidatePages.length} candidate sources...`);

  // 3. Segment input into sentences / clauses
  const inputSentences = extractSentences(cleanedText);
  const matchedPassages = [];
  const sourceStatsMap = new Map();

  for (const inputSent of inputSentences) {
    const match = await findBestPassageMatch(inputSent, candidatePages);
    if (!match) continue;

    matchedPassages.push({
      inputPassage: inputSent,
      matchedPassage: match.matchedPassage,
      sourceUrl: match.sourceUrl,
      sourceTitle: match.sourceTitle,
      sourceDomain: match.sourceDomain,
      similarity: match.similarity,
      score: match.score,
      matchType: match.matchType,
      confidence: match.confidence,
    });

    // Accumulate source stats
    const srcKey = match.sourceUrl;
    if (!sourceStatsMap.has(srcKey)) {
      sourceStatsMap.set(srcKey, {
        title: match.sourceTitle,
        link: match.sourceUrl,
        domain: match.sourceDomain,
        matchedCount: 0,
        highestSimilarity: 0,
        confidences: new Set(),
      });
    }

    const sEntry = sourceStatsMap.get(srcKey);
    sEntry.matchedCount++;
    sEntry.highestSimilarity = Math.max(sEntry.highestSimilarity, match.similarity);
    sEntry.confidences.add(match.confidence);
  }

  // 4. Compute Document-level coverage score
  const docScoreResult = computeDocumentScore(cleanedText, matchedPassages);

  // 5. Format and rank sources
  const totalInputSentences = inputSentences.length || 1;
  const matchedSources = Array.from(sourceStatsMap.values())
    .map((s) => {
      let overallConf = "LOW";
      if (s.confidences.has("VERY HIGH")) overallConf = "VERY HIGH";
      else if (s.confidences.has("HIGH")) overallConf = "HIGH";
      else if (s.confidences.has("MEDIUM")) overallConf = "MEDIUM";

      return {
        title: s.title,
        link: s.link,
        domain: s.domain,
        matchedPassages: s.matchedCount,
        score: s.highestSimilarity,
        coveragePercent: Math.min(100, Math.round((s.matchedCount / totalInputSentences) * 100)),
        confidence: overallConf,
      };
    })
    .sort((a, b) => b.score - a.score || b.matchedPassages - a.matchedPassages);

  // 6. Format matched sentences for UI / reports
  const matchedSentences = matchedPassages.map((m) => ({
    sentence: m.inputPassage,
    matchedPassage: m.matchedPassage,
    source: m.sourceUrl,
    sourceTitle: m.sourceTitle,
    score: m.similarity,
    matchType: m.matchType,
    confidence: m.confidence,
  }));

  const inputWords = tokenizeWords(cleanedText, false).length;

  console.log(`[PLAGIARISM] Analysis Complete. Score: ${docScoreResult.overallScore}%, Matches: ${matchedPassages.length}`);

  return {
    plagiarismScore: docScoreResult.overallScore,
    risk: docScoreResult.riskLevel,
    analysis: {
      exactMatch: docScoreResult.exactMatchScore,
      nearExactMatch: docScoreResult.nearExactScore,
      semanticSimilarity: docScoreResult.semanticScore,
    },
    matchedSources,
    matchedSentences,
    stats: {
      inputWords,
      matchedWords: docScoreResult.matchedTokens,
      totalSentences: inputSentences.length,
      matchedSentencesCount: matchedPassages.length,
      coveragePercent: docScoreResult.coveragePercent,
    },
    warnings,
  };
}

module.exports = plagiarismEngine;
module.exports.plagiarismEngine = plagiarismEngine;

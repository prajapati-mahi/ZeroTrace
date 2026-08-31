/**
 * ZeroTrace Adaptive Search Query Generator
 * Produces multi-strategy search queries for exact phrase, distinctive phrases,
 * technical keywords, and relaxed searches without damaging stemming or stopwords.
 */

const { extractSentences } = require("./sentenceUtils");
const { tokenizeWords, extractDistinctiveTokens } = require("./tokenizer");

/**
 * Generates an array of search queries for a given input text.
 */
function generateQueries(text, maxQueries = 5) {
  if (!text || typeof text !== "string") return [];
  const cleanInput = text.trim();
  if (cleanInput.length === 0) return [];

  const sentences = extractSentences(cleanInput);
  const words = tokenizeWords(cleanInput, false);
  const queries = [];

  // Strategy 1: Exact Quoted Phrase for short or distinctive text (best for copy-paste)
  if (words.length <= 12 && words.length >= 3) {
    queries.push(`"${cleanInput.replace(/"/g, "")}"`);
  } else if (words.length > 12) {
    // Take a distinctive 6-8 word sub-phrase and quote it
    const distinctiveSlice = words.slice(0, 8).join(" ");
    queries.push(`"${distinctiveSlice}"`);
  }

  // Strategy 2: First Sentence Query (unquoted)
  if (sentences.length > 0) {
    const firstSent = sentences[0].replace(/[^\w\s]/g, " ").trim();
    if (firstSent.length > 0) {
      queries.push(firstSent.substring(0, 120));
    }
  }

  // Strategy 3: Middle / Second Sentence Query (for longer texts)
  if (sentences.length > 1) {
    const midIdx = Math.floor(sentences.length / 2);
    const midSent = sentences[midIdx].replace(/[^\w\s]/g, " ").trim();
    if (midSent.length > 0) {
      queries.push(midSent.substring(0, 120));
    }
  }

  // Strategy 4: Distinctive Keywords + Domain Hints for Technical / Coding Questions
  const distinctive = extractDistinctiveTokens(cleanInput, 8);
  if (distinctive.length >= 2) {
    queries.push(distinctive.join(" "));
  }

  // Strategy 5: Relaxed Short Search (for fallback)
  if (words.length >= 4) {
    const relaxed = words.slice(0, 6).join(" ");
    queries.push(relaxed);
  } else if (words.length > 0) {
    queries.push(words.join(" "));
  }

  // Deduplicate queries and filter out empty / single-character queries
  const uniqueQueries = Array.from(
    new Set(queries.map((q) => q.trim()).filter((q) => q.length >= 3))
  );

  return uniqueQueries.slice(0, maxQueries);
}

module.exports = generateQueries;
module.exports.generateQueries = generateQueries;

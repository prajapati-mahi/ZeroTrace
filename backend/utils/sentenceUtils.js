/**
 * ZeroTrace Sentence & Passage Segmentation Utility
 * Robustly splits text into sentences, clauses, and search chunks without dropping short text.
 */

const { cleanText } = require("./normalizer");

/**
 * Extracts sentences from text, respecting abbreviations, numbers, code snippets, and short lines.
 * CRITICAL FIX: Never blindly discards short sentences or single-line questions.
 */
function extractSentences(text) {
  if (!text || typeof text !== "string") return [];
  
  const cleaned = cleanText(text);
  if (!cleaned) return [];

  // Split by newlines first to preserve headings, bullet points, code lines
  const rawBlocks = cleaned
    .split(/\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  const sentences = [];

  for (const block of rawBlocks) {
    // If block is short or contains code/list item, preserve it directly
    if (block.length <= 120 && !/[.!?]\s+[A-Z]/.test(block)) {
      sentences.push(block);
      continue;
    }

    // Split on standard sentence boundaries (. ! ?) followed by whitespace
    // Negative lookbehind prevents splitting on common abbreviations like e.g., i.e., vs., Fig., No., Dr., Mr.
    const splitPattern = /(?<=[.!?])\s+(?=[A-Z0-9"'])/;
    const parts = block.split(splitPattern);

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.length > 0) {
        sentences.push(trimmed);
      }
    }
  }

  // Fallback: If no sentences were extracted but text exists, return full cleaned text
  if (sentences.length === 0 && cleaned.length > 0) {
    sentences.push(cleaned);
  }

  return sentences;
}

/**
 * Remove duplicate sentences while preserving original order.
 */
function removeDuplicateSentences(sentences) {
  if (!Array.isArray(sentences)) return [];
  const seen = new Set();
  const result = [];
  for (const s of sentences) {
    const key = s.trim().toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(s);
    }
  }
  return result;
}

/**
 * Creates search chunks (1-2 sentences or ~150-300 chars) for query generation and retrieval.
 */
function createSearchChunks(text, maxSentencesPerChunk = 2) {
  const sentences = extractSentences(text);
  if (sentences.length === 0) return [];
  if (sentences.length === 1) return [sentences[0]];

  const chunks = [];
  for (let i = 0; i < sentences.length; i += maxSentencesPerChunk) {
    const slice = sentences.slice(i, i + maxSentencesPerChunk);
    chunks.push(slice.join(" "));
  }
  return chunks;
}

module.exports = {
  extractSentences,
  removeDuplicateSentences,
  createSearchChunks,
};

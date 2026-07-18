/**
 * Extracts clean sentences from a block of text.
 */

const extractSentences = (text) => {
  if (!text || typeof text !== "string") {
    return [];
  }

  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 20);
};

/**
 * Remove duplicate sentences.
 */

const removeDuplicateSentences = (sentences) => {
  return [...new Set(sentences)];
};

/**
 * Split text into search chunks.
 * Each chunk contains ~2 sentences.
 */

const createSearchChunks = (text) => {
  const sentences = extractSentences(text);

  const chunks = [];

  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(
      sentences
        .slice(i, i + 2)
        .join(" ")
    );
  }

  return chunks;
};

module.exports = {
  extractSentences,
  removeDuplicateSentences,
  createSearchChunks,
};
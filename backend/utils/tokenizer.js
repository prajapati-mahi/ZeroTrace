/**
 * ZeroTrace Tokenizer Utility
 * Generates tokens, n-grams, shingles, and lexical representations for text and code.
 */

const { normalizeForComparison } = require("./normalizer");

// Standard minimal English stopwords (common grammatical glue, but keeping domain words)
const STANDARD_STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't",
  "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
  "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
  "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here",
  "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i",
  "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's",
  "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought",
  "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she",
  "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such",
  "than", "that", "that's", "the", "their", "theirs", "them", "themselves",
  "then", "there", "there's", "these", "they", "they'd", "they'll", "they're",
  "they've", "this", "those", "through", "to", "too", "under", "until", "up",
  "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
  "weren't", "what", "what's", "when", "when's", "where", "where's", "which",
  "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would",
  "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours",
  "yourself", "yourselves"
]);

/**
 * Tokenizes text into words, preserving alphanumeric words, digits, and underscores.
 */
function tokenizeWords(text, removeStopwords = false) {
  if (!text || typeof text !== "string") return [];
  const normalized = normalizeForComparison(text);
  if (!normalized) return [];
  
  const tokens = normalized.split(/\s+/).filter(Boolean);
  if (!removeStopwords) return tokens;
  
  return tokens.filter((t) => !STANDARD_STOPWORDS.has(t) && t.length > 1);
}

/**
 * Generates n-gram word sequences from a list of tokens or text.
 */
function generateWordNgrams(tokensOrText, n = 3) {
  const tokens = Array.isArray(tokensOrText)
    ? tokensOrText
    : tokenizeWords(tokensOrText);
  
  if (tokens.length < n) {
    return tokens.length > 0 ? [tokens.join(" ")] : [];
  }
  
  const ngrams = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(" "));
  }
  return ngrams;
}

/**
 * Generates character n-grams (e.g. 5-grams) for robust spelling/fuzzy comparison.
 */
function generateCharNgrams(text, n = 5) {
  const clean = normalizeForComparison(text).replace(/\s+/g, " ");
  if (clean.length < n) return clean.length > 0 ? [clean] : [];
  
  const ngrams = [];
  for (let i = 0; i <= clean.length - n; i++) {
    ngrams.push(clean.substring(i, i + n));
  }
  return ngrams;
}

/**
 * Extracts distinctive key phrases and tokens from text.
 */
function extractDistinctiveTokens(text, maxCount = 20) {
  const tokens = tokenizeWords(text, true);
  const freq = new Map();
  
  tokens.forEach((t) => {
    freq.set(t, (freq.get(t) || 0) + 1);
  });
  
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxCount)
    .map(([term]) => term);
}

module.exports = {
  STANDARD_STOPWORDS,
  tokenizeWords,
  generateWordNgrams,
  generateCharNgrams,
  extractDistinctiveTokens,
};

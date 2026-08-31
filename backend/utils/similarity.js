/**
 * ZeroTrace Multi-Signal Lexical & Statistical Similarity Utility
 * Computes Jaccard, Dice, N-Gram Shingles, TF-IDF Cosine, LCS, and Levenshtein metrics.
 */

const { normalizeForComparison } = require("./normalizer");
const { tokenizeWords, generateWordNgrams } = require("./tokenizer");

/**
 * Exact string match after full normalization.
 */
function exactNormalizedMatch(text1, text2) {
  const norm1 = normalizeForComparison(text1);
  const norm2 = normalizeForComparison(text2);
  if (!norm1 || !norm2) return 0;
  if (norm1 === norm2) return 1.0;
  if (norm1.includes(norm2) || norm2.includes(norm1)) {
    const minLen = Math.min(norm1.length, norm2.length);
    const maxLen = Math.max(norm1.length, norm2.length);
    return maxLen > 0 ? minLen / maxLen : 0;
  }
  return 0;
}

/**
 * Jaccard similarity over word tokens.
 */
function jaccardSimilarity(tokens1, tokens2) {
  if (!tokens1 || !tokens2 || tokens1.length === 0 || tokens2.length === 0) return 0;
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  let intersection = 0;
  for (const item of set1) {
    if (set2.has(item)) intersection++;
  }

  const union = new Set([...set1, ...set2]).size;
  return union > 0 ? intersection / union : 0;
}

/**
 * Sorensen-Dice coefficient over word tokens.
 */
function diceSimilarity(tokens1, tokens2) {
  if (!tokens1 || !tokens2 || tokens1.length === 0 || tokens2.length === 0) return 0;
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  let intersection = 0;
  for (const item of set1) {
    if (set2.has(item)) intersection++;
  }

  return (2 * intersection) / (set1.size + set2.size);
}

/**
 * N-gram overlap and containment ratio.
 */
function ngramOverlap(text1, text2, n = 3) {
  const ngrams1 = generateWordNgrams(text1, n);
  const ngrams2 = generateWordNgrams(text2, n);

  if (ngrams1.length === 0 || ngrams2.length === 0) return { jaccard: 0, containment: 0 };

  const set1 = new Set(ngrams1);
  const set2 = new Set(ngrams2);

  let intersection = 0;
  for (const ng of set1) {
    if (set2.has(ng)) intersection++;
  }

  const union = new Set([...set1, ...set2]).size;
  const jaccard = union > 0 ? intersection / union : 0;
  const containment = set1.size > 0 ? intersection / set1.size : 0;

  return { jaccard, containment };
}

/**
 * Computes Longest Common Subsequence (LCS) ratio between word token arrays.
 */
function lcsTokenSimilarity(tokens1, tokens2) {
  if (!tokens1 || !tokens2 || tokens1.length === 0 || tokens2.length === 0) return 0;

  const m = tokens1.length;
  const n = tokens2.length;
  // Optimize memory: use 2 rows for DP
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (tokens1[i - 1] === tokens2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    prev = [...curr];
  }

  const lcsLength = curr[n];
  const maxLen = Math.max(m, n);
  return maxLen > 0 ? lcsLength / maxLen : 0;
}

/**
 * Build term-frequency vector with sublinear scaling: 1 + log(tf).
 */
function computeTfVector(tokens) {
  const tf = {};
  for (const t of tokens) {
    tf[t] = (tf[t] || 0) + 1;
  }
  for (const t in tf) {
    tf[t] = 1 + Math.log(tf[t]);
  }
  return tf;
}

/**
 * Cosine similarity between two TF-IDF / TF vectors.
 */
function cosineVectorSimilarity(vec1, vec2) {
  let dot = 0;
  let mag1 = 0;
  let mag2 = 0;

  for (const k in vec1) {
    mag1 += vec1[k] * vec1[k];
    if (vec2[k]) {
      dot += vec1[k] * vec2[k];
    }
  }

  for (const k in vec2) {
    mag2 += vec2[k] * vec2[k];
  }

  if (mag1 === 0 || mag2 === 0) return 0;
  return dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

/**
 * TF-IDF Cosine similarity between two text strings.
 */
function tfidfCosineSimilarity(text1, text2) {
  const tokens1 = tokenizeWords(text1, false);
  const tokens2 = tokenizeWords(text2, false);

  if (tokens1.length === 0 || tokens2.length === 0) return 0;

  const vec1 = computeTfVector(tokens1);
  const vec2 = computeTfVector(tokens2);

  return cosineVectorSimilarity(vec1, vec2);
}

/**
 * Normalized Levenshtein distance similarity (0.0 to 1.0).
 */
function levenshteinSimilarity(s1, s2) {
  const str1 = normalizeForComparison(s1);
  const str2 = normalizeForComparison(s2);
  if (!str1 || !str2) return 0;
  if (str1 === str2) return 1.0;

  const len1 = str1.length;
  const len2 = str2.length;
  if (Math.abs(len1 - len2) > Math.max(len1, len2) * 0.7) return 0; // Quick cutoff

  let prev = Array.from({ length: len2 + 1 }, (_, i) => i);
  let curr = new Array(len2 + 1).fill(0);

  for (let i = 1; i <= len1; i++) {
    curr[0] = i;
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = [...curr];
  }

  const distance = curr[len2];
  const maxLen = Math.max(len1, len2);
  return maxLen > 0 ? 1 - distance / maxLen : 0;
}

/**
 * Comprehensive multi-signal lexical comparison between two text units.
 */
function compareLexical(text1, text2) {
  const exact = exactNormalizedMatch(text1, text2);
  if (exact === 1.0) {
    return {
      exact: 1.0,
      jaccard: 1.0,
      dice: 1.0,
      ngram3: 1.0,
      ngram4: 1.0,
      tfidf: 1.0,
      lcs: 1.0,
      compositeScore: 1.0,
    };
  }

  const tokens1 = tokenizeWords(text1, false);
  const tokens2 = tokenizeWords(text2, false);

  const jaccard = jaccardSimilarity(tokens1, tokens2);
  const dice = diceSimilarity(tokens1, tokens2);
  const ng3 = ngramOverlap(text1, text2, 3);
  const ng4 = ngramOverlap(text1, text2, 4);
  const tfidf = tfidfCosineSimilarity(text1, text2);
  const lcs = lcsTokenSimilarity(tokens1, tokens2);

  // Composite lexical score
  const compositeScore =
    exact * 0.3 +
    ng3.containment * 0.25 +
    tfidf * 0.2 +
    dice * 0.15 +
    lcs * 0.1;

  return {
    exact,
    jaccard,
    dice,
    ngram3: ng3.containment,
    ngram4: ng4.containment,
    tfidf,
    lcs,
    compositeScore: Math.min(1.0, compositeScore),
  };
}

/**
 * Backward compatibility: export default similarity calculator.
 */
function calculateSimilarity(text1, text2) {
  const result = compareLexical(text1, text2);
  return result.compositeScore;
}

module.exports = calculateSimilarity;
module.exports.calculateSimilarity = calculateSimilarity;
module.exports.exactNormalizedMatch = exactNormalizedMatch;
module.exports.jaccardSimilarity = jaccardSimilarity;
module.exports.diceSimilarity = diceSimilarity;
module.exports.ngramOverlap = ngramOverlap;
module.exports.lcsTokenSimilarity = lcsTokenSimilarity;
module.exports.tfidfCosineSimilarity = tfidfCosineSimilarity;
module.exports.levenshteinSimilarity = levenshteinSimilarity;
module.exports.compareLexical = compareLexical;

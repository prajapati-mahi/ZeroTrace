/**
 * ZeroTrace Document Fingerprinting & Shingling Utility
 * Implements Word Shingles, MinHash, and the Winnowing Algorithm for near-exact and copy-paste detection.
 */

const { tokenizeWords, generateWordNgrams } = require("./tokenizer");

/**
 * 32-bit FNV-1a Hash for string tokens and shingles.
 */
function fnv1aHash(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0; // Ensure unsigned 32-bit integer
}

/**
 * Generates hashed k-shingles from text.
 */
function generateShingleHashes(text, k = 4) {
  const tokens = tokenizeWords(text, false);
  if (tokens.length < k) {
    if (tokens.length === 0) return [];
    return [{ hash: fnv1aHash(tokens.join(" ")), pos: 0, text: tokens.join(" ") }];
  }

  const shingles = [];
  for (let i = 0; i <= tokens.length - k; i++) {
    const shingleText = tokens.slice(i, i + k).join(" ");
    shingles.push({
      hash: fnv1aHash(shingleText),
      pos: i,
      text: shingleText,
    });
  }
  return shingles;
}

/**
 * Winnowing Algorithm
 * Selects minimum hash within a sliding window of size w to create robust document fingerprints.
 * Guarantee: Any match of length >= (w + k - 1) tokens is guaranteed to be detected.
 */
function winnow(text, k = 4, w = 4) {
  const shingles = generateShingleHashes(text, k);
  if (shingles.length === 0) return [];
  if (shingles.length <= w) {
    // If fewer shingles than window size, take minimum
    let minShingle = shingles[0];
    for (let i = 1; i < shingles.length; i++) {
      if (shingles[i].hash < minShingle.hash) {
        minShingle = shingles[i];
      }
    }
    return [minShingle];
  }

  const fingerprints = [];
  let lastMinPos = -1;

  for (let i = 0; i <= shingles.length - w; i++) {
    const window = shingles.slice(i, i + w);
    // Find rightmost minimum in the window
    let minObj = window[0];
    for (let j = 1; j < window.length; j++) {
      if (window[j].hash <= minObj.hash) {
        minObj = window[j];
      }
    }

    if (minObj.pos !== lastMinPos) {
      fingerprints.push(minObj);
      lastMinPos = minObj.pos;
    }
  }

  return fingerprints;
}

/**
 * Calculates Jaccard / Overlap similarity between two sets of fingerprints.
 */
function compareFingerprints(fp1, fp2) {
  if (!fp1 || !fp2 || fp1.length === 0 || fp2.length === 0) {
    return { similarity: 0, matchedHashes: 0, totalHashes: 0 };
  }

  const set1 = new Set(fp1.map((f) => f.hash));
  const set2 = new Set(fp2.map((f) => f.hash));

  let intersection = 0;
  for (const h of set1) {
    if (set2.has(h)) intersection++;
  }

  const union = new Set([...set1, ...set2]).size;
  const jaccard = union > 0 ? intersection / union : 0;
  // Containment score relative to first document (useful for subset / copied passage detection)
  const containment = set1.size > 0 ? intersection / set1.size : 0;

  return {
    similarity: jaccard,
    containment,
    matchedHashes: intersection,
    total1: set1.size,
    total2: set2.size,
  };
}

/**
 * MinHash Signature generator for large corpus indexing.
 */
function computeMinHashSignature(tokens, numHashes = 64) {
  if (!tokens || tokens.length === 0) return new Array(numHashes).fill(0);

  const signature = new Array(numHashes).fill(Infinity);
  // Linear congruential hash parameters
  for (let i = 0; i < tokens.length; i++) {
    const tokenHash = fnv1aHash(tokens[i]);
    for (let h = 0; h < numHashes; h++) {
      const a = (h * 1103515245 + 12345) & 0x7fffffff;
      const b = (h * 214013 + 2531011) & 0x7fffffff;
      const hashVal = ((a * tokenHash + b) >>> 0) % 0x7fffffff;
      if (hashVal < signature[h]) {
        signature[h] = hashVal;
      }
    }
  }
  return signature;
}

/**
 * Estimates Jaccard similarity between two MinHash signatures.
 */
function minHashSimilarity(sig1, sig2) {
  if (!sig1 || !sig2 || sig1.length !== sig2.length || sig1.length === 0) return 0;
  let matches = 0;
  for (let i = 0; i < sig1.length; i++) {
    if (sig1[i] === sig2[i]) matches++;
  }
  return matches / sig1.length;
}

module.exports = {
  fnv1aHash,
  generateShingleHashes,
  winnow,
  compareFingerprints,
  computeMinHashSignature,
  minHashSimilarity,
};

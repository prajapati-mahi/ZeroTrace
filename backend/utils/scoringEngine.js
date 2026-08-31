/**
 * ZeroTrace Multi-Signal Scoring Engine
 * Combines exact, lexical, fingerprint, TF-IDF, semantic, and code signals.
 * Implements token-weighted coverage, exact copy override, and confidence scoring.
 */

const { tokenizeWords } = require("./tokenizer");

/**
 * Calculates a multi-signal passage match score between input and candidate source.
 */
function computePassageScore(signals) {
  const { exact = 0, fingerprint = 0, lexical = 0, tfidf = 0, semantic = 0, isCode = false, codeScore = 0 } = signals;

  // 1. Exact Match Override: Identical or near-identical text
  if (exact >= 0.90) {
    return {
      score: 1.0,
      matchType: isCode ? "Exact Code" : "Exact",
      confidence: "VERY HIGH",
    };
  }

  // 2. Code Mode
  if (isCode && codeScore > 0) {
    let conf = "LOW";
    if (codeScore >= 0.75) conf = "VERY HIGH";
    else if (codeScore >= 0.60) conf = "HIGH";
    else if (codeScore >= 0.40) conf = "MEDIUM";

    let matchType = "Structural Code";
    if (codeScore >= 0.85) matchType = "Exact Code";
    else if (codeScore >= 0.60) matchType = "Renamed Variables";

    const scaledCode = Math.min(1.0, Math.max(0.70, codeScore * 1.1));
    return {
      score: scaledCode,
      matchType,
      confidence: conf,
    };
  }

  // 3. Minor Modifications (High Lexical / N-gram overlap)
  const lexicalSignal = Math.max(lexical, tfidf, fingerprint);
  if (exact >= 0.65 || lexicalSignal >= 0.50 || (lexicalSignal >= 0.35 && semantic >= 0.40)) {
    const modRaw = exact * 0.35 + lexicalSignal * 0.40 + semantic * 0.25;
    const scaledMod = Math.min(0.95, Math.max(0.78, modRaw * 1.25));
    return {
      score: scaledMod,
      matchType: "Near-Exact",
      confidence: "HIGH",
    };
  }

  // 4. Paraphrased / Semantic Similarity
  if (semantic >= 0.35 || (semantic >= 0.25 && lexicalSignal >= 0.20)) {
    const paraRaw = semantic * 0.75 + lexicalSignal * 0.25;
    const scaledPara = Math.min(0.85, Math.max(0.55, paraRaw * 1.3));
    return {
      score: scaledPara,
      matchType: "Paraphrased / Semantic",
      confidence: "MEDIUM",
    };
  }

  // 5. Low / Unrelated
  const lowRaw = exact * 0.2 + lexicalSignal * 0.3 + semantic * 0.5;
  return {
    score: Math.min(0.15, lowRaw),
    matchType: "Weak Similarity",
    confidence: "LOW",
  };
}

/**
 * Computes document-level score based on token coverage across matched passages.
 */
function computeDocumentScore(inputText, matchedPassages) {
  const allTokens = tokenizeWords(inputText, false);
  const totalTokens = allTokens.length;

  if (totalTokens === 0 || matchedPassages.length === 0) {
    return {
      overallScore: 0,
      exactMatchScore: 0,
      nearExactScore: 0,
      semanticScore: 0,
      riskLevel: "LOW",
      totalTokens,
      matchedTokens: 0,
      coveragePercent: 0,
    };
  }

  let exactTokensCount = 0;
  let nearExactTokensCount = 0;
  let semanticTokensCount = 0;

  for (const m of matchedPassages) {
    const passageTokens = tokenizeWords(m.inputPassage, false);
    const pLen = Math.max(1, passageTokens.length);

    if (m.matchType === "Exact" || m.matchType === "Exact Code" || m.similarity >= 95) {
      exactTokensCount += pLen;
    } else if (m.matchType.includes("Near-Exact") || m.matchType.includes("Renamed") || m.similarity >= 75) {
      nearExactTokensCount += pLen;
    } else if (m.similarity >= 40) {
      semanticTokensCount += pLen;
    }
  }

  const coveredExact = Math.min(totalTokens, exactTokensCount);
  const coveredNearExact = Math.min(totalTokens - coveredExact, nearExactTokensCount);
  const coveredSemantic = Math.min(totalTokens - coveredExact - coveredNearExact, semanticTokensCount);
  const totalCovered = coveredExact + coveredNearExact + coveredSemantic;

  const coveragePercent = Math.round((totalCovered / totalTokens) * 100);

  // Exact Match Override at Document Level
  let overallScore = 0;
  if (matchedPassages.some((m) => m.similarity >= 95 && (coveredExact / totalTokens) >= 0.7)) {
    overallScore = 100;
  } else {
    // For single short query or sentence direct reflection
    const highestSim = Math.max(...matchedPassages.map((m) => m.similarity));
    if (totalTokens <= 40) {
      overallScore = highestSim;
    } else {
      const weightedCovered = (coveredExact * 1.0) + (coveredNearExact * 0.85) + (coveredSemantic * 0.65);
      overallScore = Math.min(100, Math.round((weightedCovered / totalTokens) * 100));
    }
  }

  let riskLevel = "LOW";
  if (overallScore >= 50) riskLevel = "HIGH";
  else if (overallScore >= 20) riskLevel = "MEDIUM";

  return {
    overallScore,
    exactMatchScore: Math.min(100, Math.round((coveredExact / totalTokens) * 100)),
    nearExactScore: Math.min(100, Math.round((coveredNearExact / totalTokens) * 100)),
    semanticScore: Math.min(100, Math.round((coveredSemantic / totalTokens) * 100)),
    riskLevel,
    totalTokens,
    matchedTokens: totalCovered,
    coveragePercent,
  };
}

module.exports = {
  computePassageScore,
  computeDocumentScore,
};

/**
 * ZeroTrace Passage Alignment & Ranking Engine
 * Compares an input segment against candidate source pages across all similarity signals.
 */

const { exactNormalizedMatch, compareLexical } = require("../utils/similarity");
const { winnow, compareFingerprints } = require("../utils/shingleFingerprint");
const { computeSemanticSimilarity } = require("../utils/semanticSimilarity");
const { isCodeSnippet, compareCodeSimilarity } = require("../utils/codeSimilarity");
const { computePassageScore } = require("../utils/scoringEngine");
const { extractSentences } = require("../utils/sentenceUtils");

/**
 * Finds the best matching passage for an input segment among candidate sources.
 */
async function findBestPassageMatch(inputSegment, candidatePages) {
  if (!inputSegment || !candidatePages || candidatePages.length === 0) {
    return null;
  }

  const isCode = isCodeSnippet(inputSegment);
  const inputWinnow = !isCode ? winnow(inputSegment, 4, 3) : [];

  let bestMatch = null;
  let highestScore = 0;

  for (const page of candidatePages) {
    if (!page.content || page.content.trim().length === 0) continue;

    // Fast check: Is the full input segment directly contained in the webpage?
    const fullExact = exactNormalizedMatch(inputSegment, page.content);
    if (fullExact >= 0.90) {
      return {
        sourceUrl: page.link,
        sourceTitle: page.title || page.domain || page.link,
        sourceDomain: page.domain || "",
        matchedPassage: inputSegment,
        score: 1.0,
        similarity: 100,
        matchType: isCode ? "Exact Code" : "Exact",
        confidence: "VERY HIGH",
      };
    }

    const sourceSentences = isCode ? [page.content] : extractSentences(page.content);

    for (const sourceSent of sourceSentences) {
      if (!sourceSent || sourceSent.trim().length < 5) continue;

      // 1. Exact normalized comparison
      const exactScore = exactNormalizedMatch(inputSegment, sourceSent);
      if (exactScore >= 0.90) {
        return {
          sourceUrl: page.link,
          sourceTitle: page.title || page.domain || page.link,
          sourceDomain: page.domain || "",
          matchedPassage: sourceSent,
          score: 1.0,
          similarity: 100,
          matchType: isCode ? "Exact Code" : "Exact",
          confidence: "VERY HIGH",
        };
      }

      // 2. Lexical & N-gram comparison
      const lexResult = compareLexical(inputSegment, sourceSent);

      // 3. Fingerprint / Winnowing comparison
      let fpContainment = 0;
      if (!isCode && inputWinnow.length > 0) {
        const sourceWinnow = winnow(sourceSent, 4, 3);
        const fpComp = compareFingerprints(inputWinnow, sourceWinnow);
        fpContainment = fpComp.containment;
      }

      // 4. Code structural comparison
      let codeScore = 0;
      if (isCode) {
        const codeComp = compareCodeSimilarity(inputSegment, sourceSent);
        codeScore = codeComp.score;
      }

      // 5. Semantic similarity
      let semanticScore = 0;
      if (!isCode) {
        semanticScore = await computeSemanticSimilarity(inputSegment, sourceSent);
      }

      const signals = {
        exact: exactScore,
        fingerprint: Math.max(fpContainment, lexResult.ngram3),
        lexical: lexResult.dice,
        tfidf: lexResult.tfidf,
        semantic: semanticScore,
        isCode,
        codeScore,
      };

      const passageAssessment = computePassageScore(signals);

      if (passageAssessment.score > highestScore && passageAssessment.score >= 0.20) {
        highestScore = passageAssessment.score;
        bestMatch = {
          sourceUrl: page.link,
          sourceTitle: page.title || page.domain || page.link,
          sourceDomain: page.domain || "",
          matchedPassage: sourceSent,
          score: passageAssessment.score,
          similarity: Math.round(passageAssessment.score * 100),
          matchType: passageAssessment.matchType,
          confidence: passageAssessment.confidence,
        };
      }
    }
  }

  return bestMatch;
}

module.exports = {
  findBestPassageMatch,
};

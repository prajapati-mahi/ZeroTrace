const plagiarismEngine = require("../engine/plagiarismEngine");
const { compareLexical } = require("../utils/similarity");
const { computeDocumentScore } = require("../utils/scoringEngine");
const { extractSentences } = require("../utils/sentenceUtils");
const { findBestPassageMatch } = require("../engine/rankingEngine");

/**
 * Direct comparison between two text inputs (Text A vs Text B).
 */
const checkPlagiarism = async (req, res) => {
  try {
    const { text1, text2 } = req.body;

    if (!text1 || !text2) {
      return res.status(400).json({
        success: false,
        message: "Both text1 and text2 are required for comparison",
      });
    }

    const result = await plagiarismEngine(text1, {
      referenceText: text2,
      localOnly: true,
    });

    return res.status(200).json({
      success: true,
      score: result.plagiarismScore,
      overallScore: result.plagiarismScore,
      risk: result.risk,
      analysis: result.analysis,
      sources: result.matchedSources,
      matchedSentences: result.matchedSentences,
      stats: result.stats,
    });
  } catch (error) {
    console.error("[COMPARE] Plagiarism comparison error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Compare text against an internal corpus / array of reference documents.
 */
const compareCorpus = async (req, res) => {
  try {
    const { text, referenceDocs } = req.body;

    if (!text || !referenceDocs || !Array.isArray(referenceDocs)) {
      return res.status(400).json({
        success: false,
        message: "text and referenceDocs array are required",
      });
    }

    const result = await plagiarismEngine(text, {
      referenceDocs,
      localOnly: true,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  checkPlagiarism,
  compareCorpus,
};

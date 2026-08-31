const plagiarismEngine = require("../engine/plagiarismEngine");
const detectAIContent = require("../utils/aiDetector");
const Report = require("../models/Report");

const checkTextPlagiarism = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    // AI Detection (Kept strictly separate from plagiarism score)
    const aiResult = detectAIContent(text);

    // Multi-Signal Plagiarism Detection Engine
    const {
      plagiarismScore,
      risk,
      analysis,
      matchedSources,
      matchedSentences,
      stats,
      warnings,
    } = await plagiarismEngine(text);

    // Save Report to Database
    let reportId = null;
    if (req.user && req.user.id) {
      const report = await Report.create({
        user: req.user.id,
        title:
          text.length > 50
            ? text.substring(0, 47) + "..."
            : text,
        text,
        plagiarismScore,
        aiScore: aiResult.aiScore,
        risk: risk || aiResult.aiRisk || "LOW",
        analysis,
        stats,
        matches: matchedSources.map((source) => ({
          title: source.title,
          link: source.link,
          domain: source.domain,
          score: source.score,
          confidence: source.confidence,
          matchedPassages: source.matchedPassages,
        })),
        matchedSentences,
      });
      reportId = report._id;
    }

    return res.status(200).json({
      success: true,
      plagiarismScore,
      aiScore: aiResult.aiScore,
      aiRisk: aiResult.aiRisk,
      riskLevel: risk,
      analysis,
      sources: matchedSources,
      matchedSentences,
      stats,
      warnings,
      reportId,
    });
  } catch (error) {
    console.error("[CONTROLLER] Plagiarism check error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  checkTextPlagiarism,
};

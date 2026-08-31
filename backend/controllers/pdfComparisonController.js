const fs = require("fs");
const { parseDocument } = require("../services/documentParser");
const plagiarismEngine = require("../engine/plagiarismEngine");
const Report = require("../models/Report");

const comparePDFs = async (req, res) => {
  try {
    const file1 = req.files?.pdf1?.[0] || req.files?.file1?.[0];
    const file2 = req.files?.pdf2?.[0] || req.files?.file2?.[0];

    if (!file1 || !file2) {
      return res.status(400).json({
        success: false,
        message: "Please upload both documents for comparison",
      });
    }

    const doc1 = await parseDocument(file1);
    const doc2 = await parseDocument(file2);

    if (!doc1.text || !doc2.text) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract readable text from one or both uploaded documents",
      });
    }

    // Run multi-signal local comparison between Doc 1 and Doc 2
    const result = await plagiarismEngine(doc1.text, {
      referenceDocs: [
        {
          title: doc2.fileName || "Comparison Document",
          link: doc2.fileName || "Comparison Document",
          domain: "file",
          content: doc2.text,
        },
      ],
      localOnly: true,
    });

    const matches = result.matchedSentences.map((m) => m.sentence);

    // Save report if user is authenticated
    let reportId = null;
    if (req.user && req.user.id) {
      const report = await Report.create({
        user: req.user.id,
        title: `${doc1.fileName} vs ${doc2.fileName}`,
        text: doc1.text.substring(0, 5000),
        plagiarismScore: result.plagiarismScore,
        aiScore: 0,
        risk: result.risk,
        analysis: result.analysis,
        stats: result.stats,
        matches: result.matchedSources.map((source) => ({
          title: source.title,
          link: source.link,
          domain: "file",
          score: source.score,
          confidence: source.confidence,
          matchedPassages: source.matchedPassages,
        })),
        matchedSentences: result.matchedSentences,
      });
      reportId = report._id;
    }

    // Clean up temporary uploaded files
    try {
      if (file1.path && fs.existsSync(file1.path)) fs.unlinkSync(file1.path);
      if (file2.path && fs.existsSync(file2.path)) fs.unlinkSync(file2.path);
    } catch (cleanupErr) {
      // Non-fatal
    }

    return res.status(200).json({
      success: true,
      similarityScore: result.plagiarismScore,
      plagiarismScore: result.plagiarismScore,
      risk: result.risk,
      analysis: result.analysis,
      matches,
      matchedSentences: result.matchedSentences,
      stats: result.stats,
      doc1Name: doc1.fileName,
      doc2Name: doc2.fileName,
      reportId,
    });
  } catch (error) {
    console.error("[PDF_COMPARE] Error comparing documents:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  comparePDFs,
};

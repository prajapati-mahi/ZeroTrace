const { parseDocument } = require("../services/documentParser");
const fs = require("fs");

const extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No document uploaded",
      });
    }

    const parsed = await parseDocument(req.file);

    // Clean up temporary uploaded file
    try {
      if (req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (e) {}

    return res.status(200).json({
      success: true,
      text: parsed.text,
      fileName: parsed.fileName,
      wordCount: parsed.wordCount,
      charCount: parsed.charCount,
    });
  } catch (error) {
    console.error("[EXTRACT] Error extracting document:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  extractText,
};

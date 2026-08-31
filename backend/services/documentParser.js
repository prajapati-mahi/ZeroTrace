/**
 * ZeroTrace Unified Document Parser Service
 * Extracts clean text from PDF, DOCX, and TXT files.
 */

const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { cleanText } = require("../utils/normalizer");

/**
 * Extracts text from an uploaded file buffer or path based on extension / mime-type.
 */
async function parseDocument(file) {
  if (!file) throw new Error("No file provided");

  const filePath = file.path || file.tempFilePath;
  const fileName = file.originalname || file.name || "";
  const fileBuffer = filePath ? fs.readFileSync(filePath) : file.buffer;

  if (!fileBuffer) throw new Error("Could not read file data");

  const ext = fileName.split(".").pop().toLowerCase();
  let rawText = "";

  if (ext === "pdf" || file.mimetype === "application/pdf") {
    const pdfData = await pdfParse(fileBuffer);
    rawText = pdfData.text || "";
  } else if (
    ext === "docx" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const docxResult = await mammoth.extractRawText({ buffer: fileBuffer });
    rawText = docxResult.value || "";
  } else {
    // Treat as UTF-8 plain text
    rawText = fileBuffer.toString("utf-8");
  }

  const text = cleanText(rawText);
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;

  return {
    fileName,
    text,
    wordCount: words,
    charCount: text.length,
  };
}

module.exports = {
  parseDocument,
};

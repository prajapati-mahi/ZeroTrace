const PDFDocument = require("pdfkit");

const generatePDFFromScan = (scanData, res) => {
  const doc = new PDFDocument({
    margin: 50,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=ZeroTrace_Analysis_Report.pdf");

  doc.pipe(res);

  // HEADER
  doc.fontSize(28).fillColor("#06b6d4").text("ZeroTrace", { align: "center" });
  doc.moveDown(0.3).fillColor("#111827").fontSize(18).text("Plagiarism & Content Authenticity Report", { align: "center" });
  doc.moveDown(1.5);

  // SCAN INFORMATION
  doc.fontSize(16).fillColor("#111827").text("Report Summary");
  doc.moveDown(0.5);

  doc.fontSize(11).fillColor("#4b5563");
  doc.text(`Generated: ${new Date().toLocaleString()}`);
  doc.text(`Plagiarism Risk Assessment: ${scanData.riskLevel || scanData.risk || "LOW"}`);
  doc.text(`AI Risk Assessment: ${scanData.aiRisk || "LOW"}`);
  doc.moveDown(1.5);

  // SCORES
  doc.fontSize(16).fillColor("#111827").text("Detection Metrics");
  doc.moveDown(0.5);

  const plagScore = scanData.plagiarismScore || 0;
  const scoreColor = plagScore >= 50 ? "#dc2626" : plagScore >= 20 ? "#d97706" : "#16a34a";
  doc.fontSize(13).fillColor(scoreColor).text(`Plagiarism Score: ${plagScore}%`);
  doc.fontSize(13).fillColor("#7c3aed").text(`AI Content Probability: ${scanData.aiScore || 0}%`);
  doc.moveDown(0.5);

  if (scanData.analysis) {
    doc.fontSize(11).fillColor("#4b5563");
    doc.text(`  • Exact Character Overlap: ${scanData.analysis.exactMatch || 0}%`);
    doc.text(`  • Near-Exact / Shingle Overlap: ${scanData.analysis.nearExactMatch || 0}%`);
    doc.text(`  • Semantic Similarity: ${scanData.analysis.semanticSimilarity || 0}%`);
  }
  doc.moveDown(1.5);

  // STATS
  if (scanData.stats) {
    doc.fontSize(16).fillColor("#111827").text("Document Statistics");
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor("#4b5563");
    doc.text(`Total Input Words: ${scanData.stats.inputWords || 0}`);
    doc.text(`Matched Words: ${scanData.stats.matchedWords || 0}`);
    doc.text(`Total Sentences: ${scanData.stats.totalSentences || 0}`);
    doc.text(`Overlapping Passages: ${scanData.stats.matchedSentencesCount || 0}`);
    doc.moveDown(1.5);
  }

  // MATCHED SOURCES
  doc.fontSize(16).fillColor("#111827").text("Identified Sources");
  doc.moveDown(0.5);

  const sources = scanData.sources || [];
  if (sources.length === 0) {
    doc.fontSize(11).fillColor("#6b7280").text("No significant overlapping sources found.");
  } else {
    sources.slice(0, 10).forEach((src, idx) => {
      doc.fontSize(11).fillColor("#0284c7").text(`${idx + 1}. ${src.title || src.domain || src.link}`);
      doc.fontSize(9).fillColor("#6b7280").text(`   URL: ${src.link}`);
      doc.fontSize(9).fillColor("#374151").text(`   Match Confidence: ${src.confidence || "HIGH"} (${src.score}% similarity)`);
      doc.moveDown(0.5);
    });
  }

  // MATCHED PASSAGES
  const matchedSents = scanData.matchedSentences || [];
  if (matchedSents.length > 0) {
    doc.moveDown(1);
    doc.fontSize(16).fillColor("#111827").text("Overlapping Passages & Evidence");
    doc.moveDown(0.5);

    matchedSents.slice(0, 8).forEach((item, idx) => {
      doc.fontSize(10).fillColor("#dc2626").text(`[Passage ${idx + 1}] (${item.score}% Match - ${item.matchType || "Matched"})`);
      doc.fontSize(10).fillColor("#1f2937").text(`"${item.sentence}"`);
      if (item.sourceTitle || item.source) {
        doc.fontSize(9).fillColor("#6b7280").text(`Source: ${item.sourceTitle || item.source}`);
      }
      doc.moveDown(0.5);
    });
  }

  doc.end();
};

module.exports = { generatePDFFromScan };

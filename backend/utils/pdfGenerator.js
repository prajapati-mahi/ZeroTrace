const PDFDocument = require("pdfkit");

const generatePDF = (report, res) => {
  const doc = new PDFDocument({
    margin: 50,
  });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=ZeroTrace_Report.pdf`
  );

  doc.pipe(res);

  // ===========================
  // HEADER
  // ===========================

  doc
    .fontSize(28)
    .fillColor("#2563eb")
    .text("ZeroTrace", {
      align: "center",
    });

  doc
    .moveDown(0.3)
    .fillColor("black")
    .fontSize(18)
    .text("AI Plagiarism Analysis Report", {
      align: "center",
    });

  doc.moveDown(2);

  // ===========================
  // REPORT INFO
  // ===========================

  doc
    .fontSize(20)
    .fillColor("#111827")
    .text("Report Information");

  doc.moveDown();

  doc.fontSize(13);

  doc.text(
    `Report ID : ${report._id}`
  );

  doc.text(
    `Generated : ${new Date(
      report.createdAt
    ).toLocaleString()}`
  );

  doc.text(
    `Risk Level : ${report.risk}`
  );

  doc.moveDown(2);

  // ===========================
  // SCORES
  // ===========================

  doc
    .fontSize(20)
    .text("Analysis Scores");

  doc.moveDown();

  doc
    .fontSize(14)
    .text(
      `Plagiarism Score : ${report.plagiarismScore}%`
    );

  doc.text(
    `AI Score : ${report.aiScore}%`
  );

  doc.moveDown(2);

  // ===========================
  // ORIGINAL TEXT
  // ===========================

  doc
    .fontSize(20)
    .text("Original Text");

  doc.moveDown();

  doc
    .fontSize(12)
    .text(report.text);

  doc.moveDown(2);

  // ===========================
  // MATCHED SOURCES
  // ===========================

  doc
    .fontSize(20)
    .text("Matched Sources");

  doc.moveDown();

  if (
    report.matches.length === 0
  ) {
    doc.text(
      "No matched sources found."
    );
  } else {

    report.matches.forEach(
      (source, index) => {

        doc
          .fontSize(13)
          .fillColor("#2563eb")
          .text(
            `${index + 1}. ${source.title}`
          );

        doc
          .fillColor("black")
          .fontSize(11)
          .text(source.link);

        doc.text(
          `Similarity : ${source.score}%`
        );

        doc.moveDown();

      }
    );

  }

  // ===========================
  // INTERPRETATION
  // ===========================

  doc.addPage();

  doc
    .fontSize(22)
    .text("Interpretation");

  doc.moveDown();

  doc.fontSize(14);

  if (
    report.plagiarismScore < 20
  ) {

    doc.text(
      "This document appears highly original with minimal similarity."
    );

  } else if (
    report.plagiarismScore < 50
  ) {

    doc.text(
      "This document has moderate similarity. Manual review is recommended."
    );

  } else {

    doc.text(
      "High similarity detected. This document should be reviewed carefully before submission."
    );

  }

  doc.moveDown(2);

  // ===========================
  // FOOTER
  // ===========================

  doc
    .fontSize(12)
    .fillColor("gray")
    .text(
      "Generated using ZeroTrace AI",
      {
        align: "center",
      }
    );

  doc.end();
};

module.exports = generatePDF;
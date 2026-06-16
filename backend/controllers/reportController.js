const PDFDocument = require("pdfkit");

const generateReport = async (req, res) => {
  try {
    const { score, risk } = req.body;

    const doc = new PDFDocument({
      margin: 50,
    });

    // Response Headers
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ZeroTrace_Report.pdf"
    );

    // Pipe PDF to response
    doc.pipe(res);

    // =========================
    // HEADER
    // =========================

    doc
      .fontSize(28)
      .text("ZeroTrace Analysis Report", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(12)
      .text(
        `Generated At: ${new Date().toLocaleString()}`,
        {
          align: "center",
        }
      );

    doc.moveDown(2);

    // =========================
    // ANALYSIS DETAILS
    // =========================

    doc
      .fontSize(20)
      .text("Analysis Summary");

    doc.moveDown();

    doc
      .fontSize(16)
      .text(`Similarity Score: ${score}%`);

    doc.moveDown();

    doc.text(`Risk Level: ${risk}`);

    doc.moveDown(2);

    // =========================
    // INTERPRETATION
    // =========================

    doc
      .fontSize(20)
      .text("Interpretation");

    doc.moveDown();

    doc.fontSize(14);

    if (score < 20) {
      doc.text(
        "The uploaded documents show very low similarity and appear largely original. No significant plagiarism indicators were detected."
      );
    } else if (score < 50) {
      doc.text(
        "The uploaded documents contain moderate overlap. Manual review is recommended to determine whether the similarity is acceptable."
      );
    } else {
      doc.text(
        "The uploaded documents contain significant overlap and may indicate plagiarism. Further investigation is strongly recommended."
      );
    }

    doc.moveDown(2);

    // =========================
    // FOOTER
    // =========================

    doc
      .fontSize(12)
      .text(
        "Powered by ZeroTrace",
        {
          align: "center",
        }
      );

    // Finish PDF
    doc.end();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateReport,
};
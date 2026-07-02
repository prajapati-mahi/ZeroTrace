const PDFDocument = require("pdfkit");
const Report = require("../models/Report");

const generateReport = async (req, res) => {
  try {
    const { score, risk } = req.body;

    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ZeroTrace_Report.pdf"
    );

    doc.pipe(res);

    // ==========================
    // Header
    // ==========================

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

    // ==========================
    // Summary
    // ==========================

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

    // ==========================
    // Interpretation
    // ==========================

    doc
      .fontSize(20)
      .text("Interpretation");

    doc.moveDown();

    doc.fontSize(14);

    if (score < 20) {
      doc.text(
        "The uploaded document appears largely original with very low similarity."
      );
    } else if (score < 50) {
      doc.text(
        "Moderate similarity detected. Manual review is recommended."
      );
    } else {
      doc.text(
        "High similarity detected. Possible plagiarism found."
      );
    }

    doc.moveDown(2);

    // ==========================
    // Footer
    // ==========================

    doc
      .fontSize(12)
      .text("Powered by ZeroTrace", {
        align: "center",
      });

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Single Report
// ======================================

const getReportById = async (
  req,
  res
) => {
  try {
    const report =
      await Report.findById(
        req.params.id
      );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateReport,
  getReportById,
};
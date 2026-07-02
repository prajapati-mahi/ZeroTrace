const Report = require("../models/Report");
const PDFDocument = require("pdfkit");
const generatePDF = require("../utils/pdfGenerator");

// ======================================
// Generate Basic PDF (Existing)
// ======================================

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

    doc
      .fontSize(28)
      .text(
        "ZeroTrace Analysis Report",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(14)
      .text(
        `Similarity Score : ${score}%`
      );

    doc.moveDown();

    doc.text(
      `Risk Level : ${risk}`
    );

    doc.end();

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get Report By ID
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
        message:
          "Report not found",
      });

    }

    res.status(200).json(
      report
    );

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

// ======================================
// Download Professional PDF
// ======================================

const downloadReportPDF =
  async (req, res) => {

    try {

      const report =
        await Report.findById(
          req.params.id
        );

      if (!report) {

        return res.status(404).json({
          success: false,
          message:
            "Report not found",
        });

      }

      generatePDF(
        report,
        res
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

module.exports = {
  generateReport,
  getReportById,
  downloadReportPDF,
};
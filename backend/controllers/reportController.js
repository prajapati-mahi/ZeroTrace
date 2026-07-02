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
      .fontSize(12)
      .text(
        `Generated At: ${new Date().toLocaleString()}`,
        {
          align: "center",
        }
      );

    doc.moveDown(2);

    doc
      .fontSize(20)
      .text("Analysis Summary");

    doc.moveDown();

    doc
      .fontSize(16)
      .text(
        `Similarity Score: ${score}%`
      );

    doc.moveDown();

    doc.text(
      `Risk Level: ${risk}`
    );

    doc.moveDown(2);

    doc
      .fontSize(20)
      .text("Interpretation");

    doc.moveDown();

    doc.fontSize(14);

    if (score < 20) {

      doc.text(
        "The uploaded documents show very low similarity and appear largely original."
      );

    } else if (score < 50) {

      doc.text(
        "The uploaded documents contain moderate overlap."
      );

    } else {

      doc.text(
        "The uploaded documents contain significant overlap and may indicate plagiarism."
      );

    }

    doc.moveDown(2);

    doc
      .fontSize(12)
      .text(
        "Powered by ZeroTrace",
        {
          align: "center",
        }
      );

    doc.end();

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

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
        message:
          "Report not found",
      });

    }

    res.status(200).json(
      report
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

module.exports = {
  generateReport,
  getReportById,
};
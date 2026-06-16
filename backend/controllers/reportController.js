const PDFDocument = require("pdfkit");

const generateReport = async (req, res) => {
  try {
    const { score, risk } = req.body;

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ZeroTrace_Report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(25).text("ZeroTrace Report");

    doc.moveDown();

    doc.fontSize(16).text(
      `Similarity Score: ${score}%`
    );

    doc.moveDown();

    doc.text(`Risk Level: ${risk}`);

    doc.moveDown();

    doc.text(
      `Generated At: ${new Date().toLocaleString()}`
    );

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
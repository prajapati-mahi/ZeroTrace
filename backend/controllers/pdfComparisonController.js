const fs = require("fs");
const pdfParse = require("pdf-parse");

const calculateSimilarity = require(
  "../utils/similarity"
);

const comparePDFs = async (req, res) => {
  try {

    const file1 = req.files.pdf1[0];
    const file2 = req.files.pdf2[0];

    const pdf1Buffer = fs.readFileSync(
      file1.path
    );

    const pdf2Buffer = fs.readFileSync(
      file2.path
    );

    const pdf1Text = await pdfParse(
      pdf1Buffer
    );

    const pdf2Text = await pdfParse(
      pdf2Buffer
    );

    const score = calculateSimilarity(
      pdf1Text.text,
      pdf2Text.text
    );

    res.status(200).json({
      success: true,
      similarityScore: score,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  comparePDFs,
};
const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractText = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(
      req.file.path
    );

    const data = await pdfParse(dataBuffer);

    res.status(200).json({
      success: true,
      text: data.text,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  extractText,
};
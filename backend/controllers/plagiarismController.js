const calculateSimilarity = require(
  "../utils/similarity"
);

const checkPlagiarism = async (req, res) => {
  try {
    const { text1, text2 } = req.body;

    const score = calculateSimilarity(
      text1,
      text2
    );

    res.status(200).json({
      success: true,
      score,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  checkPlagiarism,
};
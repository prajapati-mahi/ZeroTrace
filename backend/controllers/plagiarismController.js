const checkPlagiarism = async (req, res) => {
  try {
    const { text1, text2 } = req.body;

    res.status(200).json({
      success: true,
      score: 50,
      text1,
      text2,
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
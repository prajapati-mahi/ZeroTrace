const checkPlagiarism = async (req, res) => {
  try {
    const { text1, text2 } = req.body;

    const words1 = text1.split(" ");
    const words2 = text2.split(" ");

    let common = 0;

    words1.forEach((word) => {
      if (words2.includes(word)) {
        common++;
      }
    });

    const score = Math.round(
      (common / Math.max(words1.length, words2.length)) * 100
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
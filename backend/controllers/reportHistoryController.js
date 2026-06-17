const Report = require("../models/Report");

const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reports,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getReports,
};
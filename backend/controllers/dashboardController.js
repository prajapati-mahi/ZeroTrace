const Report = require("../models/Report");

const getDashboardStats = async (req, res) => {
  try {

    const reports = await Report.find({
      user: req.user.id,
    });

    const totalReports = reports.length;

    const averageSimilarity =
      totalReports === 0
        ? 0
        : (
            reports.reduce(
              (sum, report) =>
                sum + report.plagiarismScore,
              0
            ) / totalReports
          ).toFixed(2);

    const highestSimilarity =
      totalReports === 0
        ? 0
        : Math.max(
            ...reports.map(
              (report) =>
                report.plagiarismScore
            )
          );

    const lowRisk = reports.filter(
      (report) =>
        report.risk === "LOW"
    ).length;

    const mediumRisk = reports.filter(
      (report) =>
        report.risk === "MEDIUM"
    ).length;

    const highRisk = reports.filter(
      (report) =>
        report.risk === "HIGH"
    ).length;

    res.status(200).json({
      success: true,
      totalReports,
      averageSimilarity,
      highestSimilarity,
      lowRisk,
      mediumRisk,
      highRisk,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};
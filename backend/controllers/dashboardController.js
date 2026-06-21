const Report = require("../models/Report");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const reports = await Report.find();

    const totalReports =
      reports.length;

    const averageSimilarity =
      totalReports === 0
        ? 0
        : (
            reports.reduce(
              (sum, report) =>
                sum + report.score,
              0
            ) / totalReports
          ).toFixed(2);

    const highestSimilarity =
      totalReports === 0
        ? 0
        : Math.max(
            ...reports.map(
              (r) => r.score
            )
          );

    const lowRisk =
      reports.filter(
        (r) =>
          r.risk === "LOW RISK"
      ).length;

    const mediumRisk =
      reports.filter(
        (r) =>
          r.risk === "MEDIUM RISK"
      ).length;

    const highRisk =
      reports.filter(
        (r) =>
          r.risk === "HIGH RISK"
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
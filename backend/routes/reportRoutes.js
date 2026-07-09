const express = require("express");

const {
  generateReport,
  getReportById,
  downloadReportPDF,
  deleteReport,
} = require("../controllers/reportController");

const router = express.Router();

const authMiddleware = require(
  "../middlewares/authMiddleware"
);

// Generate PDF
router.post(
  "/generate",
  generateReport
);

// Get Report Details
router.get(
  "/:id",
  authMiddleware,
  getReportById
);

// Download Report PDF
router.get(
  "/pdf/:id",
  authMiddleware,
  downloadReportPDF
);

// Delete Report
router.delete(
  "/:id",
  authMiddleware,
  deleteReport
);

module.exports = router;
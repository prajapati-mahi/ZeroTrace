const express = require("express");

const router = express.Router();

const {
  generateReport,
  getReportById,
  downloadReportPDF,
} = require("../controllers/reportController");

// Existing Route
router.post(
  "/generate",
  generateReport
);

// Get Report
router.get(
  "/:id",
  getReportById
);

// Download PDF
router.get(
  "/pdf/:id",
  downloadReportPDF
);

module.exports = router;
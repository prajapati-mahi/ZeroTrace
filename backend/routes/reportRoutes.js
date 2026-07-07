const express = require("express");

const router = express.Router();

const {
  generateReport,
  getReportById,
  downloadReportPDF,
} = require("../controllers/reportController");

const authMiddleware = require(
  "../middlewares/authMiddleware"
);

// Generate PDF (does not access DB)
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

// Download Existing Report PDF
router.get(
  "/pdf/:id",
  authMiddleware,
  downloadReportPDF
);

module.exports = router;
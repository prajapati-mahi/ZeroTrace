const express = require("express");

const router = express.Router();

const {
  getReports,
} = require(
  "../controllers/reportHistoryController"
);

const authMiddleware = require(
  "../middlewares/authMiddleware"
);

router.get(
  "/",
  authMiddleware,
  getReports
);

module.exports = router;
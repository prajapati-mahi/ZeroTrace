const express = require("express");
const router = express.Router();

const {
  getReports,
} = require(
  "../controllers/reportHistoryController"
);

router.get("/", getReports);

module.exports = router;
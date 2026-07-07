const express = require("express");

const router = express.Router();

const controller = require(
  "../controllers/textPlagiarismController"
);

const authMiddleware = require(
  "../middlewares/authMiddleware"
);

router.post(
  "/check",
  authMiddleware,
  controller.checkTextPlagiarism
);

module.exports = router;
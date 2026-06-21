const express = require("express");

const router = express.Router();

const controller = require(
  "../controllers/textPlagiarismController"
);

console.log("Controller:", controller);

router.post(
  "/check",
  controller.checkTextPlagiarism
);

module.exports = router;
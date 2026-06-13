const express = require("express");
const router = express.Router();

const {
  checkPlagiarism,
} = require("../controllers/plagiarismController");

router.post("/check", checkPlagiarism);

module.exports = router;
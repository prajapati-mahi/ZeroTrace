const express = require("express");
const router = express.Router();

const {
  checkPlagiarism,
  compareCorpus,
} = require("../controllers/plagiarismController");

router.post("/check", checkPlagiarism);
router.post("/compare", checkPlagiarism);
router.post("/corpus", compareCorpus);

module.exports = router;

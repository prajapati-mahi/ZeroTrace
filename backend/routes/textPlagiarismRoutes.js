const express = require("express");

const router = express.Router();

const {
    checkTextPlagiarism,
} = require("../controllers/textPlagiarismController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post(
    "/check",
    authMiddleware,
    checkTextPlagiarism
);

module.exports = router;
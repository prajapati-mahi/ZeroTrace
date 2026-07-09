const express = require("express");
const multer = require("multer");

const {
  comparePDFs,
} = require("../controllers/pdfComparisonController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/compare",
  authMiddleware,
  upload.fields([
    { name: "pdf1", maxCount: 1 },
    { name: "pdf2", maxCount: 1 },
  ]),
  comparePDFs
);

module.exports = router;
const express = require("express");
const router = express.Router();

const upload = require(
  "../middlewares/uploadMiddleware"
);

const {
  comparePDFs,
} = require(
  "../controllers/pdfComparisonController"
);

router.post(
  "/compare",
  upload.fields([
    {
      name: "pdf1",
      maxCount: 1,
    },
    {
      name: "pdf2",
      maxCount: 1,
    },
  ]),
  comparePDFs
);

module.exports = router;
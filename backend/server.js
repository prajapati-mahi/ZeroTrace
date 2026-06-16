const express = require("express");
const cors = require("cors");

const plagiarismRoutes = require("./routes/plagiarismRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "ZeroTrace Backend Running",
  });
});

// Routes
app.use(
  "/api/plagiarism",
  plagiarismRoutes
);

app.use(
  "/api/pdf",
  pdfRoutes
);

app.use(
  "/api/report",
  reportRoutes
);

// Server Start
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
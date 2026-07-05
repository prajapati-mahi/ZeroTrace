const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const plagiarismRoutes = require("./routes/plagiarismRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const reportRoutes = require("./routes/reportRoutes");
const historyRoutes = require("./routes/historyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const textPlagiarismRoutes = require("./routes/textPlagiarismRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

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

app.use(
  "/api/history",
  historyRoutes
);

console.log("dashboardRoutes =", dashboardRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/text",
  textPlagiarismRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

// Server Start
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
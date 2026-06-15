const express = require("express");
const cors = require("cors");

const plagiarismRoutes = require("./routes/plagiarismRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

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
// app.use("/api/plagiarism", plagiarismRoutes);
// app.use("/api/pdf", pdfRoutes);

// console.log("plagiarismRoutes =", plagiarismRoutes);
// console.log("pdfRoutes =", pdfRoutes);

// //app.use("/api/plagiarism", plagiarismRoutes);
// app.use("/api/pdf", pdfRoutes);

console.log("plagiarismRoutes =", typeof plagiarismRoutes);
console.log("pdfRoutes =", typeof pdfRoutes);

app.use("/api/plagiarism", plagiarismRoutes);
app.use("/api/pdf", pdfRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
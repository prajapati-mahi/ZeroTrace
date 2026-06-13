const express = require("express");
const cors = require("cors");

const plagiarismRoutes = require("./routes/plagiarismRoutes");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "ZeroTrace Backend Running",
  });
});

app.use("/api/plagiarism", plagiarismRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

module.exports = router;

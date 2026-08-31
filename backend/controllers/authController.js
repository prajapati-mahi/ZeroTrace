const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

// Helper to check DB readiness
const isDbConnected = () => mongoose.connection.readyState === 1;

// ===============================
// Register User
// ===============================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: "Database connection unavailable. Please ensure your IP address is whitelisted (0.0.0.0/0) in MongoDB Atlas Network Access.",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "zerotrace_secret_key_2026",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[AUTH] Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
};

// ===============================
// Login User
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: "Database connection unavailable. Please ensure your IP address is whitelisted (0.0.0.0/0) in MongoDB Atlas Network Access.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "zerotrace_secret_key_2026",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[AUTH] Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Login failed.",
    });
  }
};

// ===============================
// Forgot Password
// ===============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: "Database connection unavailable. Please ensure your IP address is whitelisted (0.0.0.0/0) in MongoDB Atlas Network Access.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email address.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Password reset instructions sent to ${email}.`,
    });
  } catch (error) {
    console.error("[AUTH] Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Could not process password reset.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
};

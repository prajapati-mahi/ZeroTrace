const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// Register
router.post(
  "/register",
  registerUser
);

// Login
router.post(
  "/login",
  loginUser
);

// We'll add this later
// router.post(
//   "/forgot-password",
//   forgotPassword
// );

module.exports = router;
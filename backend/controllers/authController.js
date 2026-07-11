const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// ===============================
// Register User
// ===============================

const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // Check Empty Fields

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check Existing User

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    // Hash Password

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    // Create User

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    // Generate JWT

    const token =
      jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
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

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

// ===============================
// Login User
// ===============================

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all fields",
      });
    }

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });

    }

    const token =
      jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
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

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }

};

const forgotPassword = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    if (!email) {

      return res.status(400).json({

        success:false,

        message:"Email is required."

      });

    }

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(404).json({

        success:false,

        message:"No account found."

      });

    }

    return res.status(200).json({

      success:true,

      message:
      "Password reset feature coming soon."

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
};
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();


// Register API
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: true
    });

    await newUser.save();

    const verificationToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const verificationLink =
      `http://localhost:5000/api/auth/verify/${verificationToken}`;

    await sendEmail(
      newUser.email,
      "Email Verification",
      `<h2>Verify Your Email</h2>
       <p>Click the link below to verify your email:</p>
       <a href="${verificationLink}">Verify Email</a>`
    );

    res.status(201).json({ message: "Registration successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
     email: email.trim().toLowerCase()
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {

    const user = await User
      .findById(req.user.id)
      .select("-password");

    res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink =
      `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `Click the link to reset your password: ${resetLink}`
    );

    res.status(200).json({
      message: "Password reset link sent to email"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password reset successful"
    });

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }

    res.status(500).json({ message: "Server error" });
  }
});


// Email Verification
router.get("/verify/:token", async (req, res) => {
  try {

    const token = req.params.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      message: "Email verified successfully"
    });

  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired token"
    });
  }
});


// Admin Test Route
router.get("/admin/test",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({ message: "Welcome Admin" });
});

export default router;
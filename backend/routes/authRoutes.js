const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, phone, password });
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token with the user's ID and role, valid for 1 hour
    const token = jwt.sign({ id: user._id, role: user.role }, "yourSecretKey", {
      expiresIn: "1h",
    });

    // Include user's name in the response
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userName: user.name, // Added user name to the response
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Route to create an admin user (for initial setup)
router.post("/create-admin", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const adminExists = await User.findOne({ email, role: "admin" });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new User({
      name,
      email,
      phone,
      password,
      role: "admin",
    });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Export the router to use in other parts of the application
module.exports = router;

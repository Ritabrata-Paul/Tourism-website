const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "office.work.ritabrata.paul02@gmail.com", // Replace with your email
    pass: "lcin uhkw mtqk rsbn ", // Replace with your app password
  },
});

router.get("/check-email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Store reset tokens (In production, use a database)
const passwordResetTokens = new Map();

// Forgot password route
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    passwordResetTokens.set(resetToken, {
      userId: user._id,
      createdAt: Date.now(),
    });

    // Create reset link
    const resetLink = `http://localhost:3000/resetpass.html?token=${resetToken}`;

    // Send email
    const mailOptions = {
      from: "office.work.ritabrata.paul02@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
                <h2>Password Reset Request</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 1 hour.</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email" });
  }
});

// Reset password route
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const resetData = passwordResetTokens.get(token);

    if (!resetData) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Check if token is expired (1 hour validity)
    if (Date.now() - resetData.createdAt > 3600000) {
      passwordResetTokens.delete(token);
      return res.status(400).json({ message: "Reset token has expired" });
    }

    const user = await User.findById(resetData.userId);
    user.password = newPassword;
    await user.save();

    passwordResetTokens.delete(token);
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
});

module.exports = router;

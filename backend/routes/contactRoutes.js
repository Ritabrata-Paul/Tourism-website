const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// Route to handle contact form submission
router.post("/submit", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Create a new contact entry
    const newContact = new Contact({ name, email, phone, message });

    // Save it to the database
    await newContact.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Your message has been submitted successfully." });
  } catch (err) {
    console.error("Error saving contact:", err);
    res
      .status(500)
      .json({
        message:
          "There was an error submitting your message. Please try again later.",
      });
  }
});

module.exports = router;

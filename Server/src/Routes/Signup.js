const express = require("express");
const bcrypt = require("bcrypt"); // Ensure bcrypt is imported
const User = require("../models/User"); // Adjust the path as necessary
const router = express.Router();

// Use express's built-in JSON parser

// User registration route
router.post("/signup", async (req, res) => {
  const { username, email, district, board, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists." });
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user object with hashed password
    const newUser = new User({
      username,
      email,
      district,
      board,
      password: hashedPassword, // Store hashed password
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;

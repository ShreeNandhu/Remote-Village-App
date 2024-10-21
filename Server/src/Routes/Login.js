const express = require("express"); // Make sure express is imported
const bcrypt = require("bcryptjs"); // Make sure bcrypt is imported
const jwt = require("jsonwebtoken"); // Import jwt for token generation
const User = require("../models/User"); // Ensure your User model is imported correctly

const router = express.Router(); // Fix syntax: express.Router()

// Login route
router.post("/loginuser", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; // Export the router

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const User = require("./models/User"); // Adjust path as per your folder structure

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors()); // Enable cross-origin resource sharing
app.use(express.json()); // Middleware to parse JSON request bodies

// MongoDB connection string from .env file
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// User registration (Sign Up) API
app.post("/signup", async (req, res) => {
  const { username, email, district, board, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists." });
    }

    // Create a new user object with the plain text password
    const newUser = new User({
      username,
      email,
      district,
      board,
      password, // Use the plain text password; it will be hashed in the pre-save hook
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// User login API
app.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Use the comparePassword method defined in the user model
    const isPasswordValid = await user.comparePassword(password.trim());
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Respond with a success message or token if needed
    res.status(200).json({ message: "Login successful!", user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Test route


// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});


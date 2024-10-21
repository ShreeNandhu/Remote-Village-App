const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Import dotenv to read .env file
const loginRoute = require("./Routes/Login"); // Adjust path as per your folder structure
const signupRoute = require("./Routes/Signup"); // Adjust path as per your folder structure
const cors = require("cors");


dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors());// Cross origin resource sharing

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

// Use the login and signup routes
app.use("/loginuser", loginRoute); // "/api" is the base path for all login routes
app.use("/signup", signupRoute); // "/api" is the base path for all signup routes

app.post("/test", (req, res) => {
  res.send("Test route working!");
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

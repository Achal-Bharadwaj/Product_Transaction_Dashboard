const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const initRoutes = require("./routes/initRoutes");
app.use("/api", initRoutes);
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);


// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

// Call the database connection function
connectDB();
const Transaction = require("./models/Transaction");


// Basic Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Define PORT and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

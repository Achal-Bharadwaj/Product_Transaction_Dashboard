const express = require("express");
const axios = require("axios");
const Transaction = require("../models/Transaction");

const router = express.Router();

// API URL
const API_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

// Route to fetch and store transactions
router.get("/initialize", async (req, res) => {
  try {
    // Fetch data from the third-party API
    const response = await axios.get(API_URL);
    const transactions = response.data;

    if (!transactions || transactions.length === 0) {
      return res.status(400).json({ message: "No transactions found in API response" });
    }

    // Clear existing records before inserting new ones (optional)
    await Transaction.deleteMany();

    // Insert transactions into the database
    await Transaction.insertMany(transactions);

    res.status(200).json({ message: "Database initialized with transaction data" });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch and store transactions" });
  }
});

module.exports = router;

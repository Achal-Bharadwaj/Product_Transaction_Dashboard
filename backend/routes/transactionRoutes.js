const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

/**
 * @route GET /api/transactions
 * @desc Get transactions with search and pagination
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    let { page = 1, perPage = 10, search = "", month } = req.query;

    page = parseInt(page);
    perPage = parseInt(perPage);

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    // Convert month name to number (e.g., "March" → 3)
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    // Search Query
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { price: isNaN(search) ? null : parseFloat(search) },
          ],
        }
      : {};

    // Filter transactions by month and search query
    const transactions = await Transaction.find({
      ...searchQuery,
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalRecords = await Transaction.countDocuments({
      ...searchQuery,
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    });

    res.json({
      page,
      perPage,
      totalRecords,
      totalPages: Math.ceil(totalRecords / perPage),
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route GET /api/transactions/statistics
 * @desc Get statistics (Total Sales, Sold & Unsold Items)
 * @access Public
 */
router.get("/statistics", async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    // Total Sales Amount
    const totalSales = await Transaction.aggregate([
      {
        $match: {
          sold: true,
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$price" } } },
    ]);

    // Count Sold Items
    const totalSoldItems = await Transaction.countDocuments({
      sold: true,
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    });

    // Count Unsold Items
    const totalUnsoldItems = await Transaction.countDocuments({
      sold: false,
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    });

    res.json({
      totalSales: totalSales.length ? totalSales[0].totalAmount : 0,
      totalSoldItems,
      totalUnsoldItems,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route GET /api/transactions/bar-chart
 * @desc Get Price Range Distribution
 * @access Public
 */
router.get("/bar-chart", async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const rangeResults = [];

    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        price: { $gte: range.min, $lte: range.max },
      });
      rangeResults.push({ range: range.range, count });
    }

    res.json(rangeResults);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route GET /api/transactions/pie-chart
 * @desc Get unique categories and item counts
 * @access Public
 */
router.get("/pie-chart", async (req, res) => {
    try {
      const { month } = req.query;
  
      if (!month) {
        return res.status(400).json({ message: "Month is required" });
      }
  
      // Convert month name to a number (e.g., "March" → 3)
      const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;
  
      // Aggregate categories and count items in each category
      const categoryCounts = await Transaction.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
          },
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
          },
        },
      ]);
  
      res.json(categoryCounts);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

/**
 * @route GET /api/transactions/combined
 * @desc Get combined response from Statistics, Bar Chart & Pie Chart APIs
 * @access Public
 */
router.get("/combined", async (req, res) => {
    try {
      const { month } = req.query;
  
      if (!month) {
        return res.status(400).json({ message: "Month is required" });
      }
  
      // Convert month name to number
      const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;
  
      // Fetch statistics
      const totalSales = await Transaction.aggregate([
        {
          $match: {
            sold: true,
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
          },
        },
        { $group: { _id: null, totalAmount: { $sum: "$price" } } },
      ]);
  
      const totalSoldItems = await Transaction.countDocuments({
        sold: true,
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      });
  
      const totalUnsoldItems = await Transaction.countDocuments({
        sold: false,
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      });
  
      const statistics = {
        totalSales: totalSales.length ? totalSales[0].totalAmount : 0,
        totalSoldItems,
        totalUnsoldItems,
      };
  
      // Fetch bar chart data
      const priceRanges = [
        { range: "0-100", min: 0, max: 100 },
        { range: "101-200", min: 101, max: 200 },
        { range: "201-300", min: 201, max: 300 },
        { range: "301-400", min: 301, max: 400 },
        { range: "401-500", min: 401, max: 500 },
        { range: "501-600", min: 501, max: 600 },
        { range: "601-700", min: 601, max: 700 },
        { range: "701-800", min: 701, max: 800 },
        { range: "801-900", min: 801, max: 900 },
        { range: "901-above", min: 901, max: Infinity },
      ];
  
      const barChart = [];
  
      for (const range of priceRanges) {
        const count = await Transaction.countDocuments({
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
          price: { $gte: range.min, $lte: range.max },
        });
        barChart.push({ range: range.range, count });
      }
  
      // Fetch pie chart data
      const pieChart = await Transaction.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
          },
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
          },
        },
      ]);
  
      // Combine all responses
      res.json({ statistics, barChart, pieChart });
    } catch (error) {
      console.error("Error fetching combined data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

module.exports = router;

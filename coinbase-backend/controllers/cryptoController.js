const { body, validationResult } = require("express-validator");
const Crypto = require("../models/Crypto");

// Get all cryptocurrencies
const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Cryptocurrencies retrieved successfully",
      data: cryptos,
    });
  } catch (error) {
    console.error("Error fetching cryptos:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching cryptocurrencies",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get top gainers (sorted by highest % increase)
const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find()
      .sort({ change24h: -1 })
      .limit(10);

    res.json({
      success: true,
      message: "Top gainers retrieved successfully",
      data: gainers,
    });
  } catch (error) {
    console.error("Error fetching gainers:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching top gainers",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get new listings (sorted by newest first)
const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      message: "New listings retrieved successfully",
      data: newListings,
    });
  } catch (error) {
    console.error("Error fetching new listings:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching new listings",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Add new cryptocurrency
const addCrypto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, symbol, price, image, change24h } = req.body;

    // Check if symbol already exists
    const existingCrypto = await Crypto.findOne({ symbol });
    if (existingCrypto) {
      return res.status(400).json({
        success: false,
        message: "Cryptocurrency with this symbol already exists",
      });
    }

    // Create new crypto
    const crypto = new Crypto({
      name,
      symbol,
      price,
      image,
      change24h,
      isNewListing: true,
    });

    await crypto.save();

    res.status(201).json({
      success: true,
      message: "Cryptocurrency added successfully",
      data: crypto,
    });
  } catch (error) {
    console.error("Error adding crypto:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding cryptocurrency",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
};

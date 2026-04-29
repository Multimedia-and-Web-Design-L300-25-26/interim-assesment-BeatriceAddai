const express = require("express");
const { body } = require("express-validator");
const {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
} = require("../controllers/cryptoController");

const router = express.Router();

// Get all cryptocurrencies
router.get("/crypto", getAllCryptos);

// Get top gainers
router.get("/crypto/gainers", getTopGainers);

// Get new listings
router.get("/crypto/new", getNewListings);

// Add new cryptocurrency
router.post(
  "/crypto",
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Crypto name must be at least 2 characters long"),
    body("symbol")
      .trim()
      .isLength({ min: 1, max: 10 })
      .withMessage("Symbol must be between 1 and 10 characters"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("image")
      .trim()
      .isURL()
      .withMessage("Image must be a valid URL"),
    body("change24h")
      .isFloat()
      .withMessage("24h change must be a valid number"),
  ],
  addCrypto
);

module.exports = router;

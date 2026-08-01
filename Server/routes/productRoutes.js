const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// PURCHASE API
router.post("/purchase", async (req, res) => {
  const { productId, userName } = req.body;

  // just simple response (you can extend later)
  res.json({ message: "Purchased successfully" });
});

module.exports = router;
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  image: String,
  originalPrice: Number,
  discountPrice: Number,
  points: Number,
  tag: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  tag: String,
  title: String,
  excerpt: String,
  fullContent: String,
  image: String,
  date: String,
  read: String,
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
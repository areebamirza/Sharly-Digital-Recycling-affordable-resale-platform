// ==============================
// models/Donation.js
// ==============================

const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  // Kis user ne donate kiya
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Donated item name
  itemName: {
    type: String,
    required: true
  },

  // Category (Books, Clothes, Electronics etc.)
  category: {
    type: String,
    required: true
  },

  // Item condition
  condition: {
    type: String,
    required: true
  },

  // Pickup / Donation address
  address: {
    type: String,
    required: true
  },

  // Reward points earned
  rewardPoints: {
    type: Number,
    default: 0
  },

  // Date of donation
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Donation", donationSchema);
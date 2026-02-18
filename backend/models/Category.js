const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    // Watches, Belts, Clocks, Kitchen, Goggles, Wallets
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    // watches, belts, clocks, kitchen, goggles, wallets
  },
  image: {
    type: String, // URL of category image
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
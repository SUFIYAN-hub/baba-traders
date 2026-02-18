const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: {
    type: Number,
    default: 0  // if on sale, show this price
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  images: [
    {
      type: String // array of image URLs
    }
  ],
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  sold: {
    type: Number,
    default: 0  // tracks how many sold (useful for "popular" section)
  },
  ratings: {
    average: { type: Number, default: 0 },
    count:   { type: Number, default: 0 }
  },
  isFeatured: {
    type: Boolean,
    default: false  // show on homepage
  },
  isActive: {
    type: Boolean,
    default: true   // hide product without deleting
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name:     { type: String },   // snapshot at time of order
      price:    { type: Number },   // snapshot at time of order
      quantity: { type: Number, default: 1 },
      image:    { type: String }
    }
  ],
  shippingAddress: {
    street:   { type: String, required: true },
    city:     { type: String, required: true },
    district: { type: String, required: true },
    state:    { type: String, required: true },
    pincode:  { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Razorpay'],  // Cash on Delivery or Online
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  },
  totalAmount:    { type: Number, required: true },
  razorpayOrderId: { type: String, default: '' }, // for online payment
  deliveredAt:    { type: Date }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
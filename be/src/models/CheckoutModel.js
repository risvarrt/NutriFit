// Created by Rhushabh Bontapalle
const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: { type: Array, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Checkout', CheckoutSchema);

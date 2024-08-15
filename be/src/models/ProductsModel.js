// Created by Rhushabh Bontapalle
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
});

module.exports = mongoose.model('Product', ProductSchema, 'merch_products');

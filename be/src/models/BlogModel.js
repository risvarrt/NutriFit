// Created by Rhushabh Bontapalle
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', BlogSchema);

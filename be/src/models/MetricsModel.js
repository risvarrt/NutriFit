// Created by Poojitha Mummadi
const mongoose = require("mongoose");

const metricsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  height: { type: Number, required: true },
  heightUnit: { type: String, required: true },
  weight: { type: Number, required: true },
  weightUnit: { type: String, required: true },
  arms: { type: Number },
  armsUnit: { type: String },
  chest: { type: Number },
  chestUnit: { type: String },
  hip: { type: Number },
  hipUnit: { type: String },
  notes: { type: String },
});

module.exports = mongoose.model("Metrics", metricsSchema);

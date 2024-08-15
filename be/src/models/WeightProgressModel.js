const mongoose = require("mongoose");

const WeightProgressSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    weight: { type: Number, required: true },
    bodyFat: Number,
    muscleMass: Number,
    bmi: Number,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeightProgress", WeightProgressSchema);

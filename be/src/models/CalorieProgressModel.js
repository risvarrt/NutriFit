const mongoose = require("mongoose");

const CalorieProgressSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    carbohydrates: Number,
    protein: Number,
    fats: Number,
    fiber: Number,
    mealType: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CalorieProgress", CalorieProgressSchema);

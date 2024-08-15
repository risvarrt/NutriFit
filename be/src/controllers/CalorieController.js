const CalorieProgress = require("../models/CalorieProgressModel");

exports.saveCalorieProgress = async (req, res) => {
  try {
    const calorieProgress = new CalorieProgress({
      ...req.body,
    });
    await calorieProgress.save();
    res.status(201).json(calorieProgress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCalorieProgress = async (req, res) => {
  try {
    const calories = await CalorieProgress.find();
    res.status(200).json(calories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

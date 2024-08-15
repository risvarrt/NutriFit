const Weight = require("../models/WeightProgressModel");

exports.saveWeightData = async (req, res) => {
  try {
    const weightData = new Weight(req.body);
    await weightData.save();
    res.status(200).json(weightData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllWeightData = async (req, res) => {
  try {
    const weights = await Weight.find();
    res.status(200).json(weights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Created by Poojitha Mummadi
const Metrics = require("../models/MetricsModel");

// Create a new metrics entry
exports.createMetrics = async (req, res) => {
  try {
    const newMetrics = new Metrics(req.body);
    const metrics = await newMetrics.save();
    res.status(200).json(metrics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all metrics entries
exports.getMetrics = async (req, res) => {
  try {
    const metrics = await Metrics.find().sort({ date: -1 });
    res.json(metrics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a single metric entry by ID
exports.getMetricById = async (req, res) => {
  try {
    const metric = await Metrics.findById(req.params.id);
    if (!metric) {
      return res.status(404).json({ msg: "Metric not found" });
    }
    res.json(metric);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Metric not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Update a metric by ID
exports.updateMetricById = async (req, res) => {
  try {
    let metric = await Metrics.findById(req.params.id);
    if (!metric) {
      return res.status(404).json({ msg: "Metric not found" });
    }
    metric = await Metrics.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(metric);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

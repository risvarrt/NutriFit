// Created by Poojitha Mummadi
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const {
  createMetrics,
  getMetrics,
  getMetricById,
  updateMetricById,
} = require("../controllers/MetricsController");

// Ensure these routes are set up
router.post("/", authMiddleware, createMetrics);
router.get("/", authMiddleware, getMetrics);
router.get("/:id", authMiddleware, getMetricById);
router.put("/:id", authMiddleware, updateMetricById); // Update metric by ID

module.exports = router;

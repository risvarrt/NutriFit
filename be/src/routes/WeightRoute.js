// routes/weightRoutes.js
const express = require("express");
const router = express.Router();
const {
  saveWeightData,
  getAllWeightData,
} = require("../controllers/WeightController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/save", authMiddleware, saveWeightData);
router.get("/all", authMiddleware, getAllWeightData);

module.exports = router;

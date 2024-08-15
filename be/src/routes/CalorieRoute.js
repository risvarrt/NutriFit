const express = require("express");
const router = express.Router();
const {
  saveCalorieProgress,
  getCalorieProgress,
} = require("../controllers/CalorieController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/save", authMiddleware, saveCalorieProgress);
router.get("/all", authMiddleware, getCalorieProgress);

module.exports = router;

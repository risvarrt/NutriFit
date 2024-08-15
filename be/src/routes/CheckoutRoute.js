// Created by Rhushabh Bontapalle
const express = require('express');
const router = express.Router();
const { handleCheckout } = require('../controllers/CheckoutController');
const authMiddleware = require('../middleware/AuthMiddleware');

// @route   POST api/checkout
// @desc    Handle checkout
// @access  Private
router.post('/', authMiddleware, handleCheckout);

module.exports = router;

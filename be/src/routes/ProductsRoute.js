// Created by Rhushabh Bontapalle
const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/ProductsController');
const authMiddleware = require('../middleware/AuthMiddleware');

// @route   GET api/products
// @desc    Get all products
// @access  Private
router.get('/', authMiddleware, getProducts);

module.exports = router;

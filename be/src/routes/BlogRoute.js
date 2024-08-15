// Created by Rhushabh Bontapalle
const express = require('express');
const router = express.Router();
const {
  createBlogPost,
  getBlogPosts,
} = require('../controllers/BlogController');
const authMiddleware = require('../middleware/AuthMiddleware');

// @route   POST api/blog
// @desc    Create a new blog post
// @access  Private
router.post('/', authMiddleware, createBlogPost);

// @route   GET api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', getBlogPosts);

module.exports = router;

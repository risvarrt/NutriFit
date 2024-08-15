// Created by Rhushabh Bontapalle
const Blog = require('../models/BlogModel');

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  const { userEmail, topic, description } = req.body;

  try {
    const newBlogPost = new Blog({
      userEmail,
      topic,
      description,
    });

    const blogPost = await newBlogPost.save();
    res.json(blogPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all blog posts
exports.getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Blog.find().sort({ date: -1 });
    res.json(blogPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

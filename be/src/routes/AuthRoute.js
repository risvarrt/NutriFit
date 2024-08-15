// Created by Jahnavi Prasad Srirampurapu
// APIs for login, register, forgot password, delete user, update profile, and get user profile functionalities

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const router = express.Router();
require('dotenv').config();

const secretKey = process.env.SECRET;

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ success: true, message: 'User registered' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password)) || user.role !== role) {
            return res.status(400).json({ success: false, message: 'Invalid username, password, or role' });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const { username, password, newPassword } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ success: false, message: 'Invalid username or password' });
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete User
router.delete('/delete-user', async (req, res) => {
    try {
        const { username } = req.body;
        await User.deleteOne({ username });
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add details to user profile
router.put('/update-profile', async (req, res) => {
    try {
        const { username, firstName, lastName, email, phone, age, city, height, weight, gender, goal, medical, preferences, restrictions, injuries } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.age = age;
        user.city = city;
        user.height = height;
        user.weight = weight;
        user.gender = gender;
        user.goal = goal;
        user.medical = medical;
        user.preferences = preferences;
        user.restrictions = restrictions;
        user.injuries = injuries;
        await user.save();
        res.status(200).json({ success: true, message: 'User profile updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get user profile
router.get('/user-profile/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

// Created by Jahnavi Prasad Srirampurapu
// User Schema for login and My Profile functionalities, pushed to MongoDB Database

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    medical: {
        type: String,
        required: true
    },
    restrictions: {
        type: String,
        required: true
    },
    preferences: {
        type: String,
        required: true
    },
    injuries: {
        type: String,
        required: true
    },
    savedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

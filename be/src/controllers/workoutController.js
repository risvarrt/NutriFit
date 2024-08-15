const path = require('path');
const WorkoutDetails = require('../models/workoutModel'); // Ensure this path is correct
const UserWorkout = require('../models/userWorkoutModel'); // Ensure this path is correct, declared only once

const getWorkoutsFromFile = async () => {
    return await WorkoutDetails.find(); // Retrieve all workout details
};

exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await getWorkoutsFromFile();
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Failed to retrieve workouts:', error);
    res.status(500).json({ message: 'Error retrieving workouts', error });
  }
};

exports.getWorkoutById = async (req, res) => {
  try {
    const workouts = await getWorkoutsFromFile();
    const workout = workouts.find(w => w._id.toString() === req.params.id);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    console.error('Failed to retrieve workout:', error);
    res.status(500).json({ message: 'Error retrieving workout', error });
  }
};

exports.getSubscribedWorkout = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const userWorkout = await UserWorkout.findOne({ userID: userId });
        if (!userWorkout) {
            return res.status(404).json({ message: 'No subscription found for this user' });
        }

        res.status(200).json({ workoutId: userWorkout.workoutId });
    } catch (error) {
        console.error('Failed to retrieve subscribed workout ID:', error);
        res.status(500).json({ message: 'Error retrieving subscribed workout ID', error });
    }
};


exports.displayId = async (req, res) => {
    const userId = req.body.userId;
    const workoutId = req.params.id;

    console.log('Received userID:', userId, 'and workoutID:', workoutId);

    if (!userId || !workoutId) {
        return res.status(400).json({ message: 'Missing userId or workoutId in the request' });
    }

    try {
        let userWorkout = await UserWorkout.findOne({ userID: userId });
        if (userWorkout) {
            userWorkout.workoutId = workoutId;
            await userWorkout.save();
            res.status(200).json({ message: 'Workout updated successfully', userWorkout });
        } else {
            const newUserWorkout = new UserWorkout({ userID: userId, workoutId: workoutId });
            await newUserWorkout.save();
            res.status(201).json({ message: 'User and Workout added successfully', newUserWorkout });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing your request', error });
    }
};

const UserHistory = require('../models/userHistoryModel');

exports.saveUserHistory = async (req, res) => {
  try {
    const { userId, workoutId, date, day, workouts } = req.body;
    
    // Extract just the date part (YYYY-MM-DD) from the provided date
    const dateOnly = new Date(date).toISOString().split('T')[0];

    // Find if there's already an entry for the same user and date
    const existingEntry = await UserHistory.findOne({ userId, date: dateOnly });

    if (existingEntry) {
      // Update existing entry
      existingEntry.workouts = workouts;
      existingEntry.workoutId = workoutId;
      existingEntry.day = day;
      await existingEntry.save();
      res.status(200).json({ message: 'User history updated successfully', existingEntry });
    } else {
      // Create new entry
      const newUserHistory = new UserHistory({
        userId,
        workoutId,
        date: dateOnly,
        day,
        workouts
      });
      await newUserHistory.save();
      res.status(201).json({ message: 'User history saved successfully', newUserHistory });
    }
  } catch (error) {
    console.error('Failed to save user history:', error);
    res.status(500).json({ message: 'Error saving user history', error });
  }
};

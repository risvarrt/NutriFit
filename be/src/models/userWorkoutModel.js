const mongoose = require('mongoose');

const userWorkoutSchema = new mongoose.Schema({
  userID: {
    type: String,  // Using String to accommodate email IDs
    required: true
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,  // Keeping ObjectId for MongoDB workout IDs
    required: true
  }
});

const UserWorkout = mongoose.model('UserWorkout', userWorkoutSchema);

module.exports = UserWorkout;

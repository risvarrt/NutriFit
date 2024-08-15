const mongoose = require('mongoose');

const RepsDetailsSchema = new mongoose.Schema({
  reps: String,
  weight: String,
}, { _id : false });

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  duration: { type: String, required: true, default: "30 seconds"  },
  rest: { type: String, required: true },
  formTip: { type: String, required: true },
  exercise_image: { type: String, required: true },
  repsDetails: [RepsDetailsSchema]
}, { _id : false });

const UserHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  workoutId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  day: { type: String, required: true },
  workouts: [WorkoutSchema]
});

const UserHistory = mongoose.model('UserHistory', UserHistorySchema);

module.exports = UserHistory;

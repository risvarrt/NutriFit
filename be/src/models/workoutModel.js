const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  duration: { type: String, required: true },
  rest: { type: String, required: true },
  formTip: { type: String, required: true },
  exercise_image: { type: String, required: true }
});

const DaySchema = new mongoose.Schema({
  focus: String,
  exercises: [ExerciseSchema],
  restDay: { type: Boolean, default: false }
});

const WorkoutDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  targetAudience: { type: String, required: true },
  type: { type: String, required: true },
  goal: { type: String, required: true },
  equipment: { type: String, required: true },
  location: { type: String, required: true },
  caloriesBurned: { type: String, required: true },
  imageUrl: { type: String, required: true },
  weeklyPlan: {
    Monday: DaySchema,
    Tuesday: DaySchema,
    Wednesday: DaySchema,
    Thursday: DaySchema,
    Friday: DaySchema,
    Saturday: DaySchema,
    Sunday: DaySchema
  }
});

module.exports = mongoose.model('workoutDetails', WorkoutDetailsSchema);

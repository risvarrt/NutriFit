const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: String, required: true },
    reps: { type: String, required: true },
    duration: { type: String, required: true },
    rest: { type: String, required: true },
    formTip: String,
    focus: { type: String, required: true }
});

const weeklyPlanSchema = new mongoose.Schema({
    focus: [String],
    exercises: {
        type: [exerciseSchema],
        validate: {
            validator: function(v) {
                if (this.restDay && v.length > 0) {
                    return false; // If it's a rest day, there should be no exercises
                }
                return true;
            },
            message: 'Exercises should be empty on a rest day'
        }
    },
    restDay:  Boolean
});

const WorkoutProgramSchema = new mongoose.Schema({
    createdBy: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    trainer: String,
    level: { type: String, required: true },
    targetAudience: { type: String, required: true },
    type: { type: String, required: true },
    goal: { type: [String], required: true },
    equipment: String,
    location: { type: String, required: true },
    caloriesBurned: { type: String, required: true },
    imagelink: { type: String, required: true },
    weeklyPlan: {
        Monday: weeklyPlanSchema,
        Tuesday: weeklyPlanSchema,
        Wednesday: weeklyPlanSchema,
        Thursday: weeklyPlanSchema,
        Friday: weeklyPlanSchema,
        Saturday: weeklyPlanSchema,
        Sunday: weeklyPlanSchema
    }
});

module.exports = mongoose.model('WorkoutProgram', WorkoutProgramSchema);

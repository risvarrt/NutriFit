const WorkoutProgram = require('../models/WorkoutProgram');

// Create a new workout program
const createWorkoutProgram = async (req, res) => {
    try {
        // Create a new workout program instance
        const workoutProgram = new WorkoutProgram(req.body);

        // Validate the weeklyPlan manually before saving
        for (const day of Object.keys(workoutProgram.weeklyPlan)) {
            const dayPlan = workoutProgram.weeklyPlan[day];
            if (!dayPlan.restDay && dayPlan.focus.length === 0) {
                return res.status(400).send({ error: `Focus is required for ${day}` });
            }
            if (!dayPlan.restDay && dayPlan.exercises.length === 0) {
                return res.status(400).send({ error: `At least one exercise is required for ${day}` });
            }
        }

        // Save the workout program to the database
        await workoutProgram.save();
        res.status(201).send(workoutProgram);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all workout programs
const getAllWorkoutPrograms = async (req, res) => {
    try {
        const workoutPrograms = await WorkoutProgram.find();
        res.status(200).send(workoutPrograms);
    } catch (error) {
        res.status(500).send(error);
    }
};
// Get a specific workout program by ID
const getWorkoutProgramById = async (req, res) => {
    try {
        const workoutProgram = await WorkoutProgram.findOne({ id: req.params.id });
        if (!workoutProgram) {
            return res.status(404).send();
        }
        res.status(200).send(workoutProgram);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a workout program by ID
const updateWorkoutProgramById = async (req, res) => {
    console.log('Received ID:', req.params.id);
    console.log('Received Data:', req.body);

    try {
        const workoutProgram = await WorkoutProgram.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        console.log("Found workout program:", workoutProgram);

        if (!workoutProgram) {
            console.log('Workout program not found');
            return res.status(404).send({ error: 'Workout program not found' });
        }

        res.status(200).send(workoutProgram);
    } catch (error) {
        console.error('Error updating workout program:', error.message);
        res.status(400).send({ error: error.message });
    }
};

// Delete a workout program by ID
const deleteWorkoutProgramById = async (req, res) => {
    try {
        const workoutProgram = await WorkoutProgram.findOneAndDelete({ id: req.params.id });
        if (!workoutProgram) {
            return res.status(404).send();
        }
        res.status(200).send(workoutProgram);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createWorkoutProgram,
    getAllWorkoutPrograms,
    getWorkoutProgramById,
    updateWorkoutProgramById,
    deleteWorkoutProgramById
};

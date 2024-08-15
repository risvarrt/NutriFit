const express = require('express');
const router = express.Router();
const workoutProgramController = require('../controllers/WorkoutProgramController');
const authMiddleware = require('../middleware/AuthMiddleware');

// Route to create a new workout program
router.post('/', authMiddleware, workoutProgramController.createWorkoutProgram);

// Route to get all workout programs
router.get('/', authMiddleware,workoutProgramController.getAllWorkoutPrograms);

// Route to get a specific workout program by its ID
router.get('/:id',authMiddleware, workoutProgramController.getWorkoutProgramById);

// Route to update a specific workout program by its ID
router.put('/:id', authMiddleware,workoutProgramController.updateWorkoutProgramById);

// Route to delete a specific workout program by its ID
router.delete('/:id', workoutProgramController.deleteWorkoutProgramById);

module.exports = router;

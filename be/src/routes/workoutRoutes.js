const express = require('express');
const workoutController = require('../controllers/workoutController');
const router = express.Router();

router.get('/', workoutController.getAllWorkouts);
router.get('/subscribed/:userId', workoutController.getSubscribedWorkout);
router.get('/:id', workoutController.getWorkoutById);
router.put('/:id/update', workoutController.displayId); 
router.post('/saveUserHistory', workoutController.saveUserHistory);

module.exports = router;

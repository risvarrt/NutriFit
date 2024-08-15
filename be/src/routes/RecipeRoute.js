const express = require('express');
const { searchRecipes, addRecipe, saveRecipe, getTopRecipes, getRecipeById, getSavedRecipes, getAllRecipes } = require('../controllers/RecipesController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

router.get('/top', authMiddleware, getTopRecipes); 
router.get('/', authMiddleware, searchRecipes); 
router.get('/saved', authMiddleware, getSavedRecipes);
router.get('/all', authMiddleware, getAllRecipes);
router.post('/add', authMiddleware, addRecipe);
router.post('/save', authMiddleware, saveRecipe);
router.get('/:id', authMiddleware, getRecipeById);

module.exports = router;

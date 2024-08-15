const Recipe = require('../models/RecipeModel');
const User = require('../models/UserModel');

exports.getTopRecipes = async (req, res) => {
    try {
      const topRecipes = await Recipe.find().sort({ createdAt: -1 }).limit(3);
      res.status(200).json(topRecipes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching top recipes' });
    }
  };
  
  
  exports.searchRecipes = async (req, res) => {
    try {
      const { search } = req.query;
      let recipes = [];
  
      if (search) {
      
        recipes = await Recipe.find({ name: { $regex: search, $options: 'i' } });
      }
  
      res.status(200).json(recipes);
    } catch (error) {
      console.error('Error searching recipes:', error);
      res.status(500).json({ error: 'Error searching recipes', details: error.message });
    }
  };
exports.addRecipe = async (req, res) => {
  console.log('Received request to add recipe'); 

  try {
    const { name, description, ingredients, steps, nutrition, image } = req.body;
    console.log('Request body:', req.body); 

    
    if (!name || !description || !ingredients || !steps || !nutrition || !image) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newRecipe = new Recipe({
      name,
      description,
      ingredients,
      steps,
      nutrition,
      image,
    });
    console.log('New recipe object created:', newRecipe); 

    const savedRecipe = await newRecipe.save();
    console.log('Recipe saved successfully:', savedRecipe); 

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error); 
    res.status(500).json({ error: 'Error adding recipe', details: error.message });
  }
};

exports.saveRecipe = async (req, res) => {
    try {
      const { userId, recipeId } = req.body;
  
    
      const user = await User.findOne({ username: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      
      if (user.savedRecipes.includes(recipeId)) {
        return res.status(400).json({ message: 'Recipe is already saved' });
      }
  
      
      user.savedRecipes.push(recipeId);
      await user.save();
  
      res.status(200).json({ message: 'Recipe saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving recipe', details: error.message });
    }
  };
  



exports.getRecipeById = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipe', details: error.message });
    }
  };

  exports.getSavedRecipes = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).populate('savedRecipes');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user.savedRecipes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching saved recipes', details: error.message });
    }
  };

  exports.getAllRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ createdAt: -1 });
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipes', details: error.message });
    }
  };
  
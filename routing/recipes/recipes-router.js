const express = require('express');
const router = express.Router();

const db = require('../../database/db-config');
const Recipes = require('./recipes-model');
const restricted = require('../auth/restricted-middleware');

// POST a new recipe
router.post('/create-recipe', restricted, (req, res) => {
  const { recipe_name, creator_id, ingredients, steps } = req.body;

  if (!recipe_name || !creator_id || !ingredients || !steps) {
    res.status(400).json({ message: 'Request body missing items!' });
  } else {
    // Since ingredients and steps will be arrays, will need to pass in arrays to method
    // to be broken down in recipes router.
    const newRecipe = { recipe_name, creator_id };
    Recipes.createNewRecipe(newRecipe, ingredients, steps)
      .then((recipe) => {
        res.status(201).json(recipe);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
});

// GET a recipe with id passed in params
router.get('/retirive-recipe/:id', restricted, (req, res) => {
  const recipeId = req.params.id;

  Recipes.getRecipe(recipeId)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// PUT a recipe for the recipe ID matching ID passed in params
router.put('update-recipe/:id', restricted, (req, res) => {
  const { recipeId } = req.params.id;
  const { recipe_name, creator_id, ingredients, steps } = req.body;

  if (!recipe_name || !creator_id || !ingredients || !steps) {
    res.status(400).json({ message: 'Request body missing items!' });
  } else {
    // Since ingredients and steps will be arrays, will need to pass in arrays to method
    // to be broken down in recipes router.
    const updatedRecipe = { recipe_name, creator_id };
    Recipes.updatedRecipe(recipeId, updatedRecipe, ingredients, steps)
      .then((recipe) => {
        res.status(200).json(recipe);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
});

// DELETE a recipe with ID passed in params
router.delete('delete-recipe/:id', restricted, (req, res) => {
  const { recipeId } = req.params.id;

  Recipes.delete(recipeId)
    .then(() => {
      res
        .status(200)
        .json({ message: 'Recipe with id ' + recipeId + ' has been deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;

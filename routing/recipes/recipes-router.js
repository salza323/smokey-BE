const express = require('express');
const router = express.Router();

const db = require('../../database/db-config');
const Recipes = require('./recipes-model');
const restricted = require('../auth/restricted-middleware');

// TODO build out test suite

// -----------------------------------------------------
// POST a new recipe
// -----------------------------------------------------
router.post('/create-recipe', (req, res) => {
  console.log(req.body);
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

// -----------------------------------------------------
// GET a recipe with id passed in params
// -----------------------------------------------------
router.get('/retirive-recipe/:id', (req, res) => {
  const recipeId = req.params.id;

  Recipes.getRecipe(recipeId)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// -----------------------------------------------------
// GET all recipes in DB, ordered by id
// -----------------------------------------------------
router.get('/', (req, res) => {
  Recipes.getAllRecipes('r.id', 'asc')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// -----------------------------------------------------
// GET all recipes in DB, ordered by likes
// -----------------------------------------------------
router.get('/by-likes', (req, res) => {
  Recipes.getAllRecipes('r.likes', 'desc')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// -----------------------------------------------------
// GET all recipes for a specific user
// -----------------------------------------------------
// TODO get my recipes
router.get('/my-recipes', restricted, (req, res) => {
  Recipes.getMyRecipes(userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// TODO get recipes I have liked

// -----------------------------------------------------
// PUT a recipe for the recipe ID matching ID passed in params
// -----------------------------------------------------
router.put('/update-recipe/:id', (req, res) => {
  const recipeId = req.params.id;
  console.log(recipeId);
  const { recipe_name, creator_id, ingredients, steps } = req.body;
  console.log('req.body', req.body);

  // TODO make sure that the creator_id matches user_id
  if (!recipe_name || !creator_id || !ingredients || !steps) {
    res.status(400).json({ message: 'Request body missing items!' });
  } else {
    // Since ingredients and steps will be arrays, will need to pass in arrays to method
    // to be broken down in recipes router.
    const updatedRecipe = { recipe_name, creator_id };
    Recipes.updateRecipe(recipeId, updatedRecipe, ingredients, steps)
      .then((recipe) => {
        res.status(200).json(recipe);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
});

// -----------------------------------------------------
// DELETE a recipe with ID passed in params
// -----------------------------------------------------
router.delete('/delete-recipe/:id', (req, res) => {
  const recipeId = req.params.id;
  console.log(recipeId);

  // TODO make sure that the creator_id matches user_id
  Recipes.deleteRecipe(recipeId)
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

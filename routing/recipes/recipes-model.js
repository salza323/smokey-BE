const db = require('../../database/db-config');
const dbConfig = require('../../database/db-config');

module.exports = {
  createNewRecipe,
  getRecipe,
};

// -----------------------------------------------------
// -----------------------------------------------------

// POST a new recipe
// helper functions for creating ingredient and steps lists
async function createIngredientList(ingredients, recipeId) {
  await db('ingredients').insert(
    ingredients.map((ingredient) => {
      console.log(ingredient);
      return {
        recipe_id: recipeId,
        ingredient_name: ingredient.ingredient_name,
        ingredient_quantity: ingredient.ingredient_quantity,
      };
    })
  );
}

async function createStepList(steps, recipeId) {
  await db('steps').insert(
    steps.map((step) => {
      return {
        recipe_id: recipeId,
        step_number: step.step_number,
        step_temperature_in_fahrenheit: step.step_temperature_in_fahrenheit,
        step_instruction: step.step_instruction,
      };
    })
  );
}

// Recipe creation function
async function createNewRecipe(newRecipe, ingredients, steps) {
  const [id] = await db('recipes').insert(newRecipe);

  // call helper functions to build out step and ingredient table columns.
  createIngredientList(ingredients, id);
  createStepList(steps, id);

  return getRecipe(id);
}

// -----------------------------------------------------
// -----------------------------------------------------

// GET a recipe with specified ID with all ingredients and steps.
// helper functions to grab all steps and ingredients for a specific recipe.

async function getAllSteps(id) {
  return db('steps as s')
    .select(
      's.step_number',
      's.step_temperature_in_fahrenheit',
      's.step_instruction'
    )
    .where({ 's.recipe_id': id });
}

async function getAllingredients(id) {
  return db('ingredients as i')
    .select('i.ingredient_name', 'i.ingredient_quantity')
    .where({ 'i.recipe_id': id });
}

// Recipe retrieval function
async function getRecipe(id) {
  const recipeData = await db('recipes as r')
    .join('users as u', 'r.creator_id', '=', 'u.id')
    .select('r.recipe_name', 'u.username as chef', 'r.likes')
    .where({ 'r.id': id });

  const recipeSteps = await getAllSteps(id);
  const recipeIngredients = await getAllingredients(id);

  return { recipeData, recipeSteps, recipeIngredients };
}

// -----------------------------------------------------
// -----------------------------------------------------

// GET all recipes

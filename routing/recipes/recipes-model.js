const db = require('../../database/db-config');
const dbConfig = require('../../database/db-config');

module.exports = {
  createNewRecipe,
  getRecipe,
  getAllRecipes,
};

// -----------------------------------------------------
// -----------------------------------------------------

// POST a new recipe
// helper functions for creating ingredient and steps lists
async function createIngredientList(ingredients, recipeId) {
  await db('ingredients').insert(
    ingredients.map((ingredient) => {
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

async function getAllIngredients(id) {
  return db('ingredients as i')
    .select('i.ingredient_name', 'i.ingredient_quantity')
    .where({ 'i.recipe_id': id });
}

// Recipe retrieval function
async function getRecipe(id) {
  const recipeData = await db('recipes as r')
    .join('users as u', 'r.creator_id', '=', 'u.id')
    .select(
      'r.id as recipe_id',
      'r.recipe_name',
      'u.id as user_id',
      'u.username as chef',
      'r.likes'
    )
    .where({ 'r.id': id });

  const recipeSteps = await getAllSteps(id);
  const recipeIngredients = await getAllIngredients(id);

  return { recipeData, recipeSteps, recipeIngredients };
}

// -----------------------------------------------------
// -----------------------------------------------------
// GET all recipes
async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], array[i].id);
  }
}

const startAsyncOperation = async (collection, dbCallback, table) => {
  await asyncForEach(collection, async (recipe) => {
    if (table === 'ingredients') {
      recipe.recipeIngredients = await dbCallback(recipe.recipe_id);
    } else if (table === 'steps') {
      recipe.recipeSteps = await dbCallback(recipe.recipe_id);
    }
  });
};

async function getAllRecipes() {
  let allRecipes = await db('recipes as r')
    .join('users as u', 'r.creator_id', '=', 'u.id')
    .select(
      'r.id as recipe_id',
      'r.recipe_name',
      'u.id as user_id',
      'u.username as chef',
      'r.likes'
    )
    .orderBy('r.id');
  await startAsyncOperation(allRecipes, getAllIngredients, 'ingredients');
  await startAsyncOperation(allRecipes, getAllSteps, 'steps');

  return { allRecipes };
}

// async function getAllRecipes() {
//   const recipeObject = {
//     recipeData: [
//       {
//         recipe_id: 0,
//         recipe_name: '',
//         user_id: 0,
//         chef: '',
//         likes: '',
//       },
//     ],
//     recipeSteps: [
//       {
//         step_number: 0,
//         step_temperature_in_fahrenheit: 0,
//         step_instructions: '',
//       },
//     ],
//     recipeIngredients: [
//       {
//         ingredient_name: '',
//         ingredient_quantity: '',
//       },
//     ],
//   };
//   const allRecipes = await db('recipes as r')
//     .select(
//       'r.id as recipeId',
//       'r.recipe_name',
//       'r.creator_id',
//       'r.likes',
//       'i.ingredient_name',
//       'i.ingredient_quantity'
//     )
//     .from('recipes as r')
//     .leftJoin('ingredients as i', 'i.recipe_id', 'r.id')
//     .leftJoin('steps as s', 's.recipe_id', 'r.id')
//     .orderBy('r.id');

//   // if all recipes.id matches recipe.id in step or ingredient,
//   // then we will append that to apprropriate object

//   return allRecipes;
// }

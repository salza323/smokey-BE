const db = require('../../database/db-config');
const dbConfig = require('../../database/db-config');

module.exports = {
  createNewRecipe,
  getRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
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
      's.id',
      's.step_number',
      's.step_temperature_in_fahrenheit',
      's.step_instruction'
    )
    .where({ 's.recipe_id': id });
}

async function getAllIngredients(id) {
  return db('ingredients as i')
    .select('i.id', 'i.ingredient_name', 'i.ingredient_quantity')
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
// GET all recipes ordered by ID or by LIKES
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

// GET all recipes in DB, ordered by id or likes, endpoints built out to passs in params
// if ordering by ID, only one arg will be passed in, will set second arg to undefined
// and will only order by ID,
// if ordering by likes, likes arg and descending arg will be passed in
async function getAllRecipes(arg1, arg2) {
  let allRecipes = await db('recipes as r')
    .join('users as u', 'r.creator_id', '=', 'u.id')
    .select(
      'r.id as recipe_id',
      'r.recipe_name',
      'u.id as user_id',
      'u.username as chef',
      'r.likes'
    )
    .orderBy(arg1, arg2);
  await startAsyncOperation(allRecipes, getAllIngredients, 'ingredients');
  await startAsyncOperation(allRecipes, getAllSteps, 'steps');

  return { allRecipes };
}

// -----------------------------------------------------
// -----------------------------------------------------
// PUT a recipe for the recipe ID matching ID passed in params
// helper functions for updating ingredient and steps lists
// async function updateIngredientsList(ingredients, recipeId) {
//   ingredients.forEach(async (ingredient) => {
//     try {
//       console.log('ingredient', ingredient);

//       const igredientExists = await db('ingredients').where({
//         id: ingredient.id,
//         recipe_id: recipeId,
//       });
//       if (!igredientExists[0]) {
//         // db('ingredients').insert({
//         //   recipe_id: recipeId,
//         //   ingredient_name: ingredient.ingredient_name,
//         //   ingredient_quantity: ingredient.ingredient_quantity,
//         // });
//         await db('ingredients').insert(ingredient);
//       } else {
//         await db('ingredients').update(ingredient);
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   });
// }

// async function updateStepsList(steps, recipeId) {
//   steps.forEach(async (step) => {
//     try {
//       console.log('step', step);
//       const stepExists = await db('steps').where({
//         id: step.id,
//         recipe_id: recipeId,
//       });
//       if (!stepExists[0]) {
//         db('steps').insert({
//           recipe_id: recipeId,
//           step_number: step.step_number,
//           step_temperature_in_fahrenheit: step.step_temperature_in_fahrenheit,
//           step_instruction: step.step_instruction,
//         });
//       } else {
//         console.log('This step already exists');
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   });
// }

// async function createIngredientList(ingredients, recipeId) {
//   await db('ingredients').insert(
//     ingredients.map((ingredient) => {
//       return {
//         recipe_id: recipeId,
//         ingredient_name: ingredient.ingredient_name,
//         ingredient_quantity: ingredient.ingredient_quantity,
//       };
//     })
//   );
// }

// async function updateIngredientsList(ingredients, recipeId) {
//     console.log('ingredients', ingredients);
//     ingredients.map((ingredient) => {
//       console.log('singleIngredient', ingredient);
//       return db('ingredients')
//         .where({ 'ingredients.id': ingredient.id })
//         .update({
//           ingredient_name: ingredient.ingredient_name,
//           ingredient_quantity: ingredient.ingredient_quantity,
//         })
//         .returning('*');
//     })
//     const result = await getAllIngredients(recipeId);
//     console.log('result', result);
//     return result;
//   }

async function updateIngredientsList(ingredients) {
  ingredients.forEach(async (ingredient) => {
    console.log('ingredient', ingredient);
    const { id, ingredient_name, ingredient_quantity } = ingredient;
    try {
      console.log('ingredient', ingredient);
      await db('ingredients')
        .where({ 'ingredients.id': id })
        .update(ingredient);
    } catch (e) {
      console.log(e, e.stack);
    }
  });
}

async function updateStepsList(steps) {
  steps.forEach(async (step) => {
    const {
      id,
      step_number,
      step_temperature_in_fahrenheit,
      step_instruction,
    } = step;
    try {
      await db('steps').where({ 'steps.id': id }).update(step);
    } catch (e) {
      console.log(e, e.stack);
    }
  });
}

// PUT function that will update the recipe and call ingredient and step update functions.
async function updateRecipe(recipeId, updatedRecipe, ingredients, steps) {
  console.log('updateRecipes in model');
  await db('recipes').where({ 'recipes.id': recipeId }).update(updatedRecipe);
  //   await db('ingredients')
  //     .where({ 'ingredients.recipe_id': recipeId })
  //     .update(ingredients);
  await updateIngredientsList(ingredients);
  console.log('updateIngredients has been called');
  await updateStepsList(steps);

  return getRecipe(recipeId);
}

// -----------------------------------------------------
// -----------------------------------------------------
// DELETE a recipe with ID passed in params
function deleteRecipe(id) {
  return db('recipes').where({ 'recipes.id': id }).del();
}

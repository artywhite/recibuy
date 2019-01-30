const express = require('express');
const Promise = require('bluebird');

const { wrap } = require('src/middleware');

const { RecipeModel, IngredientModel, UnitModel } = require('src/db/models');

const recipeRouter = express.Router();

// TODO: move to controller
async function getPreprocessedIngredient(ingredient) {
  const { newIngredientName, newUnitName, isNew, ingredientId } = ingredient;

  let unitId = ingredient.unitId;
  if (newUnitName) {
    const normalizedUnitName = newUnitName.toLowerCase();
    const newUnit = await UnitModel.createOrGetExisted({
      name: normalizedUnitName,
    });
    unitId = newUnit._id; // TODO: use just `id`
  }

  // Ingredient is new
  if (isNew) {
    const newIngredient = await IngredientModel.create({
      name: newIngredientName,
      unitsIds: [unitId],
    });

    return {
      amount: ingredient.amount,
      unitId,
      ingredientId: newIngredient._id, // TODO: use just `id`
    };
  }

  // If ingredient is already existed
  const existIngredient = await IngredientModel.findById(ingredientId);
  if (newUnitName) {
    existIngredient.unitsIds.push(unitId);
    await existIngredient.save();
  }

  return { ...ingredient, unitId };
}

async function preProcessIngredients(ingredients) {
  return Promise.mapSeries(ingredients, getPreprocessedIngredient);
}

recipeRouter.get('/', async (req, res) => {
  const recipes = await RecipeModel.find();

  res.send(recipes);
});

recipeRouter.post(
  '/',
  wrap(async (req, res) => {
    const { name, ingredients } = req.body;

    if (!name || !ingredients) {
      throw new Error(`Not all fields specified`);
    }

    const preProcessedIngredients = await preProcessIngredients(ingredients);

    // TODO: validation: unitId, ingredientId

    const draftRecipeData = {
      name,
      ingredients: preProcessedIngredients,
    };

    const newRecipe = await RecipeModel.create(draftRecipeData);

    res.send(newRecipe);
  })
);

recipeRouter.put(
  '/:recipeId',
  wrap(async (req, res) => {
    const { name, ingredients } = req.body;
    const { recipeId } = req.params;

    if (!name || !ingredients) {
      throw new Error(`Not all fields specified`);
    }

    const preProcessedIngredients = await preProcessIngredients(ingredients);

    const draftRecipeData = {
      name,
      ingredients: preProcessedIngredients,
    };

    // TODO: find solution for receiving freshly updated data
    await RecipeModel.findOneAndUpdate({ _id: recipeId }, draftRecipeData);

    res.send(draftRecipeData);
  })
);

module.exports = recipeRouter;

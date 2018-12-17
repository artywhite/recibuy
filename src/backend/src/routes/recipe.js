const express = require('express');

const { wrap } = require('src/middleware');

const { RecipeModel, IngredientModel, UnitModel } = require('src/db/models');

const recipeRouter = express.Router();

function preProcessIngredients(ingredients) {
  return ingredients.map(async ingredient => {
    const { newIngredientName, newUnitName, isNew, ingredientId } = ingredient;

    let unitId = ingredient.unitId;
    if (newUnitName) {
      const newUnit = await UnitModel.createOrGetExisted({ name: newUnitName });
      unitId = newUnit._id; // TODO: use just `id`
      console.warn('newUnit', newUnit);
    }

    // Ingredient is new
    if (isNew) {
      const newIngredient = await IngredientModel.create({
        name: newIngredientName,
        unitsIds: [unitId],
      });

      console.warn(`newIngredient`, newIngredient);

      return {
        amount: ingredient.amount,
        unitId,
        ingredientId: newIngredient._id, // TODO: use just `id`
      };
    }

    // If ingredient is already existed
    const existIngredient = await IngredientModel.findById(ingredientId);
    console.warn('existIngredient found', existIngredient);
    if (newUnitName) {
      existIngredient.unitsIds.push(unitId);
      await existIngredient.save();
    }

    return { ...ingredient, unitId };
  });
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

    const preProcessedIngredients = await Promise.all(
      preProcessIngredients(ingredients)
    );

    // TODO: validation: unitId, ingredientId

    const draftRecipeData = {
      name,
      ingredients: preProcessedIngredients,
    };

    console.warn('draftRecipeData', draftRecipeData);

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

    const preProcessedIngredients = await Promise.all(
      preProcessIngredients(ingredients)
    );

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

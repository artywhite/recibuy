const express = require('express');
const mongoose = require('mongoose');

const { wrap } = require('src/middleware');

const { IngredientModel } = require('src/db/models');

const ingredientRouter = express.Router();

ingredientRouter.get('/', async (req, res) => {
  const { ids } = req.query;
  let ingredients;

  if (ids) {
    const idsNormalized = Array.isArray(ids) ? ids : [ids];
    ingredients = await IngredientModel.find({
      _id: { $in: idsNormalized.map(i => mongoose.Types.ObjectId(i)) },
    });
  } else {
    ingredients = await IngredientModel.find();
  }

  res.send(ingredients);
});

ingredientRouter.post(
  '/',
  wrap(async (req, res) => {
    const { name, unitsIds } = req.body;

    if (!name || !unitsIds) {
      throw new Error(`Not all fields specified`);
    }

    const draftIngredient = {
      name,
      unitsIds,
    };

    const newIngredient = await IngredientModel.create(draftIngredient);

    res.send(newIngredient);
  })
);

module.exports = ingredientRouter;

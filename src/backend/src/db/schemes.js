const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const unitSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
    changedAt: { type: Date, default: Date.now },

    name: String,
  },
  {
    toJSON: { virtuals: true },
  }
);

const categorySchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
    changedAt: { type: Date, default: Date.now },

    name: String,
  },
  {
    toJSON: { virtuals: true },
  }
);

const ingredientSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
    changedAt: { type: Date, default: Date.now },

    unitsIds: [ObjectId],

    name: String,
  },
  {
    toJSON: { virtuals: true },
  }
);

const RecipeIngredientSchema = new mongoose.Schema({
  ingredientId: ObjectId,
  amount: Number,
  categoryId: ObjectId,
  unitId: ObjectId,
});

const recipeSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
    changedAt: { type: Date, default: Date.now },

    name: String,
    amount: Number,

    ingredients: [RecipeIngredientSchema],
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = {
  categorySchema,
  ingredientSchema,
  recipeSchema,
  unitSchema,
};

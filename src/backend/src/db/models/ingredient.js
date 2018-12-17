const mongoose = require('mongoose');

const { ingredientSchema } = require('../schemes');

// Note: this should be after all enchances in schema (last line in this file among with exports)
const IngredientModel = mongoose.model('Ingredient', ingredientSchema);

module.exports = IngredientModel;

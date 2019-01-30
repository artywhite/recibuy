const mongoose = require('mongoose');

const { recipeSchema } = require('../schemes');

// Note: this should be after all enchances in schema (last line in this file among with exports)
const RecipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = RecipeModel;

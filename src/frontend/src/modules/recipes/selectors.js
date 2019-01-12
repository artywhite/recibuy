import { convertListToMap } from 'common/helpers/utils';

export const getConvertedToApiRecipeData = recipeData => ({
  id: recipeData.id,
  name: recipeData.name,
  ingredients: recipeData.recipeIngredients.map((ingredient) => {
    const amount = Number.parseFloat(ingredient.amount, 10);
    const { name } = ingredient;
    const {
      ingredientData = {},
      unit: { value: newUnitName, id: unitId, __isNew__: isUnitNew } = {},
    } = ingredient;
    const { id: ingredientId, categoryId, __isNew__: isNew } = ingredientData;

    return {
      ingredientId,
      amount,
      categoryId,
      name,
      // unitId: get(ingredientData, 'unitId', unitId),
      unitId,
      isNew,
      newUnitName: isUnitNew ? newUnitName : '',
      newIngredientName: isNew ? ingredientData.value : '',
    };
  }),
});

export const getConvertedFromApiRecipeData = (recipeData, ingredients, unitsMap) => ({
  ...recipeData,
  ingredients: recipeData.ingredients.map((item) => {
    const ingredientData = ingredients.find(i => i.id === item.ingredientId);
    const unit = unitsMap[item.unitId];

    return { ...item, ingredientData, unit };
  }),
});

const getRecipes = state => state.recipes.recipes;
export const getRecipesIdsMap = state => convertListToMap(getRecipes(state));

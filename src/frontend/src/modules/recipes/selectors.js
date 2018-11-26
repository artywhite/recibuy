import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';

import { convertListToMap } from 'common/helpers/utils';

// TODO: it's availableIngredients
export const MOCK_INGREDIENTS_LIST = [
  {
    id: 1,
    name: 'Ingredient 1',
    categoryId: 1,
    unitId: 1,
  },
  {
    id: 2,
    name: 'Ingredient 2',
    categoryId: 2,
    unitId: 2,
  },
  {
    id: 3,
    name: 'Ingredient 3',
    categoryId: 3,
    unitId: 3,
  },
];

export const MOCK_CATEGORIES_LIST = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' },
];

export const MOCK_UNITS_LIST = [
  { id: 1, name: 'Unit 1' },
  { id: 2, name: 'Unit 2' },
  { id: 3, name: 'Unit 3' },
];

export const categoriesOptions = MOCK_CATEGORIES_LIST.map(item => ({
  ...item,
  value: item.id,
  label: item.name,
}));

export const unitsOptions = MOCK_UNITS_LIST.map(item => ({
  ...item,
  value: item.id,
  label: item.name,
}));

export const ingredientsOptions = MOCK_INGREDIENTS_LIST.map(item => ({
  ...item,
  value: item.id,
  label: item.name,
}));

export const unitsIdsMap = convertListToMap(MOCK_UNITS_LIST);
export const ingredientsIdsMap = convertListToMap(MOCK_INGREDIENTS_LIST);

export const getConvertedToApiRecipeData = recipeData => ({
  id: uniqueId('newRecipe'),
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
      unitId: get(ingredientData, 'unitId', unitId),
      isNew,
      newUnitName: isUnitNew ? newUnitName : '',
      newIngredientName: isNew ? ingredientData.value : '',
    };
  }),
});

export const getConvertedFromApiRecipeData = recipeData => ({
  ...recipeData,
  ingredients: recipeData.ingredients.map((item) => {
    const ingredientData = ingredientsOptions.find(i => i.id === item.ingredientId);

    return { ...item, ingredientData };
  }),
});

const getRecipes = state => state.recipes.recipes;
export const getRecipesIdsMap = state => convertListToMap(getRecipes(state));

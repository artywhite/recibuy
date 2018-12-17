import difference from 'lodash/difference';
import compact from 'lodash/compact';
import { createSelector } from 'reselect';

import { convertListToMap } from 'common/helpers/utils';

export const getIngredients = state => state.ingredients.ingredients;

// eslint-disable-next-line import/prefer-default-export
export const getIngredientsMap = createSelector(
  [getIngredients],
  convertListToMap,
);

export const getMissedIngredientsFromRecipes = (state, recipes) => {
  const storeIngredients = getIngredients(state).map(i => i.id);
  const recipesIngredients = compact(
    recipes.reduce(
      (result, recipe) => [...result, ...recipe.ingredients.map(i => i.ingredientId)],
      [],
    ),
  );

  const missedIds = difference(recipesIngredients, storeIngredients);

  console.warn('getMissedIngredientsFromRecipes', {
    storeIngredients,
    recipesIngredients,
    missedIds,
  });

  return missedIds;
};

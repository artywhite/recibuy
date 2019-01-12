import { createSelector } from 'reselect';

import { getRecipesIdsMap } from 'modules/recipes/selectors';

export const getBasketRecipesIds = state => state.basket.recipesIds;

export const getBasketRecipes = createSelector(
  [getRecipesIdsMap, getBasketRecipesIds],
  (recipesIdsMap, basketRecipesIds) => basketRecipesIds.map(id => recipesIdsMap[id]),
);

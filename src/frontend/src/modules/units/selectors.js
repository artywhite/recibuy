import compact from 'lodash/compact';
import difference from 'lodash/difference';
import { createSelector } from 'reselect';

import { convertListToMap } from 'common/helpers/utils';

export const getUnits = state => state.units.units;

// eslint-disable-next-line import/prefer-default-export
export const getUnitsMap = createSelector(
  [getUnits],
  convertListToMap,
);

export const getMissedUnitsFromRecipes = (state, recipes) => {
  const storeUnits = getUnits(state).map(i => i.id);
  const recipesUnits = compact(
    recipes.reduce((result, recipe) => [...result, ...recipe.ingredients.map(i => i.unitId)], []),
  );

  const missedIds = difference(recipesUnits, storeUnits);

  console.warn('getMissedUnitsFromRecipes', {
    storeUnits,
    recipesUnits,
    missedIds,
  });

  return missedIds;
};

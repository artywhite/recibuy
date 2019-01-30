import { createSelector } from 'reselect';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

import { getBasketRecipes } from 'modules/basket/selectors';
import { getIngredientsMap } from 'modules/ingredients/selectors';
import { getUnitsMap } from 'modules/units/selectors';

// eslint-disable-next-line import/prefer-default-export
export const getShoppingList = createSelector(
  [getBasketRecipes, getIngredientsMap, getUnitsMap],
  (basketRecipes, ingredientsMap, unitsMap) => {
    const ingredientsUnitsMap = basketRecipes.reduce((result, recipe) => {
      const nextResult = { ...result };

      recipe.ingredients.forEach((ingredient) => {
        const { ingredientId, amount, unitId } = ingredient;
        const combinationKey = `${ingredientId}-${unitId}`;

        if (combinationKey in result) {
          nextResult[combinationKey] += amount;
          return;
        }
        nextResult[combinationKey] = amount;
      });

      return nextResult;
    }, {});

    const list = Object.keys(ingredientsUnitsMap).reduce((result, combinationKey) => {
      const [ingredientId, unitId] = combinationKey.split('-');
      return [
        ...result,
        {
          id: combinationKey,
          ingredientName: get(ingredientsMap, `${ingredientId}.name`, ''),
          amount: ingredientsUnitsMap[combinationKey],
          unitName: get(unitsMap, `${unitId}.name`),
        },
      ];
    }, []);

    return sortBy(list, 'ingredientName');
  },
);

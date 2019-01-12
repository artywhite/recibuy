import { push } from 'connected-react-router';
import qs from 'qs';

import { ROUTES } from 'common/constants/routes';

import { getMissedIngredientsFromRecipes } from 'modules/ingredients/selectors';
import { fetchIngredientsByIds } from 'modules/ingredients/actions';

import { getMissedUnitsFromRecipes } from 'modules/units/selectors';
import { fetchUnitsByIds } from 'modules/units/actions';

import { ADD_RECIPE_SUCCESS, UPDATE_RECIPE_SUCCESS, FETCH_RECIPES_SUCCESS } from './actions';

window.qs = qs;

/**
 * Analytics middleware function
 */
const middleware = store => next => (action) => {
  const result = next(action);
  const { dispatch, getState } = store;

  switch (action.type) {
    case UPDATE_RECIPE_SUCCESS:
    case ADD_RECIPE_SUCCESS: {
      dispatch(push(ROUTES.RECIPES));
      push();

      break;
    }

    case FETCH_RECIPES_SUCCESS: {
      const { recipes } = action.data;
      const state = getState();
      const missedIngredientsIds = getMissedIngredientsFromRecipes(state, recipes);
      const missedUnitsIds = getMissedUnitsFromRecipes(state, recipes);

      if (missedIngredientsIds.length) {
        dispatch(fetchIngredientsByIds(missedIngredientsIds));
      }

      if (missedUnitsIds.length) {
        dispatch(fetchUnitsByIds(missedUnitsIds));
      }

      break;
    }

    default:
      break;
  }

  return result;
};

export default middleware;

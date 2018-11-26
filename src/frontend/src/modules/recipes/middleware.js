import { LOCATION_CHANGE, push } from 'connected-react-router';

import { ROUTES } from 'common/constants/routes';

import { ADD_RECIPE_SUCCESS, UPDATE_RECIPE_SUCCESS } from './actions';

/**
 * Analytics middleware function
 */
const middleware = store => next => (action) => {
  const result = next(action);
  const { dispatch } = store;

  switch (action.type) {
    case LOCATION_CHANGE: {
      console.warn('Location change from middleware', action);

      break;
    }

    case UPDATE_RECIPE_SUCCESS:
    case ADD_RECIPE_SUCCESS: {
      dispatch(push(ROUTES.RECIPES));
      push();

      break;
    }

    default:
      break;
  }

  return result;
};

export default middleware;

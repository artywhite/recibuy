
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from 'modules/basket/actions';

import { updateShoppingList } from './actions';
import { getComputedShoppingList } from './selectors';


/**
 * Shopping middleware function
 */
const middleware = store => next => (action) => {
  const result = next(action);
  const { dispatch, getState } = store;

  switch (action.type) {
    case REMOVE_FROM_BASKET:
    case ADD_TO_BASKET: {
      const state = getState();
      const list = getComputedShoppingList(state);

      dispatch(updateShoppingList(list));

      break;
    }

    default:
      break;
  }

  return result;
};

export default middleware;

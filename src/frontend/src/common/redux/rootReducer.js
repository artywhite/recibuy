import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import recipesReducer from 'modules/recipes/reducer';
import ingredientsReducer from 'modules/ingredients/reducer';
import unitsReducer from 'modules/units/reducer';
import basketReducer from 'modules/basket/reducer';

export default history => combineReducers({
  router: connectRouter(history),

  recipes: recipesReducer,
  ingredients: ingredientsReducer,
  units: unitsReducer,
  basket: basketReducer,
});

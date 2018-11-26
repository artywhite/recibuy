import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import recipesReducer from 'modules/recipes/reducer';

export default history => combineReducers({
  router: connectRouter(history),

  recipes: recipesReducer,
});

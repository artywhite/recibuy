import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import recipesRootReducer from 'modules/recipes/reducers';

export default history => combineReducers({
  router: connectRouter(history),
  // rest of your reducers
  recipesModule: recipesRootReducer,
});

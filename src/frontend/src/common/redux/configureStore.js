import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import Api from 'common/helpers/Api';
import recipeMiddleware from 'modules/recipes/middleware.js';

import createRootReducer from './rootReducer';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function (history) {
  const middlewares = [thunk.withExtraArgument({ Api }), routerMiddleware(history), recipeMiddleware];

  return createStore(createRootReducer(history), composeEnhancer(applyMiddleware(...middlewares)));
}

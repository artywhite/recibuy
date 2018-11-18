import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './rootReducer';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function (history) {
  const middlewares = [routerMiddleware(history)];

  return createStore(createRootReducer(history), composeEnhancer(applyMiddleware(...middlewares)));
}

import { combineReducers } from 'redux';
import recipesReducer from './recipes';

const recipeRootReducer = combineReducers({
  recipes: recipesReducer,
});

export default recipeRootReducer;

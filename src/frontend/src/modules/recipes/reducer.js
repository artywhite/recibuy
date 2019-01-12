import {
  ADD_RECIPE_START,
  ADD_RECIPE_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  FETCH_RECIPES_SUCCESS,
} from './actions';

const defaultState = {
  recipes: [],
  isInLoading: false,
  counter: 0,

  isRecipeIsInProgress: false,
};

const recipesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_RECIPE_START:
      return { ...state, isRecipeIsInProgress: true };

    case ADD_RECIPE_SUCCESS:
      return {
        ...state,
        isRecipeIsInProgress: false,
        recipes: [...state.recipes, action.data.recipe],
      };

    case FETCH_RECIPES_SUCCESS:
      return { ...state, recipes: action.data.recipes };

    case UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        isRecipeIsInProgress: false,
        recipes: state.recipes.map((item) => {
          if (item.ingredientId !== action.data.recipe.ingredientId) {
            return item;
          }

          return {
            ...item,
            ...action.data.recipe,
          };
        }),
      };

    default:
      return state;
  }
};

export default recipesReducer;

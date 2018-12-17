import {
  ADD_RECIPE_START,
  ADD_RECIPE_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  FETCH_RECIPES_SUCCESS,
} from './actions';

const tempRecipe = {
  id: 'newRecipe42',
  name: 'My new recipe',
  ingredients: [
    {
      ingredientId: 1,
      amount: 123,
      categoryId: 1,
      unitId: 1,
      newUnitName: '',
      newIngredientName: '',
    },
    {
      ingredientId: 3,
      amount: 44,
      categoryId: 3,
      unitId: 3,
      newUnitName: '',
      newIngredientName: '',
    },
    {
      ingredientId: 2,
      amount: 444,
      categoryId: 2,
      unitId: 2,
      newUnitName: '',
      newIngredientName: '',
    },
  ],
};

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

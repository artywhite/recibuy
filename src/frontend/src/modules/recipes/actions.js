export const ADD_RECIPE_START = 'recipes/ADD_RECIPE_START';
export const ADD_RECIPE_SUCCESS = 'recipes/ADD_RECIPE_SUCCESS';

export const UPDATE_RECIPE_START = 'recipes/UPDATE_RECIPE_START';
export const UPDATE_RECIPE_SUCCESS = 'recipes/UPDATE_RECIPE_SUCCESS';

export const addRecipe = newRecipeData => (dispatch) => {
  dispatch({
    type: ADD_RECIPE_START,
  });

  dispatch({
    type: ADD_RECIPE_SUCCESS,
    data: { recipe: newRecipeData },
  });
};

export const updateRecipe = recipeData => (dispatch) => {
  dispatch({
    type: UPDATE_RECIPE_START,
  });

  dispatch({
    type: UPDATE_RECIPE_SUCCESS,
    data: { recipe: recipeData },
  });
};

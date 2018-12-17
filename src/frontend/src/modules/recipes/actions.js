export const ADD_RECIPE_START = 'recipes/ADD_RECIPE_START';
export const ADD_RECIPE_SUCCESS = 'recipes/ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_FAIL = 'recipes/ADD_RECIPE_FAIL';

export const UPDATE_RECIPE_START = 'recipes/UPDATE_RECIPE_START';
export const UPDATE_RECIPE_SUCCESS = 'recipes/UPDATE_RECIPE_SUCCESS';
export const UPDATE_RECIPE_FAIL = 'recipes/UPDATE_RECIPE_FAIL';

export const FETCH_RECIPES_START = 'recipes/FETCH_RECIPES_START';
export const FETCH_RECIPES_SUCCESS = 'recipes/FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAIL = 'recipes/FETCH_RECIPES_FAIL';

export const addRecipe = newRecipeData => async (dispatch, getState, { Api }) => {
  dispatch({
    type: ADD_RECIPE_START,
  });

  try {
    const recipe = await Api.post('/recipes', newRecipeData);
    dispatch({ type: ADD_RECIPE_SUCCESS, data: { recipe } });

    return recipe;
  } catch (error) {
    dispatch({ type: ADD_RECIPE_FAIL, data: { error } });
    throw error;
  }
};

export const updateRecipe = recipeData => async (dispatch, getState, { Api }) => {
  dispatch({
    type: UPDATE_RECIPE_START,
  });

  try {
    const url = `/recipes/${recipeData.id}`;
    const recipe = await Api.put(url, recipeData);
    dispatch({ type: UPDATE_RECIPE_SUCCESS, data: { recipe } });

    return recipe;
  } catch (error) {
    dispatch({ type: UPDATE_RECIPE_FAIL, data: { error } });
    throw error;
  }
};

export const fetchRecipes = () => async (dispatch, getState, { Api }) => {
  dispatch({ type: FETCH_RECIPES_START });

  try {
    const recipes = await Api.get('/recipes');
    dispatch({ type: FETCH_RECIPES_SUCCESS, data: { recipes } });
    return recipes;
  } catch (error) {
    dispatch({ type: FETCH_RECIPES_FAIL, data: { error } });
    throw error;
  }
};

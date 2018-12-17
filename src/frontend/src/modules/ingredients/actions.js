export const FETCH_INGREDIENTS_START = 'ingredients/FETCH_INGREDIENTS_START';
export const FETCH_INGREDIENTS_SUCCESS = 'ingredients/FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAIL = 'ingredients/FETCH_INGREDIENTS_FAIL';
export const ADD_INGREDIENTS = 'ingredients/ADD_INGREDIENTS';

export const fetchIngredients = () => async (dispatch, getState, { Api }) => {
  dispatch({ type: FETCH_INGREDIENTS_START });

  try {
    const ingredients = await Api.get('/ingredients');
    dispatch({ type: FETCH_INGREDIENTS_SUCCESS, data: { ingredients } });
    return ingredients;
  } catch (error) {
    dispatch({ type: FETCH_INGREDIENTS_FAIL, data: { error } });
    throw error;
  }
};

export const fetchIngredientsByIds = ids => async (dispatch, getState, { Api }) => {
  dispatch({ type: FETCH_INGREDIENTS_START });

  try {
    const ingredients = await Api.get('/ingredients', { ids });
    dispatch({ type: ADD_INGREDIENTS, data: { ingredients } });
    return ingredients;
  } catch (error) {
    dispatch({ type: FETCH_INGREDIENTS_FAIL, data: { error } });
    throw error;
  }
};

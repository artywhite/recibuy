export const FETCH_INGREDIENTS_START = 'ingredients/FETCH_INGREDIENTS_START';
export const FETCH_INGREDIENTS_SUCCESS = 'ingredients/FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAIL = 'ingredients/FETCH_INGREDIENTS_FAIL';
export const ADD_INGREDIENTS = 'ingredients/ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'ingredients/UPDATE_INGREDIENTS';

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

/**
 * Adds new units added in recipe to existed ingredient.
 *
 * @param {Object[]} ingredients
 */
export const addMissingIngredientUnits = ingredients => (dispatch, getState) => {
  const {
    ingredients: { ingredients: storeIngredients },
  } = getState();
  const updatedIngredients = storeIngredients.map((item) => {
    const matchedIngredient = ingredients.find(i => i.ingredientId === item.id);
    const nextUnitsIds = [
      ...item.unitsIds,
      ...(matchedIngredient ? [matchedIngredient.unitId] : []),
    ];

    return { ...item, unitsIds: nextUnitsIds };
  });

  dispatch({ type: UPDATE_INGREDIENTS, data: { ingredients: updatedIngredients } });
};

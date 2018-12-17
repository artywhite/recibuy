import { fetchIngredients } from 'modules/ingredients/actions';
import { fetchRecipes } from 'modules/recipes/actions';
import { fetchUnits } from 'modules/units/actions';

// eslint-disable-next-line import/prefer-default-export
export const fetchConfig = () => async (dispatch) => {
  try {
    await Promise.all([
      dispatch(fetchUnits()),
      dispatch(fetchIngredients()),
      dispatch(fetchRecipes()),
    ]);
  } catch (error) {
    throw error;
  }
};

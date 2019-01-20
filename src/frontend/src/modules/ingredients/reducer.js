import uniqby from 'lodash/uniqBy';
import { FETCH_INGREDIENTS_SUCCESS, ADD_INGREDIENTS, UPDATE_INGREDIENTS } from './actions';

const defaultState = {
  ingredients: [],
  isInLoading: false,
};

const ingredientsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_SUCCESS:
      return { ...state, ingredients: action.data.ingredients };

    case ADD_INGREDIENTS:
      return { ...state, ingredients: uniqby([...action.data.ingredients, ...state.ingredients]) };

    case UPDATE_INGREDIENTS:
      return { ...state, ingredients: [...action.data.ingredients] };

    default:
      return state;
  }
};

export default ingredientsReducer;

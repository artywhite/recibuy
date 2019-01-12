import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from './actions';

const defaultState = {
  recipesIds: [],
};

const basketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return { ...state, recipesIds: [...state.recipesIds, action.data.recipeId] };

    case REMOVE_FROM_BASKET:
      return {
        ...state,
        recipesIds: state.recipesIds.filter(item => item !== action.data.recipeId),
      };

    default:
      return state;
  }
};

export default basketReducer;

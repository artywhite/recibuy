import {
  UPDATE_SHOPPING_LIST,
  REMOVE_SHOPPING_LIST_ITEM,
  UPDATE_SHOPPING_LIST_ITEM,
} from './actions';

const defaultState = {
  shoppingList: [],
};

const recipesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_SHOPPING_LIST:
      return { ...state, shoppingList: action.data.shoppingList };

    case REMOVE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        shoppingList: state.shoppingList.filter(item => item.id !== action.data.itemId),
      };

    case UPDATE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        shoppingList: state.shoppingList.map((item) => {
          if (item.id !== action.data.itemId) {
            return item;
          }

          return { ...item, amount: action.data.amount };
        }),
      };

    default:
      return state;
  }
};

export default recipesReducer;

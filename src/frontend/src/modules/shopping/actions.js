export const UPDATE_SHOPPING_LIST = 'shopping/UPDATE_SHOPPING_LIST';
export const REMOVE_SHOPPING_LIST_ITEM = 'shopping/REMOVE_SHOPPING_LIST_ITEM';
export const UPDATE_SHOPPING_LIST_ITEM = 'shopping/UPDATE_SHOPPING_LIST_ITEM';

export const updateShoppingList = list => ({
  type: UPDATE_SHOPPING_LIST,
  data: { shoppingList: list },
});

export const removeShoppingListItem = id => ({
  type: REMOVE_SHOPPING_LIST_ITEM,
  data: { itemId: id },
});

export const updateShoppingListItem = (id, amount) => ({
  type: UPDATE_SHOPPING_LIST_ITEM,
  data: { itemId: id, amount },
});

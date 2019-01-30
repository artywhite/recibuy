export const ADD_TO_BASKET = 'basket/ADD_TO_BASKET';
export const REMOVE_FROM_BASKET = 'basket/REMOVE_FROM_BASKET';

export const addToBasket = recipeId => ({
  type: ADD_TO_BASKET,
  data: { recipeId },
});

export const removeFromBasket = recipeId => ({
  type: REMOVE_FROM_BASKET,
  data: { recipeId },
});

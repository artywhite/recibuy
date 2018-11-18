const defaultState = {
  recipes: [],
  isInLoading: false,
  counter: 0,
  myteststring: 'ololo privet!',
};

const recipesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export default recipesReducer;

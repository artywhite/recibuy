import uniqby from 'lodash/uniqBy';
import { FETCH_UNITS_SUCCESS, ADD_UNITS } from './actions';

const defaultState = {
  units: [],
  isInLoading: false,
};

const unitsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_UNITS_SUCCESS:
      return { ...state, units: action.data.units };

    case ADD_UNITS:
      return { ...state, units: uniqby([...action.data.units, ...state.units]) };

    default:
      return state;
  }
};

export default unitsReducer;

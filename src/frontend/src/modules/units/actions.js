export const FETCH_UNITS_START = 'units/FETCH_UNITS_START';
export const FETCH_UNITS_SUCCESS = 'units/FETCH_UNITS_SUCCESS';
export const FETCH_UNITS_FAIL = 'units/FETCH_UNITS_FAIL';
export const ADD_UNITS = 'units/ADD_UNITS';

export const fetchUnits = () => async (dispatch, getState, { Api }) => {
  dispatch({ type: FETCH_UNITS_START });

  try {
    const units = await Api.get('/units');
    dispatch({ type: FETCH_UNITS_SUCCESS, data: { units } });
    return units;
  } catch (error) {
    dispatch({ type: FETCH_UNITS_FAIL, data: { error } });
    throw error;
  }
};

export const fetchUnitsByIds = ids => async (dispatch, getState, { Api }) => {
  dispatch({ type: FETCH_UNITS_START });

  try {
    const units = await Api.get('/units', { ids });
    dispatch({ type: ADD_UNITS, data: { units } });
    return units;
  } catch (error) {
    dispatch({ type: FETCH_UNITS_FAIL, data: { error } });
    throw error;
  }
};

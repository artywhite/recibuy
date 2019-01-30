import { createSelector } from 'reselect';

const getLocation = state => state.router.location;

// eslint-disable-next-line import/prefer-default-export
export const getCurrentPathname = createSelector(
  [getLocation],
  location => location.pathname,
);

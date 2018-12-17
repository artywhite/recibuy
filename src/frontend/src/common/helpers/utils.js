export const convertListToMap = (list, idKey = 'id') => list.reduce(
  (result, item) => ({
    ...result,
    [item[idKey]]: { ...item },
  }),
  {},
);

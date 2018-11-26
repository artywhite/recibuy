export const convertListToMap = list => list.reduce(
  (result, item) => ({
    ...result,
    [item.id]: { ...item },
  }),
  {},
);

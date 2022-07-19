export const isDisabled = (item) => {
  return (item?.count || 0) < 0;
};

export const getCount = (item) => {
  return item?.count || 0;
};

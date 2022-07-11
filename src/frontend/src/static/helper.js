export const isDisabled = (id, selection) => {
  if (selection.length === 0) {
    return false;
  }

  const curItem = selection.find((item) => item.id === id);
  if (curItem?.count > 2) {
    return true;
  }

  return selection.length > 2 && curItem === undefined;
};

export const getCount = (id, selection) => {
  if (selection.length === 0) {
    return 0;
  }

  const curItem = selection.find((item) => item.id === id);
  if (curItem) {
    return curItem.count;
  }

  return 0;
};

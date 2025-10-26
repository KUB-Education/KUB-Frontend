export const getFormDirtyValues = <
  Data extends Record<keyof DirtyItems, unknown>,
  DirtyItems extends Record<string, unknown>,
>(
  data: Partial<Data>,
  dirtyItems: DirtyItems,
): Partial<Data> => {
  const dirtyItemsEntries = Object.entries(dirtyItems);

  return dirtyItemsEntries.reduce((dirtyData, [name, value]) => {
    if (typeof value !== 'object') {
      return { ...dirtyData, [name]: data[name] };
    }

    return {
      ...dirtyData,
      [name]: getFormDirtyValues(
        data[name] as Partial<Data>,
        dirtyItems[name] as DirtyItems,
      ),
    };
  }, {});
};

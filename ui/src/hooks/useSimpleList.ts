import { useCallback, useState } from 'react';

const useSimpleList = <T>(initialData: T[], accessor?: (v: T) => any) => {
  const [items, setItems] = useState<T[]>(initialData ?? []);

  const findAccessor = (item: T) => {
    if (!accessor) return item;
    return accessor(item);
  };

  const add = useCallback(
    (item: T) => {
      setItems((prev) => {
        const index = prev.findIndex((v) => findAccessor(v) == findAccessor(item));
        if (index >= 0) return prev;
        return [item, ...prev];
      });
    },
    [setItems]
  );

  const remove = useCallback(
    (item: T) => {
      setItems((prev) => {
        return prev.filter((i) => findAccessor(i) !== findAccessor(item));
      });
    },
    [setItems]
  );

  return { items, add, remove };
};

export default useSimpleList;

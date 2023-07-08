import { useCallback, useState } from 'react';

const useSimpleList = <T>(initialData: T[]) => {
  const [items, setItems] = useState<T[]>(initialData ?? []);

  const add = useCallback(
    (item: T) => {
      setItems((prev) => {
        const index = prev.indexOf(item);
        if (index >= 0) return prev;
        return [item, ...prev];
      });
    },
    [setItems]
  );

  const remove = useCallback(
    (item: T) => {
      setItems((prev) => {
        return prev.filter((i) => i !== item);
      });
    },
    [setItems]
  );

  return { items, add, remove };
};

export default useSimpleList;

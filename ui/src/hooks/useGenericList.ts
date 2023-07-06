import { useCallback, useState } from 'react';
import { APIResponse } from '../services/api/APIService';

interface ID {
  id?: string | number;
}

export interface GenericListProps<T extends ID> {
  data: T[];
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onUpdate: (item: T) => void;
  fetch: () => void;
  initialized: boolean;
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

const useGenericList = <T extends ID>(fetchData: () => Promise<APIResponse<T[]>>): GenericListProps<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');

  const [initialized, setInitialized] = useState<boolean>(false);
  const onPageChange = (p: number) => setPage(p);
  const onSearchTextChange = (t: string) => setSearchText(t);

  const fetch = useCallback(async () => {
    setLoading(true);
    const res = await fetchData();
    setInitialized(true);
    setLoading(false);
    if (res.hasError) return;
    setData(res.data);
  }, [setLoading, setData]);

  const onUpdate = useCallback(
    (updatedItem: T) => {
      setData((prev) => {
        const index = prev.findIndex((item) => item.id === updatedItem.id);
        if (index >= 0) {
          const newData = [...prev];
          newData[index] = updatedItem;
          return newData;
        }
        return [updatedItem, ...prev];
      });
    },
    [setLoading, setData]
  );
  return { data, loading, page, onPageChange, fetch, onUpdate, initialized, searchText, onSearchTextChange };
};

export default useGenericList;

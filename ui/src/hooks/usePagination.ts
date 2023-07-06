import { useState, useEffect, useMemo } from 'react';

const usePagination = <T>(items: T[], initialPageSize?: number, page?: number, onPageChange?: (page: number) => void) => {
  const [pageSize, setPageSize] = useState(initialPageSize ?? 10);
  const [currentPage, setCurrentPage] = useState(page ?? 1);

  const onPageSizeChange = (n: number) => setPageSize(n);
  const onChange = (n: number) => {
    setCurrentPage(n);
    onPageChange?.(n);
  };

  const paginatedItems = useMemo(() => {
    const start = pageSize * (currentPage - 1);
    const end = pageSize * currentPage;
    return items.slice(start, end);
  }, [items, pageSize, currentPage]);

  useEffect(() => {
    if (!page) {
      setCurrentPage(1);
    }
  }, [items]);

  useEffect(() => {
    setCurrentPage(page ?? 1);
  }, [page]);

  useEffect(() => {
    // If after any update the page does not have any items, go to the previous page
    if (!paginatedItems.length && currentPage > 1) {
      onChange(currentPage - 1);
    }
  }, [paginatedItems, currentPage]);

  return { paginatedItems, onChange, currentPage, pageSize, onPageSizeChange };
};

export default usePagination;

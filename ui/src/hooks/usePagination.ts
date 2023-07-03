import React from 'react';
import { useState, useEffect, Fragment, useMemo, useRef } from 'react';

const usePagination = <T>(items: T[], initialPageSize?: number) => {
  const [pageSize, setPageSize] = useState(initialPageSize ?? 10);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageSizeChange = (n: number) => setPageSize(n);
  const onChange = (n: number) => setCurrentPage(n);

  const paginatedItems = useMemo(() => {
    const start = pageSize * (currentPage - 1);
    const end = pageSize * currentPage;
    return items.slice(start, end);
  }, [items, pageSize, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return { paginatedItems, onChange, currentPage, pageSize, onPageSizeChange };
};

export default usePagination;

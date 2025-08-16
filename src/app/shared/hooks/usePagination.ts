"use client";
import { useState, useCallback, useMemo } from "react";

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
}

export interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
  total?: number;
}

export interface UsePaginationReturn<T> {
  pagination: PaginationParams;
  paginationInfo: PaginationInfo | null;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  changeLimit: (limit: number) => void;
  resetPagination: () => void;
  getCurrentPageData: (data: T[]) => T[];
  setTotal: (total: number) => void;
}

export function usePagination<T = unknown>({
  initialPage = 1,
  initialLimit = 10,
  total = 0,
}: UsePaginationProps = {}): UsePaginationReturn<T> {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: initialPage,
    limit: initialLimit,
  });

  const [totalCount, setTotalCount] = useState(total);

  const paginationInfo = useMemo((): PaginationInfo | null => {
    if (totalCount === 0) return null;

    const totalPages = Math.ceil(totalCount / pagination.limit);
    const hasNextPage = pagination.page < totalPages;
    const hasPrevPage = pagination.page > 1;

    return {
      currentPage: pagination.page,
      totalPages,
      total: totalCount,
      hasNextPage,
      hasPrevPage,
      startIndex: (pagination.page - 1) * pagination.limit,
      endIndex: Math.min(pagination.page * pagination.limit, totalCount),
    };
  }, [pagination.page, pagination.limit, totalCount]);

  const goToPage = useCallback((page: number) => {
    if (page < 1) return;

    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const nextPage = useCallback(() => {
    if (paginationInfo?.hasNextPage) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [paginationInfo?.hasNextPage]);

  const prevPage = useCallback(() => {
    if (paginationInfo?.hasPrevPage) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  }, [paginationInfo?.hasPrevPage]);

  const changeLimit = useCallback((limit: number) => {
    setPagination({ page: 1, limit });
  }, []);

  const resetPagination = useCallback(() => {
    setPagination({ page: initialPage, limit: initialLimit });
  }, [initialPage, initialLimit]);

  const getCurrentPageData = useCallback(
    (data: T[]): T[] => {
      if (!data || data.length === 0) return [];

      const startIndex = (pagination.page - 1) * pagination.limit;
      const endIndex = startIndex + pagination.limit;

      return data.slice(startIndex, endIndex);
    },
    [pagination.page, pagination.limit]
  );

  const setTotal = useCallback((total: number) => {
    setTotalCount(total);
  }, []);

  return {
    pagination,
    paginationInfo,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
    resetPagination,
    getCurrentPageData,
    setTotal,
  };
}

export default usePagination;

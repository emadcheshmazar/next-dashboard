"use client";
import { useState } from "react";
import apiAddress from "../../../API/apiAddress";
import useApi from "../../../API/useApi";
import { UsersResponse } from "../models";

const useGetUsersApi = (args?: {
  onSuccess?: (data: UsersResponse) => void;
  onFail?: (error: Error) => void;
  initialPage?: number;
  initialLimit?: number;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
}) => {
  const [currentPage, setCurrentPage] = useState(args?.initialPage ?? 1);
  const [limit, setLimit] = useState(args?.initialLimit ?? 6);
  const [totalUsers, setTotalUsers] = useState(0);

  const buildUrl = (page: number, pageLimit: number) => {
    const params = new URLSearchParams();
    params.append("_page", page.toString());
    params.append("_limit", pageLimit.toString());
    return `${apiAddress.users}?${params.toString()}`;
  };

  const { fetch, data, error, isLoading, refetch } = useApi<UsersResponse>(
    "get",
    {
      autoUrl: buildUrl(currentPage, limit),
      enabled: args?.enabled ?? true,
      retryCount: 2,
      staleTime: args?.staleTime,
      cacheTime: args?.cacheTime,
      onSuccess(data, payload) {
        args?.onSuccess?.(data);
        setTotalUsers(10);
      },
      onFail(error, payload) {
        args?.onFail?.(error);
      },
    }
  );

  const totalPages = Math.ceil(totalUsers / limit);
  const paginationInfo = {
    currentPage,
    totalPages,
    total: totalUsers,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex: (currentPage - 1) * limit,
    endIndex: Math.min(currentPage * limit, totalUsers),
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const resetPagination = () => {
    setCurrentPage(args?.initialPage ?? 1);
    setLimit(args?.initialLimit ?? 6);
  };

  return {
    currentPageUsers: data,
    error,
    isLoading,
    pagination: { page: currentPage, limit },
    paginationInfo,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
    resetPagination,

    refetch,
  };
};

export default useGetUsersApi;

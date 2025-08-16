"use client";
import useApi from "../../../API/useApi";
import apiAddress from "../../../API/apiAddress";
import { User } from "../models";

interface useGetUserByIdApiOptions {
  userId: number | null | undefined;
  onSuccess?: (data: User) => void;
  onFail?: (error: Error) => void;
}

const useGetUserByIdApi = ({
  userId,
  onSuccess,
  onFail,
}: useGetUserByIdApiOptions) => {
  const { data, error, isLoading } = useApi<User>("get", {
    autoUrl: userId ? `${apiAddress.users}/${userId}` : undefined,
    enabled: !!userId,
    onSuccess(data) {
      onSuccess?.(data);
    },
    onFail(error) {
      onFail?.(error);
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return {
    user: data,
    isLoading,
    error,
  };
};

export default useGetUserByIdApi;

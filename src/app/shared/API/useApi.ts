import {
  useQuery,
  useMutation,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useCallback, useRef, useEffect } from "react";
import config from "./config";
import customFetcher from "./customFetcher";

export type HttpMethod = "get" | "post" | "put" | "delete";

export interface UseApiOptions<T, P = unknown> {
  onSuccess?: (data: T, payload?: P) => void;
  onFail?: (error: Error, payload?: P) => void;
  retryCount?: number;
  nonRetryStatus?: number[];
  autoUrl?: string;
  params?: unknown;
  retryDelay?: number;
  staleTime?: number;
  cacheTime?: number;
  enabled?: boolean;
}

export function useApi<T, P = unknown>(
  method: "get",
  options?: UseApiOptions<T, P>
): {
  cancel: () => void;
  fetch: (url: string, payload?: P) => Promise<T>;
} & UseQueryResult<T, Error & { status?: number }>;
export function useApi<T, P = unknown>(
  method: Exclude<HttpMethod, "get">,
  options?: UseApiOptions<T, P>
): { cancel: () => void } & UseMutationResult<
  T,
  Error & { status?: number },
  P
>;

export function useApi<T = unknown, P = unknown>(
  method: HttpMethod,
  options?: UseApiOptions<T, P>
) {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortControllerRef.current?.abort(), []);

  const isAbortError = (err: unknown) => {
    const anyErr = err as Error & { name?: string; code?: string };
    return anyErr?.name === "AbortError" || anyErr?.code === "ABORT_ERR";
  };

  const shouldRetry = (failureCount: number, error: unknown) => {
    if (isAbortError(error)) return false; // مهم: ریترای نکن روی cancel
    const apiError = error as Error & { status?: number };
    const status = apiError?.status;
    const max = options?.retryCount ?? config.apiRequestRetryCount;
    if (!status) return failureCount < max;
    if (
      options?.nonRetryStatus?.includes(status) ||
      config.dontRetryStatus.includes(status)
    )
      return false;
    return failureCount < max;
  };

  const fetchApi = useCallback(
    async (url: string, payload?: P): Promise<T> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const fetchOptions: RequestInit = {
        method: method.toUpperCase(),
        signal: abortControllerRef.current.signal,
      };

      if (method !== "get" && payload !== undefined) {
        fetchOptions.body = JSON.stringify(payload);
      }

      const response = await customFetcher(url, fetchOptions);

      if (!response.ok) {
        const error = new Error(
          `API error with status ${response.status}`
        ) as Error & { status: number };
        error.status = response.status;
        throw error;
      }

      const text = await response.text();
      if (!text) return undefined as T;
      try {
        return JSON.parse(text) as T;
      } catch {
        return text as unknown as T;
      }
    },
    [method]
  );

  const queryKey = [method, options?.autoUrl, options?.params] as const;

  const query = useQuery<T, Error & { status?: number }>({
    queryKey,
    queryFn: async () => {
      const fetchOptions: RequestInit = {
        method: method.toUpperCase(),
      };

      const response = await customFetcher(
        options?.autoUrl ?? "",
        fetchOptions
      );

      if (!response.ok) {
        const error = new Error(
          `API error with status ${response.status}`
        ) as Error & { status: number };
        error.status = response.status;
        throw error;
      }

      const text = await response.text();
      if (!text) return undefined as T;
      try {
        return JSON.parse(text) as T;
      } catch {
        return text as unknown as T;
      }
    },
    retry: shouldRetry,
    retryDelay: options?.retryDelay ?? 1500,
    enabled: method === "get" && (options?.enabled ?? !!options?.autoUrl),
    staleTime: options?.staleTime,
    gcTime: options?.cacheTime,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (method === "get" && query.data !== undefined && options?.onSuccess) {
      options.onSuccess(query.data);
    }
  }, [method, query.data]);

  useEffect(() => {
    if (method === "get" && query.error && options?.onFail) {
      options.onFail(query.error as Error);
    }
  }, [method, query.error]);

  const mutation = useMutation<T, Error & { status?: number }, P>({
    mutationFn: (payload: P) => fetchApi(options?.autoUrl ?? "", payload),
    retry: shouldRetry,
    retryDelay: options?.retryDelay ?? 1500,
    onSuccess: options?.onSuccess,
    onError: options?.onFail,
  });

  const cancel = () => abortControllerRef.current?.abort();

  if (method === "get") {
    return {
      cancel,
      fetch: fetchApi,
      ...query,
    };
  }

  return {
    cancel,
    ...mutation,
  };
}

export default useApi;

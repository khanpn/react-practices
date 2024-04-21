import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import apiClient, { FetchApiDataResponse } from "../services/apiClient";
import { FetchApiConfig, initialDataFn } from "./useFetchApi";

interface InfiniteFetchApiConfig<T> extends FetchApiConfig<T> {
  initialPageParam?: number;
}

export function initialDataForInfiniteFn<T>(
  initialData: T | undefined
): InfiniteData<FetchApiDataResponse<T>> | undefined {
  if (initialData === undefined) return undefined;
  const apiResponse = initialDataFn<T>(initialData);
  if (!apiResponse) return undefined;
  return { pages: [apiResponse], pageParams: [1] };
}

export const useInfiniteFetchApi = <T>(
  endpoint: string,
  config?: InfiniteFetchApiConfig<T>
) => {
  return useInfiniteQuery<FetchApiDataResponse<T>, Error>({
    initialData: initialDataForInfiniteFn<T>(config?.initialData),
    initialPageParam: config?.initialPageParam || 1,
    queryKey: [endpoint, config?.requestConfig],
    queryFn: ({ pageParam }) =>
      apiClient.getAll<T>(endpoint, {
        ...config?.requestConfig,
        params: { ...config?.requestConfig?.params, page: pageParam },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: config?.staleTime,
    initialDataUpdatedAt: config?.initialDataUpdatedAt,
  });
};

import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { FetchApiDataResponse } from "../services/apiClient";
import { BaseFetchApiConfig } from "./useFetchApi";

interface InfiniteFetchApiConfig<T> extends BaseFetchApiConfig<T> {
  initialPageParam?: number;
  queryFn: (context: QueryFunctionContext) => Promise<FetchApiDataResponse<T>>;
}

export function initialDataForInfiniteFn<T>(
  initialData: T | undefined
): InfiniteData<FetchApiDataResponse<T>> | undefined {
  if (initialData === undefined) return undefined;
  const apiResponse = initialData ? { results: initialData } : undefined;
  if (!apiResponse) return undefined;
  return { pages: [apiResponse], pageParams: [1] };
}

export const useInfiniteFetchApi = <T>(config: InfiniteFetchApiConfig<T>) => {
  return useInfiniteQuery<FetchApiDataResponse<T>, Error>({
    initialData: initialDataForInfiniteFn<T>(config?.initialData),
    initialPageParam: config?.initialPageParam || 1,
    queryKey: config.queryKey,
    queryFn: (context: QueryFunctionContext) => config.queryFn(context),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: config?.staleTime,
    initialDataUpdatedAt: config?.initialDataUpdatedAt,
  });
};

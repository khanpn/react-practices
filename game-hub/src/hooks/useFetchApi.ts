import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import apiClient, { FetchApiDataResponse } from "../services/apiClient";

export interface FetchApiConfig<T> {
  initialData?: T;
  requestConfig?: AxiosRequestConfig;
  staleTime?: number;
  initialDataUpdatedAt?: number;
}

export function initialDataFn<T>(
  initialData: T | undefined
): FetchApiDataResponse<T> | undefined {
  return initialData ? { results: initialData } : undefined;
}

export const useFetchApi = <T>(
  endpoint: string,
  config?: FetchApiConfig<T>
) => {
  const { isLoading, error, data } = useQuery<FetchApiDataResponse<T>, Error>({
    initialData: initialDataFn<T>(config?.initialData),
    queryKey: [endpoint, config?.requestConfig],
    queryFn: () =>
      apiClient.getAll<T>(endpoint, {
        ...config?.requestConfig,
      }),
    staleTime: config?.staleTime,
    initialDataUpdatedAt: config?.initialDataUpdatedAt,
  });

  return { data, error, isLoading };
};

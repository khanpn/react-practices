import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import apiClient from "../services/api-client";

interface FetchApiDataResponse<T> {
  count: number;
  results: T;
}

interface FetchApiConfig<T> {
  initialData?: T;
  requestConfig?: AxiosRequestConfig;
}

export const useFetchApi = <T>(
  endpoint: string,
  config?: FetchApiConfig<T>
) => {
  const { isLoading, error, data } = useQuery<T, Error>({
    initialData: config?.initialData,
    queryKey: [endpoint, config?.requestConfig],
    queryFn: () =>
      apiClient
        .get<FetchApiDataResponse<T>>(endpoint, {
          ...config?.requestConfig,
        })
        .then((res) => res.data.results),
  });

  return { data, error, isLoading };
};

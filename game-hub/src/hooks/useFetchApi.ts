import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchApiDataResponse<T> {
  count: number;
  results: T;
}

export const useFetchApi = <T>(
  endpoint: string,
  initialValue: T,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T>(initialValue);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const controller = new AbortController();

  useEffect(
    () => {
      apiClient
        .get<FetchApiDataResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => setData(res.data.results))
        .catch((err) => {
          if (err instanceof CanceledError) {
            return;
          }
          setError(err.message);
        })
        .finally(() => setLoading(false));
      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

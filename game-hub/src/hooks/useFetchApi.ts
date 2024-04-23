import { useQuery } from "@tanstack/react-query";

export interface BaseFetchApiConfig<T> {
  initialData?: T;
  staleTime?: number;
  initialDataUpdatedAt?: number;
  queryKey: any;
}

interface FetchApiConfig<T> extends BaseFetchApiConfig<T> {
  queryFn: () => Promise<T>;
}

export const useFetchApi = <T>(config: FetchApiConfig<T>) => {
  const { isLoading, error, data } = useQuery<T, Error>({
    initialData: config?.initialData,
    queryKey: config.queryKey,
    queryFn: () => config.queryFn(),
    staleTime: config?.staleTime,
    initialDataUpdatedAt: config?.initialDataUpdatedAt,
  });

  return { data, error, isLoading };
};

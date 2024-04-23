import { Platform } from "../models/platform";
import apiClient from "../services/apiClient";
import { useFetchApi } from "./useFetchApi";

const staleTime = 2 * 24 * 60 * 1000; // 2 days

const API_PATH = "/platforms/lists/parents";

export const useFetchPlatforms = (initialData: Platform[]) => {
  return useFetchApi<Platform[]>({
    queryKey: [API_PATH],
    queryFn: () => {
      return apiClient.getAll<Platform[]>(API_PATH).then((res) => res.results);
    },
    initialData,
    staleTime,
    initialDataUpdatedAt: 100,
  });
};

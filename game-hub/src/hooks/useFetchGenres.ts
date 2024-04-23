import { Genre } from "../models/genre";
import apiClient from "../services/apiClient";
import { useFetchApi } from "./useFetchApi";

const staleTime = 24 * 60 * 1000; // 24h

const API_PATH = "/genres";

export const useFetchGenres = () => {
  return useFetchApi<Genre[]>({
    queryKey: [API_PATH],
    queryFn: () => {
      return apiClient.getAll<Genre[]>(API_PATH).then((res) => res.results);
    },
    staleTime,
  });
};

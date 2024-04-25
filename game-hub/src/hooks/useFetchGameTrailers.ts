import Trailer from "../models/trailer";
import apiClient from "../services/apiClient";
import { useFetchApi } from "./useFetchApi";

const API_PATH = "/games";

export const useFetchGameTrailers = (gameId: string | number) => {
  return useFetchApi<Trailer[]>({
    queryKey: [API_PATH, gameId, "movies"],
    queryFn: () => {
      return apiClient
        .getAll<Trailer[]>(`${API_PATH}/${gameId}/movies`)
        .then((res) => res.results);
    },
  });
};

import { Game } from "../models/game";
import apiClient from "../services/apiClient";
import { useFetchApi } from "./useFetchApi";

const API_PATH = "/games";

export const useFetchGame = (slug: string) => {
  return useFetchApi<Game>({
    queryKey: [API_PATH, slug],
    queryFn: () => {
      return apiClient.get<Game>(`${API_PATH}/${slug}`);
    },
  });
};

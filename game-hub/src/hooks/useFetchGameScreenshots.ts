import Screenshot from "../models/screenshot";
import apiClient from "../services/apiClient";
import { useFetchApi } from "./useFetchApi";

const API_PATH = "/games";

export const useFetchGameScreenshots = (gameId: string | number) => {
  return useFetchApi<Screenshot[]>({
    queryKey: [API_PATH, gameId, "screenshots"],
    queryFn: () => {
      return apiClient
        .getAll<Screenshot[]>(`${API_PATH}/${gameId}/screenshots`)
        .then((res) => res.results);
    },
  });
};

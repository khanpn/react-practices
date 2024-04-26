import { AxiosRequestConfig } from "axios";
import { Game } from "../models/game";
import { GameQuery } from "../models/gameQuery";
import { useInfiniteFetchApi } from "./useInfiniteFetchApi";
import apiClient from "../services/apiClient";

const API_PATH = "/games";

export const useFetchGames = (gameQuery?: GameQuery) => {
  const requestConfig: AxiosRequestConfig = {
    params: {
      genres: gameQuery?.genres?.map((genre) => genre.id).join(","),
      parent_platforms: gameQuery?.platforms
        ?.map((platform) => platform.id)
        .join(","),
      ordering: gameQuery?.sortOrder,
      search: gameQuery?.search,
    },
  };
  return useInfiniteFetchApi<Game[]>({
    queryKey: [API_PATH, requestConfig],
    queryFn: ({ pageParam }) =>
      apiClient.getAll<Game[]>(API_PATH, {
        ...requestConfig,
        params: { ...requestConfig?.params, page: pageParam },
      }),
  });
};

import { AxiosRequestConfig } from "axios";
import { Game } from "../models/game";
import { GameQuery } from "../models/gameQuery";
import { useInfiniteFetchApi } from "./useInfiniteFetchApi";

export const useFetchGames = (gameQuery?: GameQuery) => {
  const requestConfig: AxiosRequestConfig = {
    params: {
      genres: gameQuery?.genre?.id,
      parent_platforms: gameQuery?.platform?.id,
      ordering: gameQuery?.sortOrder,
      search: gameQuery?.search,
    },
  };
  return useInfiniteFetchApi<Game[]>("/games", { requestConfig });
};

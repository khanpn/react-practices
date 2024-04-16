import { AxiosRequestConfig } from "axios";
import { Game } from "../models/game";
import { GameQuery } from "../models/gameQuery";
import { useFetchApi } from "./useFetchApi";

export const useFetchGames = (initialValue: Game[], gameQuery?: GameQuery) => {
  const requestConfig: AxiosRequestConfig = {
    params: {
      genres: gameQuery?.genre?.id,
      parent_platforms: gameQuery?.platform?.id,
      ordering: gameQuery?.sortOrder,
    },
  };
  const deps = [
    gameQuery?.genre?.id,
    gameQuery?.platform?.id,
    gameQuery?.sortOrder,
  ];
  return useFetchApi<Game[]>("/games", initialValue, requestConfig, deps);
};

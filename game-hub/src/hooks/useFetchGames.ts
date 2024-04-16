import { AxiosRequestConfig } from "axios";
import { Game } from "../models/game";
import { Genre } from "../models/genre";
import { useFetchApi } from "./useFetchApi";
import { Platform } from "../models/platform";

export const useFetchGames = (
  initialValue: Game[],
  genre?: Genre,
  platform?: Platform
) => {
  const requestConfig: AxiosRequestConfig = {
    params: {
      genres: genre?.id,
      parent_platforms: platform?.id,
    },
  };
  const deps = [genre?.id, platform?.id];
  return useFetchApi<Game[]>("/games", initialValue, requestConfig, deps);
};

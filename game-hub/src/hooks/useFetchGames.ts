import { AxiosRequestConfig } from "axios";
import { Game } from "../models/game";
import { Genre } from "../models/genre";
import { useFetchApi } from "./useFetchApi";

export const useFetchGames = (initialValue: Game[], genre?: Genre) => {
  let requestConfig: AxiosRequestConfig;
  if (genre) {
    requestConfig = {
      params: {
        genres: genre.id,
      },
    };
  }
  return useFetchApi<Game[]>(
    "/games",
    initialValue,
    requestConfig!,
    genre ? [genre] : []
  );
};

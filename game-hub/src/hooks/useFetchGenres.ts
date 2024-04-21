import { Genre } from "../models/genre";
import { useFetchApi } from "./useFetchApi";

const staleTime = 24 * 60 * 1000; // 24h

export const useFetchGenres = () => {
  return useFetchApi<Genre[]>("/genres", { staleTime });
};

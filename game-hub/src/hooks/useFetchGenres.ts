import { Genre } from "../models/genre";
import { useFetchApi } from "./useFetchApi";

export const useFetchGenres = () => {
  return useFetchApi<Genre[]>("/genres");
};

import { Genre } from "../models/genre";
import { useFetchApi } from "./useFetchApi";

export const useFetchGenres = (initialValue: Genre[]) => {
  return useFetchApi<Genre[]>("/genres", initialValue);
};

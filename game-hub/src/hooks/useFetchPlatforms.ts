import { Platform } from "../models/platform";
import { useFetchApi } from "./useFetchApi";

export const useFetchPlatforms = (initialValue: Platform[]) => {
  return useFetchApi<Platform[]>("/platforms/lists/parents", initialValue);
};

import { Platform } from "../models/platform";
import { useFetchApi } from "./useFetchApi";

export const useFetchPlatforms = (initialData: Platform[]) => {
  return useFetchApi<Platform[]>("/platforms/lists/parents", { initialData });
};

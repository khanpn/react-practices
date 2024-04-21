import { Platform } from "../models/platform";
import { useFetchApi } from "./useFetchApi";

const staleTime = 2 * 24 * 60 * 1000; // 2 days

export const useFetchPlatforms = (initialData: Platform[]) => {
  return useFetchApi<Platform[]>("/platforms/lists/parents", {
    initialData,
    staleTime,
    initialDataUpdatedAt: 100,
  });
};

import { Genre } from "./genre";
import { Platform } from "./platform";

export interface GameQuery {
  genres?: Genre[];
  platforms?: Platform[];
  sortOrder?: string;
  search?: string;
}

import { Genre } from "./genre";
import { Platform } from "./platform";

export interface GameQuery {
  genre?: Genre;
  platform?: Platform;
  sortOrder?: string;
}

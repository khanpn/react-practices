import { EsrbRating } from "./esrbRating";
import { Genre } from "./genre";
import { Platform } from "./platform";
import { Publisher } from "./publisher";

export interface Game {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  parent_platforms: {
    platform: Platform;
  }[];
  metacritic: number;
  rating_top: number;
  slug: string;
  playtime: number;
  genres: Genre[];
  publishers: Publisher[];
  released: string;
  website: string;
  esrb_rating: EsrbRating;
}

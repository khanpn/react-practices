import { Game } from "./game";

export interface FetchGamesResponse {
  count: number;
  results: Game[];
}

import { Game } from "../models/game";
import { GameQuery } from "../models/gameQuery";
import { useFetchGames } from "./useFetchGames";

export const useFetchSimilarGames = (game: Game) => {
  const gameQuery: GameQuery = {
    genres: [...game.genres],
    platforms: [...game.parent_platforms.map((pp) => pp.platform)],
  };

  const response = useFetchGames(gameQuery);
  const pages = response.data?.pages.map((page) => {
    return {
      ...page,
      results: [...page.results.filter((g) => g.id !== game.id)],
    };
  });
  return { ...response, data: { ...response.data, pages: pages } };
};

import { Game } from "../../models/game";
import { GameQuery } from "../../models/gameQuery";
import GameGrid from "./GameGrid";

interface Props {
  game: Game;
}

function SimilarGamesGrid({ game }: Props) {
  const gameQuery: GameQuery = {
    genres: game.genres
      ? [...game.genres.map((genre) => `${genre.id}`)]
      : undefined,
    platforms: [...game.parent_platforms.map((pp) => `${pp.platform.id}`)],
  };

  return <GameGrid gameQuery={gameQuery} exclusions={[game.id]} />;
}

export default SimilarGamesGrid;

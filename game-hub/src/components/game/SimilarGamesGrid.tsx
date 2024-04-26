import { Game } from "../../models/game";
import { GameQuery } from "../../models/gameQuery";
import GameGrid from "./GameGrid";

interface Props {
  game: Game;
}

function SimilarGamesGrid({ game }: Props) {
  const gameQuery: GameQuery = {
    genres: [...game.genres],
    platforms: [...game.parent_platforms.map((pp) => pp.platform)],
  };

  return <GameGrid gameQuery={gameQuery} exclusions={[game.id]} />;
}

export default SimilarGamesGrid;

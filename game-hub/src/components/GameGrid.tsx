import { Grid } from "@mui/material";
import { useFetchGames } from "../hooks/useFetchGames";
import { GameQuery } from "../models/gameQuery";
import GameCard, { GameCardSkeleton } from "./GameCard";

interface Props {
  gameQuery?: GameQuery;
  numOfSkeletons?: number;
}

function GameGrid({ gameQuery, numOfSkeletons = 9 }: Props) {
  const { data: games, error, isLoading } = useFetchGames([], gameQuery);

  if (error) return error;
  let skeletons = [];
  if (isLoading) {
    skeletons = Array(numOfSkeletons)
      .fill(1)
      .map((element, index) => index + element);
  }

  return (
    <Grid container spacing={{ xs: 1, sm: 1, md: 3 }} direction="row">
      {isLoading &&
        skeletons.map((i) => (
          <Grid item key={`${i}`} xs={12} sm={6} md={4} xl={3}>
            <GameCardSkeleton />
          </Grid>
        ))}
      {games.map((game) => (
        <Grid item key={`${game.id}`} xs={12} sm={6} md={4} xl={3}>
          <GameCard game={game}></GameCard>
        </Grid>
      ))}
    </Grid>
  );
}

export default GameGrid;

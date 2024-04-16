import { Grid } from "@mui/material";
import { useFetchGames } from "../hooks/useFetchGames";
import GameCard, { GameCardSkeleton } from "./GameCard";
import { Genre } from "../models/genre";
import { Platform } from "../models/platform";

interface Props {
  selectedGenre?: Genre;
  selectedPlatform?: Platform;
  numOfSkeletons?: number;
}

function GameGrid({
  selectedGenre,
  selectedPlatform,
  numOfSkeletons = 9,
}: Props) {
  const {
    data: games,
    error,
    isLoading,
  } = useFetchGames([], selectedGenre, selectedPlatform);

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

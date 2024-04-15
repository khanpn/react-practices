import { Grid } from "@mui/material";
import { useFetchGames } from "../hooks/useFetchGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function GameGrid() {
  const { games, error, isLoading } = useFetchGames([]);
  if (error) return error;
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

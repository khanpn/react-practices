import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { useFetchGames } from "../../hooks/useFetchGames";
import { Game } from "../../models/game";
import { GameQuery } from "../../models/gameQuery";
import GameCard, { GameCardSkeleton } from "./GameCard";

interface Props {
  gameQuery: GameQuery;
  numOfSkeletons?: number;
  exclusions?: number[];
}

function GameGrid({ gameQuery, exclusions, numOfSkeletons = 9 }: Props) {
  const { data, error, isLoading, hasNextPage, fetchNextPage } =
    useFetchGames(gameQuery);

  if (error) return error.message;

  let skeletons = [];
  if (isLoading) {
    skeletons = Array(numOfSkeletons)
      .fill(1)
      .map((element, index) => index + element);
  }

  const navigate = useNavigate();
  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  const mapGames = (games: Game[], exclusions?: number[]) => {
    if (exclusions) {
      games = games.filter((game) => !exclusions.includes(game.id));
    }
    return (
      <>
        {games.map((game) => (
          <Grid item key={`${game.id}`} xs={12} sm={6} md={4} xl={2}>
            <GameCard
              game={game}
              onDetailsClick={(game) => navigate(`/games/${game.slug}`)}
            ></GameCard>
          </Grid>
        ))}
      </>
    );
  };

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={hasNextPage}
      next={() => fetchNextPage()}
      loader={<CircularProgress color="inherit" />}
      style={{ overflow: "visible" }}
    >
      <Grid container spacing={{ xs: 1, sm: 1, md: 3 }} direction="row">
        {isLoading &&
          skeletons.map((i) => (
            <Grid item key={`${i}`} xs={12} sm={6} md={4} xl={2}>
              <GameCardSkeleton />
            </Grid>
          ))}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {mapGames(page.results, exclusions)}
          </React.Fragment>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}

export default GameGrid;

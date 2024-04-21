import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetchGames } from "../../hooks/useFetchGames";
import { GameQuery } from "../../models/gameQuery";
import GameCard, { GameCardSkeleton } from "./GameCard";

interface Props {
  gameQuery?: GameQuery;
  numOfSkeletons?: number;
}

function GameGrid({ gameQuery, numOfSkeletons = 9 }: Props) {
  const { data, error, isLoading, hasNextPage, fetchNextPage } =
    useFetchGames(gameQuery);

  if (error) return error.message;

  let skeletons = [];
  if (isLoading) {
    skeletons = Array(numOfSkeletons)
      .fill(1)
      .map((element, index) => index + element);
  }

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={hasNextPage}
      next={() => fetchNextPage()}
      loader={<CircularProgress color="inherit" />}
    >
      <Grid container spacing={{ xs: 1, sm: 1, md: 3 }} direction="row">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((game) => (
              <Grid item key={`${game.id}`} xs={12} sm={6} md={4} xl={2}>
                <GameCard game={game}></GameCard>
              </Grid>
            ))}
          </React.Fragment>
        ))}
        {isLoading &&
          skeletons.map((i) => (
            <Grid item key={`${i}`} xs={12} sm={6} md={4} xl={2}>
              <GameCardSkeleton />
            </Grid>
          ))}
      </Grid>
    </InfiniteScroll>
  );
}

export default GameGrid;

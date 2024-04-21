import { Button, Grid } from "@mui/material";
import { useFetchGames } from "../hooks/useFetchGames";
import { GameQuery } from "../models/gameQuery";
import GameCard, { GameCardSkeleton } from "./GameCard";
import React from "react";

interface Props {
  gameQuery?: GameQuery;
  numOfSkeletons?: number;
}

function GameGrid({ gameQuery, numOfSkeletons = 9 }: Props) {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchGames(gameQuery);

  if (error) return error.message;
  let skeletons = [];
  if (isLoading) {
    skeletons = Array(numOfSkeletons)
      .fill(1)
      .map((element, index) => index + element);
  }

  return (
    <>
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
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </>
  );
}

export default GameGrid;

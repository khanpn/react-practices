import { Divider, Stack } from "@mui/material";
import { useEffect, useLayoutEffect } from "react";
import {
  GameGrid,
  GameHeading,
  GameSortSelector,
  GenreList,
  PlatformSelector,
} from "../components";
import { useGameQueryStore, useGlobalSearchStore } from "../store";

function HomePage() {
  const searchText = useGlobalSearchStore((state) => state.searchText);
  const setSearchText = useGlobalSearchStore((state) => state.setSearchText);
  const gameQuery = useGameQueryStore((state) => state.gameQuery);
  const setGameQuery = useGameQueryStore((state) => state.setGameQuery);
  const selectedGenres = useGameQueryStore((state) => state.gameQuery.genres);
  const selectedPlatforms = useGameQueryStore(
    (state) => state.gameQuery.platforms
  );

  useLayoutEffect(() => {
    if (selectedGenres || selectedPlatforms) {
      setSearchText("");
    }
    window.scroll(0, 0);
  }, [selectedGenres, selectedPlatforms]);

  useLayoutEffect(() => {
    if (searchText) {
      setGameQuery({});
    }
  }, [searchText]);

  useEffect(() => {
    return () => {
      setSearchText("");
      setGameQuery({});
    };
  }, []);

  return (
    <GenreList heading="Genres">
      <Stack direction="row" p={{ xs: 1, md: 2 }}>
        <Divider
          variant="fullWidth"
          component="div"
          sx={{ px: 0.5, border: "none" }}
        />
        <Stack direction="column">
          <GameHeading />
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" pt={1}>
            <PlatformSelector />
            <GameSortSelector />
          </Stack>

          <Divider
            component="div"
            sx={{
              mb: 2,
              border: "none",
            }}
          />
          <GameGrid gameQuery={{ ...gameQuery, search: searchText }} />
        </Stack>
        <Divider
          component="div"
          sx={{
            mx: 1,
            border: "none",
          }}
        />
      </Stack>
    </GenreList>
  );
}

export default HomePage;

import { Divider, Stack } from "@mui/material";
import { useLayoutEffect } from "react";
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
  const selectedGenres = useGameQueryStore((state) => state.gameQuery.genres);

  useLayoutEffect(() => {
    window.scroll(0, 0);
    return () => {
      setSearchText("");
    };
  }, [selectedGenres]);

  return (
    <Stack direction="row" sx={{ mt: 2 }}>
      <GenreList />
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
  );
}

export default HomePage;

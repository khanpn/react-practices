import { Divider, Stack } from "@mui/material";
import { useContext, useState } from "react";
import {
  GameGrid,
  GameHeading,
  GameSortSelector,
  GenreList,
  PlatformSelector,
} from "../components";
import GlobalSearchContext from "../contexts/globalSearchContext";
import { GameQuery } from "../models/gameQuery";

function HomePage() {
  const { searchText } = useContext(GlobalSearchContext);
  const [gameQuery, setGameQuery] = useState<GameQuery>({});
  return (
    <Stack direction="row" sx={{ mt: 2 }}>
      <GenreList
        selectedGenre={gameQuery.genres ? gameQuery.genres[0] : undefined}
        onSelectGenre={(genre) =>
          setGameQuery({ ...gameQuery, genres: [{ ...genre }] })
        }
      />
      <Divider
        variant="fullWidth"
        component="div"
        sx={{ px: 1, border: "none" }}
      />
      <Stack direction="column">
        <GameHeading gameQuery={gameQuery} />
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" pt={1}>
          <PlatformSelector
            onSelectPlatform={(platform) =>
              setGameQuery({
                ...gameQuery,
                platforms: platform ? [{ ...platform }] : undefined,
              })
            }
          />
          <GameSortSelector
            onChange={(value) =>
              setGameQuery({
                ...gameQuery,
                sortOrder: value,
              })
            }
          />
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

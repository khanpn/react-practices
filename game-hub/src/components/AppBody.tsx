import { Box, Divider, Stack } from "@mui/material";
import { useState } from "react";
import { GameQuery } from "../models/gameQuery";
import GameGrid from "./GameGrid";
import GameSortSelector from "./GameSortSelector";
import GenreList from "./GenreList";
import PlatformSelector from "./PlatformSelector";
import GameHeading from "./GameHeading";

interface Props {
  searchInput?: string;
}

function AppBody({ searchInput }: Props) {
  const [gameQuery, setGameQuery] = useState<GameQuery>({});
  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <GenreList
          selectedGenre={gameQuery.genre}
          onSelectGenre={(genre) =>
            setGameQuery({ ...gameQuery, genre: { ...genre } })
          }
        />
      </Box>
      <Stack direction="column">
        <GameHeading gameQuery={gameQuery} />
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" pt={1}>
          <PlatformSelector
            onSelectPlatform={(platform) =>
              setGameQuery({
                ...gameQuery,
                platform: platform ? { ...platform } : undefined,
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
        <GameGrid gameQuery={{ ...gameQuery, search: searchInput }} />
      </Stack>
      <Divider
        component="div"
        sx={{
          mx: 1,
          border: "none",
          display: { xs: "none", md: "block" },
        }}
      />
    </Stack>
  );
}

export default AppBody;

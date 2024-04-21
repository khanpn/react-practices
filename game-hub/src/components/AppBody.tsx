import { Divider, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { GameQuery } from "../models/gameQuery";
import {
  GameGrid,
  GameHeading,
  GameSortSelector,
  GenreList,
  PlatformSelector,
} from "./game";
import GlobalSearchContext from "../contexts/globalSearchContext";

function AppBody() {
  const { searchText } = useContext(GlobalSearchContext);
  const [gameQuery, setGameQuery] = useState<GameQuery>({});
  return (
    <Stack direction="row">
      <GenreList
        selectedGenre={gameQuery.genre}
        onSelectGenre={(genre) =>
          setGameQuery({ ...gameQuery, genre: { ...genre } })
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

export default AppBody;

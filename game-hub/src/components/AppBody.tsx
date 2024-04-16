import { Box, Divider, Stack } from "@mui/material";
import { useState } from "react";
import { Genre } from "../models/genre";
import { Platform } from "../models/platform";
import GameGrid from "./GameGrid";
import GenreList from "./GenreList";
import PlatformSelector from "./PlatformSelector";

function AppBody() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>();
  return (
    <Stack direction="row">
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <GenreList
          selectedGenre={selectedGenre}
          onSelectGenre={(genre) => setSelectedGenre({ ...genre })}
        />
      </Box>
      <Divider
        component="div"
        sx={{
          mx: 1,
          border: "none",
          display: { xs: "none", md: "block" },
        }}
      />
      <Stack direction="column">
        <PlatformSelector
          onSelectPlatform={(platform) =>
            setSelectedPlatform(platform ? { ...platform } : undefined)
          }
        />
        <Divider
          component="div"
          sx={{
            mb: 2,
            border: "none",
          }}
        />
        <GameGrid
          selectedGenre={selectedGenre}
          selectedPlatform={selectedPlatform}
        />
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

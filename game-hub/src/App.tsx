import { Box, CssBaseline, Divider, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import "./App.css";
import avatarUrl from "./assets/avatars/1.jpg";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import TopNavBar from "./components/TopNavBar";
import ColorModeContext from "./contexts/colorMode";
import SecurityContext from "./contexts/security";
import { useTheme } from "./hooks/useTheme";
import { Genre } from "./models/genre";
import { Platform } from "./models/platform";
import { User } from "./models/user";

const user: User = {
  id: 1,
  username: "khanhn",
  firstName: "Khanh",
  lastName: "Nguyen",
  avatar: avatarUrl,
};

function App() {
  const { theme, colorMode } = useTheme("dark");
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SecurityContext.Provider value={{ loggedInUser: user }}>
          <CssBaseline />
          <TopNavBar />
          <Divider component="div" sx={{ my: 3, border: "none" }} />
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
        </SecurityContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import {
  Box,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Stack,
  ThemeProvider,
} from "@mui/material";
import "./App.css";
import GameGrid from "./components/GameGrid";
import TopNavBar from "./components/TopNavBar";
import avatarUrl from "./assets/avatars/1.jpg";
import ColorModeContext from "./contexts/colorMode";
import { useTheme } from "./hooks/useTheme";
import SecurityContext from "./contexts/security";
import { User } from "./models/user";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./models/genre";

const user: User = {
  id: 1,
  username: "khanhn",
  firstName: "Khanh",
  lastName: "Nguyen",
  avatar: avatarUrl,
};

function App() {
  const { theme, colorMode } = useTheme("dark");
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>();
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
                onSelectGenre={(genre) => setSelectedGenre(genre)}
              />
            </Box>
            <GameGrid selectedGenre={selectedGenre} />
          </Stack>
        </SecurityContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

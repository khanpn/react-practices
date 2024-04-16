import { Container, CssBaseline, Divider, ThemeProvider } from "@mui/material";
import "./App.css";
import GameGrid from "./components/GameGrid";
import TopNavBar from "./components/TopNavBar";
import avatarUrl from "./assets/avatars/1.jpg";
import ColorModeContext from "./contexts/colorMode";
import { useTheme } from "./hooks/useTheme";
import SecurityContext from "./contexts/security";
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
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SecurityContext.Provider value={{ loggedInUser: user }}>
          <CssBaseline />
          <TopNavBar />
          <Divider component="div" sx={{ my: 3, border: "none" }} />
          <Container disableGutters maxWidth="md">
            <GameGrid />
          </Container>
        </SecurityContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

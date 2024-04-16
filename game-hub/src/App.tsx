import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import "./App.css";
import avatarUrl from "./assets/avatars/1.jpg";
import AppBody from "./components/AppBody";
import TopNavBar from "./components/TopNavBar";
import ColorModeContext from "./contexts/colorMode";
import SecurityContext from "./contexts/security";
import { useTheme } from "./hooks/useTheme";
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
          <AppBody />
        </SecurityContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

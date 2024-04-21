import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import "./App.css";
import avatarUrl from "./assets/avatars/1.jpg";
import AppBody from "./components/AppBody";
import TopNavBar from "./components/TopNavBar";
import ColorModeContext from "./contexts/colorMode";
import SecurityContext from "./contexts/security";
import { useTheme } from "./hooks/useTheme";
import { User } from "./models/user";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const user: User = {
  id: 1,
  username: "khanhn",
  firstName: "Khanh",
  lastName: "Nguyen",
  avatar: avatarUrl,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { theme, colorMode } = useTheme("dark");
  const [searchInput, setSearchInput] = useState<string>("");
  const onDoSearch = (value: string) => {
    setSearchInput(value);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SecurityContext.Provider value={{ loggedInUser: user }}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <TopNavBar onDoSearch={onDoSearch} />
            <Divider component="div" sx={{ my: 3, border: "none" }} />
            <AppBody searchInput={searchInput} />
          </QueryClientProvider>
        </SecurityContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

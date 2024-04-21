import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { ReactNode, useReducer } from "react";
import ColorModeContext from "../contexts/colorModeContext";
import colorModeReducer, { ColorMode } from "../reducers/colorModeReducer";

const getPersistedColorMode = (): ColorMode | undefined => {
  const persistedValue = localStorage.getItem("colorMode");
  switch (persistedValue) {
    case "dark":
      return ColorMode.DARK;
    case "light":
      return ColorMode.LIGHT;
    default:
      return undefined;
  }
};

interface ColorModeProviderProps {
  initialtMode?: ColorMode;
  children: ReactNode;
}

function ColorModeProvider({
  initialtMode = ColorMode.DARK,
  children,
}: ColorModeProviderProps) {
  const persistedColorMode = getPersistedColorMode();
  const [colorMode, dispatchColorMode] = useReducer(
    colorModeReducer,
    persistedColorMode || initialtMode
  );
  const toggleColorMode = React.useMemo(
    () => ({
      toggleColorMode: () => dispatchColorMode({ type: "TOGGLE" }),
    }),
    []
  );
  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={toggleColorMode}>
        <CssBaseline />
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}

export default ColorModeProvider;

import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ReactNode, useMemo, useReducer } from "react";
import ColorModeContext from "../contexts/colorModeContext";
import colorModeReducer, { ColorMode } from "../reducers/colorModeReducer";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: blue,
          divider: blue[200],
          background: {
            default: grey[200],
            paper: grey[50],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          divider: grey[700],
          background: {
            default: "#151515",
            paper: grey[900],
          },
          text: {
            primary: grey[50],
            secondary: grey[300],
          },
        }),
  },
});

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
  const toggleColorMode = useMemo(
    () => ({
      toggleColorMode: () => dispatchColorMode({ type: "TOGGLE" }),
    }),
    []
  );

  const theme = createTheme(
    useMemo(() => getDesignTokens(colorMode), [colorMode])
  );
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

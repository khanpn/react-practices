import { createTheme } from "@mui/material";
import React, { useState } from "react";

const getPersistedColorMode = (): "light" | "dark" | undefined => {
  const persistedValue = localStorage.getItem("colorMode");
  switch (persistedValue) {
    case "light":
      return "light";
    case "dark":
      return "dark";
    default:
      return undefined;
  }
};

export const useTheme = (initialtMode: "light" | "dark" = "light") => {
  const persistedColorMode = getPersistedColorMode();
  const [mode, setMode] = useState<"light" | "dark">(
    persistedColorMode || initialtMode
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("colorMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return { theme, colorMode };
};

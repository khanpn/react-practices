import { createTheme } from "@mui/material/styles";
import React from "react";

export const useTheme = (initialtMode: "light" | "dark" = "light") => {
  const [mode, setMode] = React.useState<"light" | "dark">(initialtMode);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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

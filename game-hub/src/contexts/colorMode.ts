import React from "react";

interface ColorModeContextData {
  toggleColorMode: () => void;
}

const ColorModeContext = React.createContext<ColorModeContextData>({
  toggleColorMode: () => {},
});

export default ColorModeContext;

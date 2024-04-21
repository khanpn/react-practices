import React from "react";

interface ColorModeContextType {
  toggleColorMode: () => void;
}

const ColorModeContext = React.createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

export default ColorModeContext;

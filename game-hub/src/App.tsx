import { Divider } from "@mui/material";
import { useReducer } from "react";
import "./App.css";

import AppBody from "./components/AppBody";
import TopNavBar from "./components/TopNavBar";
import GlobalSearchContext from "./contexts/globalSearchContext";
import AuthProvider from "./providers/authProvider";
import ColorModeProvider from "./providers/colorModeProvider";
import globalSearchReducer from "./reducers/globalSearchReducer";

function App() {
  const [searchText, dispatchSearch] = useReducer(globalSearchReducer, "");

  return (
    <AuthProvider>
      <ColorModeProvider>
        <GlobalSearchContext.Provider
          value={{ searchText, dispatch: dispatchSearch }}
        >
          <TopNavBar />
          <Divider component="div" sx={{ my: 3, border: "none" }} />
          <AppBody />
        </GlobalSearchContext.Provider>
      </ColorModeProvider>
    </AuthProvider>
  );
}

export default App;

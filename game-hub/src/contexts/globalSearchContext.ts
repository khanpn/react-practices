import React, { Dispatch } from "react";
import { Action } from "../reducers/globalSearchReducer";

interface GlobalSearchContextType {
  searchText: string;
  dispatch: Dispatch<Action>;
}

const GlobalSearchContext = React.createContext<GlobalSearchContextType>({
  searchText: "",
  dispatch: () => {},
});

export default GlobalSearchContext;

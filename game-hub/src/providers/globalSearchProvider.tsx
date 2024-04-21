import { ReactNode, useReducer } from "react";
import GlobalSearchContext from "../contexts/globalSearchContext";
import globalSearchReducer from "../reducers/globalSearchReducer";

interface Props {
  children?: ReactNode;
}

function GlobalSearchProvider({ children }: Props) {
  const [searchText, dispatchSearch] = useReducer(globalSearchReducer, "");
  return (
    <GlobalSearchContext.Provider
      value={{ searchText, dispatch: dispatchSearch }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
}

export default GlobalSearchProvider;

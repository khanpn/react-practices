import { useNavigate } from "react-router-dom";
import { useGlobalSearchStore } from "../store";

function useGlobalSearchHandler(
  handleSearch?: (inputText: string | undefined) => void
) {
  const searchText = useGlobalSearchStore((state) => state.searchText);
  const navigate = useNavigate();
  if (handleSearch) {
    handleSearch(searchText);
  } else {
    // default behaviour
    if (searchText) {
      navigate("/");
    }
  }
}

export default useGlobalSearchHandler;

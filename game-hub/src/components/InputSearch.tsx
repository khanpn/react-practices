import SearchIcon from "@mui/icons-material/Search";
import { InputBase, alpha, styled } from "@mui/material";
import { useRef } from "react";
import { useGlobalSearchStore } from "../store";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function InputSearch() {
  const searchText = useGlobalSearchStore((state) => state.searchText);
  const setSearchText = useGlobalSearchStore((state) => state.setSearchText);
  const inputRef = useRef<Element>();
  if (inputRef.current) {
    (inputRef.current?.children[0] as HTMLInputElement).value =
      searchText || "";
  }
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchText(
            (inputRef.current?.children[0] as HTMLInputElement).value
          );
        }}
      >
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          defaultValue={searchText}
          ref={inputRef}
        />
      </form>
    </Search>
  );
}

export default InputSearch;

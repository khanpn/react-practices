import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useGameQueryStore } from "../../store";

const sortOptions = [
  {
    value: "",
    label: "Relevance",
  },
  {
    value: "-added",
    label: "Date added",
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "-released",
    label: "Release date",
  },
  {
    value: "-metacritic",
    label: "Popularity",
  },
  {
    value: "-rating",
    label: "Average rating",
  },
];

function GameSortSelector() {
  const selectedSortOrder = useGameQueryStore(
    (state) => state.gameQuery.sortOrder
  );
  const setSelectedSortOrder = useGameQueryStore((state) => state.setSortOrder);
  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setSelectedSortOrder(value);
  };

  return (
    <FormControl
      sx={{
        width: {
          xs: "100%",
          md: 290,
        },
      }}
      variant="standard"
    >
      <InputLabel id="game-sort-select-label">Sorted by</InputLabel>
      <Select
        labelId="game-sort-select-label"
        id="game-sort-select"
        value={selectedSortOrder || ""}
        label="Sorted by"
        onChange={handleChange}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default GameSortSelector;

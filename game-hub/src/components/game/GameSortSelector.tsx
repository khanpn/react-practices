import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

interface Props {
  onChange: (value: string) => void;
}

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

function GameSortSelector({ onChange }: Props) {
  const [selectedValues, setSelectedValues] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(value);
    onChange(value);
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
        value={selectedValues}
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

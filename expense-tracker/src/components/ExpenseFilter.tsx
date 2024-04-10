import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CATEGORIES } from "./ExpenseForm";

export interface ExpenseFilterValue {
  category: string;
}

interface Props {
  onChanged: (filteredValue: ExpenseFilterValue) => void;
}

function ExpenseFilter({ onChanged }: Props) {
  const onChangeCategory = (event: SelectChangeEvent): void => {
    onChanged({ category: event.target.value });
  };

  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        id="category-select"
        labelId="category-select-label"
        label="Category"
        defaultValue="ALL"
        onChange={onChangeCategory}
      >
        {CATEGORIES.map((option) => {
          if (option.value === "UNDEFINED")
            return (
              <MenuItem key="ALL" value="ALL">
                All categories
              </MenuItem>
            );
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default ExpenseFilter;

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as y from "yup";

export const CATEGORIES: { [key: string]: string }[] = [
  {
    value: "UNDEFINED",
    label: "Please select",
  },
  {
    value: "GROCERIES",
    label: "Groceries",
  },
  {
    value: "UTILITIES",
    label: "Utilities",
  },
  {
    value: "ENTERTAINMENT",
    label: "Entertainment",
  },
];

const expenseSchema = y.object({
  id: y.number().nullable(),
  description: y.string().max(256).required(),
  amount: y
    .number()

    .positive()
    .max(9999999999)
    .typeError("amount is a required field")
    .required(),
  category: y
    .string()
    .required()
    .test(
      "has-selected",
      "category is a required field",
      (value) => value !== "UNDEFINED"
    ),
});

export type Expense = y.InferType<typeof expenseSchema>;

interface Props {
  onSubmit: (data: Expense) => void;
}

function ExpenseForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Expense>({ resolver: yupResolver(expenseSchema) });

  return (
    <form
      onSubmit={handleSubmit((data: Expense) => {
        onSubmit(data);
        reset();
      })}
    >
      <Card variant="outlined">
        <CardHeader title="Add an expense"></CardHeader>
        <CardContent>
          <FormControl error={!!errors.description} fullWidth sx={{ my: 1 }}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <OutlinedInput
              id="description"
              {...register("description")}
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
              label="description"
            />
            {errors.description && (
              <FormHelperText>{errors.description.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.amount} fullWidth sx={{ my: 1 }}>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <OutlinedInput
              id="amount"
              {...register("amount")}
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
            {errors.amount && (
              <FormHelperText>{errors.amount.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.category} fullWidth sx={{ my: 1 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              id="category-select"
              labelId="category-select-label"
              {...register("category")}
              label="Category"
              defaultValue={CATEGORIES[0].value}
            >
              {CATEGORIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <FormHelperText>{errors.category.message}</FormHelperText>
            )}
          </FormControl>
        </CardContent>
        <CardActions sx={{ justifyContent: "right", mb: 1, mt: -1, mr: 1 }}>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default ExpenseForm;

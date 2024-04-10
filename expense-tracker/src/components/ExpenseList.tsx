import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpenseFilter, { ExpenseFilterValue } from "./ExpenseFilter";
import { CATEGORIES, Expense } from "./ExpenseForm";

interface Props {
  expenses: Expense[];
  onDeleteExpense: (expense: Expense) => void;
}

interface ExpenseListState {
  filterValue: ExpenseFilterValue;
}

const filterExpenses = (
  expenses: Expense[],
  filterValue: ExpenseFilterValue
) => {
  return expenses.filter(
    (e) => filterValue.category === "ALL" || e.category === filterValue.category
  );
};

const getCategory = (cat: string) => {
  const index = CATEGORIES.findIndex((item) => item.value === cat);
  return CATEGORIES[index].label;
};

function ExpenseList({ expenses = [], onDeleteExpense }: Props) {
  const [state, setState] = useState<ExpenseListState>({
    filterValue: { category: "ALL" },
  });

  const onFilterChanged = (filterValue: ExpenseFilterValue) => {
    setState({
      filterValue,
    });
  };

  return (
    <Box
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "4px",
        px: 2,
      }}
    >
      <Typography variant="h5" sx={{ py: 2 }}>
        List of expenses
      </Typography>
      <ExpenseFilter onChanged={onFilterChanged}></ExpenseFilter>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Description</Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "right" }}>
          <Typography variant="subtitle2">Amount</Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "right" }}>
          <Typography variant="subtitle2">Category</Typography>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "right" }}>
          <Typography variant="subtitle2">Actions</Typography>
        </Grid>
      </Grid>
      <List>
        {filterExpenses(expenses, state.filterValue).map((e) => {
          return (
            <ListItem
              key={e.id}
              sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <ListItemText primary={e.description} />
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "right" }}>
                  <ListItemText primary={`$${e.amount}`} />
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "right" }}>
                  <ListItemText primary={getCategory(e.category)} />
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right" }}>
                  <IconButton
                    onClick={() => onDeleteExpense(e)}
                    aria-label="delete"
                    sx={{ p: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
        <ListItem
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Total</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "right" }}>
              <Typography variant="subtitle2">{`$${filterExpenses(
                expenses,
                state.filterValue
              ).reduce(
                (acc, expense) => acc + expense.amount,
                0
              )}`}</Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Box>
  );
}

export default ExpenseList;

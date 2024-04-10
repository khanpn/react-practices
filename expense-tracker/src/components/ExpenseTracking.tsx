import { Divider } from "@mui/material";
import { useState } from "react";
import ExpenseForm, { Expense } from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

let lastId = 0;

function ExpenseTracking() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const onAddExpense = (expense: Expense) => {
    console.log(expense);
    setExpenses([
      ...expenses,
      {
        ...expense,
        id: ++lastId,
      },
    ]);
  };

  const onDeleteExpense = (expense: Expense) => {
    setExpenses(expenses.filter((e) => e.id !== expense.id));
  };

  return (
    <>
      <ExpenseForm onSubmit={onAddExpense}></ExpenseForm>
      <Divider orientation="horizontal" sx={{ my: 2, border: "none" }} />
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={onDeleteExpense}
      ></ExpenseList>
    </>
  );
}

export default ExpenseTracking;

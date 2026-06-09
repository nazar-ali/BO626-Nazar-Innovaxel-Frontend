import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useLocalStorage(
    "expenses",
    []
  );

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now(),
      ...expense,
    };

    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? { ...expense, ...updatedExpense }
          : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== id)
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenses must be used within an ExpenseProvider"
    );
  }

  return context;
};
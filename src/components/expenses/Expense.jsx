import { useState } from "react";
import { useExpenses } from "../../context/useExpenses";
import { DataTable } from "../ui/datatable";
import { getColumns } from "./ExpenseTableColumns";
import ExpenseFilterByDateDialog from "../../dialogs/ExpenseFilterdByDateDialog";
import { ListFilter } from "lucide-react";
import EditExpenseDialog from "../../dialogs/EditExpenseDialog";
import DeleteExpenseDialog from "../../dialogs/DeleteExpenseDialog";
import { toast } from "sonner";
export default function ExpenseTable() {
  const { expenses, deleteExpense } = useExpenses();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleEdit = (expense) => {
    setEditExpense(expense);

    setEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setExpenseToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteExpense(expenseToDelete);
    toast.success("Expense deleted successfully");
    setExpenseToDelete(null);
    setDeleteDialogOpen(false);
  };

  const filteredExpenses = expenses
    .filter((expense) => {
      const categoryMatch =
        selectedCategory === "All" || expense.category === selectedCategory;
      const dateMatch = !selectedDate || expense.date === selectedDate;
      return categoryMatch && dateMatch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const categories = [
    "All",
    "Food",
    "Utilities",
    "Transportation",
    "Health",
    "Entertainment",
  ];

  const columns = getColumns(handleEdit, handleDelete);

  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold md:text-xl">All Expenses</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                }}
                className={`shrink-0 rounded-lg border px-4 py-2 text-sm cursor-pointer transition-colors ${
                  selectedCategory === category
                    ? "bg-violet-600 text-white"
                    : "hover:bg-yellow-100"
                }`}
              >
                {category}
              </button>
            ))}

            <button
              onClick={() => setIsDateDialogOpen(true)}
              className="shrink-0 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
            >
              <ListFilter className="h-4 w-4" />
              Date
            </button>
          </div>
        </div>
        {showDateFilter && (
          <div className="flex items-center gap-2 border-b p-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-lg border px-3 py-2"
            />
            <button
              onClick={() => setSelectedDate("")}
              className="rounded-lg border px-3 py-2 text-sm"
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <DataTable columns={columns} data={filteredExpenses} />
      </div>
      <ExpenseFilterByDateDialog
        isDateDialogOpen={isDateDialogOpen}
        setIsDateDialogOpen={setIsDateDialogOpen}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <EditExpenseDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        expense={editExpense}
      />
      <DeleteExpenseDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

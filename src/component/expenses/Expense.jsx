import { useState } from "react";
import { useExpenses } from "../../context/useExpenses";
import { DataTable } from "../ui/datatable";
import { columns } from "../expenses/ExpenseTableColumns";
import ExpenseFilterByDateDialog from "../dialogs/ExpenseFilterdByDateDialog";
import { ListFilter } from "lucide-react";
export default function ExpenseTable() {
  const { expenses } = useExpenses();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);

 const filteredExpenses = expenses
  .filter((expense) => {
    const categoryMatch =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    const dateMatch =
      !selectedDate ||
      expense.date === selectedDate;

    return categoryMatch && dateMatch;
  })
  .sort(
    (a, b) =>
      new Date(b.date) - new Date(a.date)
  );

  const categories = [
    "All",
    "Food",
    "Utilities",
    "Transportation",
    "Health",
    "Entertainment",
   
  ];

  return (
    <div className="rounded-xl border bg-white">
      {/* Top Bar */}
<div className="border-b p-4">
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <h2 className="text-lg font-semibold md:text-xl">
      All Expenses
    </h2>

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
    </div>
  );
}

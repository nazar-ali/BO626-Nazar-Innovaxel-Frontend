import Header from "../../components/layout/Header";
import ExpenseTable from "../../components/expenses/Expense";
import Summery from "../../components/summary/Summery";
import { useExpenses } from "../../context/useExpenses";

function Home() {
  const { expenses } = useExpenses();

  const hasExpenses = expenses.length > 0;

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {hasExpenses ? (
          <>
            <Summery />
            <div className="mt-10">
              <ExpenseTable />
            </div>
          </>
        ) : (
          <div className="rounded-2xl border top-50 left-50 bg-white p-12 text-center">
            <h2 className="text-2xl font-semibold">
              No expenses yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              Start tracking your spending by adding your first expense.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
import SummeryCards from "./SummeryCards";
import { useExpenses } from "../../context/useExpenses";
import CategoryPieChart from "./CategoryPieChart";
import MonthlyTrendBarChart from "./MonthlyTrendBarChart";

export default function Summary() {
  const { expenses } = useExpenses();

  // Total Spent
  const totalSpent = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  // Total Transactions
  const totalTransactions = expenses.length;

  // Category Breakdown
  const categoryMap = {};

  expenses.forEach((expense) => {
    const category = expense.category;

    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }

    categoryMap[category] += Number(expense.amount);
  });

  const categoryData = Object.entries(categoryMap).map(
    ([name, amount]) => ({
      name,
      amount,
    })
  );

  // Top Category
  const topCategory =
    categoryData.length > 0
      ? categoryData.reduce((prev, current) =>
          prev.amount > current.amount
            ? prev
            : current
        )
      : { name: "-", amount: 0 };

  const percentage =
    totalSpent > 0
      ? Math.round(
          (topCategory.amount / totalSpent) * 100
        )
      : 0;

  // Daily Average
  const dailyAverage =
    expenses.length > 0
      ? Math.round(totalSpent / expenses.length)
      : 0;

  // Monthly Trend
  const monthlyMap = {};

  expenses.forEach((expense) => {
    const month = new Date(
      expense.date
    ).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyMap[month]) {
      monthlyMap[month] = 0;
    }

    monthlyMap[month] += Number(expense.amount);
  });

  const monthlyData = Object.entries(monthlyMap).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  return (
    <div className="space-y-6">
      <SummeryCards
        totalSpent={totalSpent}
        totalTransactions={totalTransactions}
        topCategory={{
          name: topCategory.name,
          amount: topCategory.amount,
          percentage,
        }}
        dailyAverage={dailyAverage}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart data={categoryData} />
        <MonthlyTrendBarChart data={monthlyData} />
      </div>
    </div>
  );
}
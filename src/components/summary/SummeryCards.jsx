import {
  Wallet,
  ReceiptText,
  PieChart,
  Calculator,
} from "lucide-react";

export default function SummeryCards({
  totalSpent,
  totalTransactions,
  topCategory,
  dailyAverage,
}) {
  const cards = [
    {
      title: "Total spent",
      value: `$${totalSpent.toLocaleString()}`,
      subtitle: "This month",
      icon: Wallet,
    },
    {
      title: "Transactions",
      value: totalTransactions,
      subtitle: "Entries logged",
      icon: ReceiptText,
    },
    {
      title: "Top category",
      value: topCategory?.name || "-",
      subtitle: `$${topCategory?.amount || 0} · ${
        topCategory?.percentage || 0
      }%`,
      icon: PieChart,
    },
    {
      title: "Daily average",
      value: `$${dailyAverage}`,
      subtitle: "Per day",
      icon: Calculator,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2 text-gray-600">
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">
                {card.title}
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight">
              {card.value}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
import {
  Wallet,
  ReceiptText,
  PieChart,
  Calculator,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function SummeryCards({
  totalSpent,
  totalTransactions,
  topCategory,
  dailyAverage,
}) {
  const cards = [
  {
    title: "Total Spent",
    value: `$${totalSpent.toLocaleString()}`,
    subtitle: "This month",
    icon: Wallet,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Transactions",
    value: totalTransactions,
    subtitle: "Entries logged",
    icon: ReceiptText,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Top Category",
    value: topCategory?.name || "-",
    subtitle: `$${topCategory?.amount || 0} · ${
      topCategory?.percentage || 0
    }%`,
    icon: PieChart,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Daily Average",
    value: `$${dailyAverage}`,
    subtitle: "Per day",
    icon: Calculator,
    color: "from-orange-500 to-red-500",
  },
];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
        <Card
  key={card.title}
  className={`bg-gradient-to-r ${card.color} text-white border-0 shadow-lg hover:scale-105 transition-transform duration-300`}
>
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-sm font-medium text-white/90">
      <Icon className="h-5 w-5" />
      {card.title}
    </CardTitle>
  </CardHeader>

  <CardContent>
    <h2 className="text-3xl font-bold">
      {card.value}
    </h2>
  </CardContent>

  <CardDescription className="px-6 pb-6 text-white/80">
    {card.subtitle}
  </CardDescription>
</Card>
        );
      })}
    </div>
  );
}
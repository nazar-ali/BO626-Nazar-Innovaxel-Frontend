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
          <Card className="w-full max-w-full" key={card.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Icon className="h-4 w-4" />
                {card.title}
              </CardTitle>

             
            </CardHeader>

            <CardContent>
              <h2 className="text-2xl font-bold tracking-tight">
                {card.value}
              </h2>
            </CardContent>
             <CardDescription className="px-4 pt-2 text-sm">
                {card.subtitle}
              </CardDescription>
          </Card>
        );
      })}
    </div>
  );
}
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

export default function MonthlyTrendBarChart({
  data,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Monthly trend
        </h2>
        <span className="text-sm text-muted-foreground">
          Bar chart
        </span>
      </div>

      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#40b7e6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
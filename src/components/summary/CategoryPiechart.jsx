import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];

export default function CategoryPieChart({ data }) {
  const total = data.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
      <div className="rounded-2xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Category breakdown
        </h2>
        <span className="text-sm text-muted-foreground">
          Pie chart
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />
                <span>{item.name}</span>
              </div>

              <span className="font-medium">
                ${item.amount}
              </span>
            </div>
          ))}

          {/* <div className="pt-4 font-bold">
            Total: ${total}
          </div> */}
        </div>
      </div>
    </div>
  );
}
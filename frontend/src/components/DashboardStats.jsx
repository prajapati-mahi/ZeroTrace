import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardStats = ({ stats }) => {
  const riskData = [
    {
      name: "Low",
      value: stats.lowRisk || 0,
    },
    {
      name: "Medium",
      value: stats.mediumRisk || 0,
    },
    {
      name: "High",
      value: stats.highRisk || 0,
    },
  ];

  const chartData = [
    {
      name: "Average",
      value: stats.averageSimilarity || 0,
    },
    {
      name: "Highest",
      value: stats.highestSimilarity || 0,
    },
  ];

  const COLORS = [
    "#51cf66",
    "#ffd93d",
    "#ff6b6b",
  ];

  return (
    <div className="space-y-10">

      <div className="grid md:grid-cols-3 gap-6">

        <div
          className="
          bg-[#1a1a2e]
          border
          border-[#2a2a3e]
          rounded-3xl
          p-6
          shadow-xl
          hover:border-[#6c63ff]
          hover:-translate-y-1
          transition-all
          "
        >
          <h3 className="text-[#a8a8b8]">
            Total Reports
          </h3>

          <p className="text-5xl font-black text-white mt-3">
            {stats.totalReports}
          </p>
        </div>

        <div
          className="
          bg-[#1a1a2e]
          border
          border-[#2a2a3e]
          rounded-3xl
          p-6
          shadow-xl
          hover:border-[#00d4ff]
          hover:-translate-y-1
          transition-all
          "
        >
          <h3 className="text-[#a8a8b8]">
            Average Similarity
          </h3>

          <p className="text-5xl font-black text-white mt-3">
            {stats.averageSimilarity}%
          </p>
        </div>

        <div
          className="
          bg-[#1a1a2e]
          border
          border-[#2a2a3e]
          rounded-3xl
          p-6
          shadow-xl
          hover:border-[#ff6b6b]
          hover:-translate-y-1
          transition-all
          "
        >
          <h3 className="text-[#a8a8b8]">
            Highest Similarity
          </h3>

          <p className="text-5xl font-black text-white mt-3">
            {stats.highestSimilarity}%
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div
          className="
          bg-[#1a1a2e]
          border
          border-[#2a2a3e]
          rounded-3xl
          p-8
          shadow-xl
          "
        >
          <h2
            className="
            text-2xl
            font-bold
            mb-6
            bg-gradient-to-r
            from-[#6c63ff]
            to-[#00d4ff]
            bg-clip-text
            text-transparent
            "
          >
            Similarity Analysis
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#a8a8b8"
              />

              <YAxis
                stroke="#a8a8b8"
              />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#6c63ff"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="
          bg-[#1a1a2e]
          border
          border-[#2a2a3e]
          rounded-3xl
          p-8
          shadow-xl
          "
        >
          <h2
            className="
            text-2xl
            font-bold
            mb-6
            bg-gradient-to-r
            from-[#00d4ff]
            to-[#6c63ff]
            bg-clip-text
            text-transparent
            "
          >
            Risk Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>
              <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {riskData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default DashboardStats;
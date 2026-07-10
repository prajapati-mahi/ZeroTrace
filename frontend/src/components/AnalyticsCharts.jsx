import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#06b6d4",
  "#facc15",
  "#ef4444",
];

const AnalyticsCharts = ({
  stats,
}) => {

  const pieData = [
    {
      name: "Low",
      value: stats.lowRisk,
    },
    {
      name: "Medium",
      value: stats.mediumRisk,
    },
    {
      name: "High",
      value: stats.highRisk,
    },
  ];

  const barData = [
    {
      name: "Reports",
      value: stats.totalReports,
    },
    {
      name: "Similarity",
      value: Number(
        stats.averageSimilarity
      ),
    },
    {
      name: "AI",
      value: Number(
        stats.averageAI
      ),
    },
  ];

  return (

    <div className="grid lg:grid-cols-2 gap-8">

      <div
        className="
        bg-[#151523]
        rounded-3xl
        p-8
        border
        border-[#2d2d44]
        "
      >

        <h2 className="text-2xl font-bold mb-6">

          Risk Distribution

        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={110}
            >

              {pieData.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div
        className="
        bg-[#151523]
        rounded-3xl
        p-8
        border
        border-[#2d2d44]
        "
      >

        <h2 className="text-2xl font-bold mb-6">

          Overview

        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <BarChart
            data={barData}
          >

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#06b6d4"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default AnalyticsCharts;
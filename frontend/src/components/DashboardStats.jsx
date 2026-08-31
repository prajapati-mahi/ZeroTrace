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

  const similarityData = [
    {
      name: "Average",
      value: Number(stats.averageSimilarity) || 0,
    },
    {
      name: "Highest",
      value: Number(stats.highestSimilarity) || 0,
    },
  ];

  const overviewData = [
    {
      name: "Reports",
      value: stats.totalReports || 0,
    },
    {
      name: "Similarity",
      value: Number(stats.averageSimilarity) || 0,
    },
    {
      name: "AI",
      value: Number(stats.averageAI) || 0,
    },
  ];

  const COLORS = [
    "#51cf66",
    "#ffd93d",
    "#ff6b6b",
  ];

  return (
    <div className="space-y-10">

      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-6 shadow-xl">
          <h3 className="text-[#a8a8b8]">
            Total Reports
          </h3>

          <p className="text-5xl font-black mt-3">
            {stats.totalReports}
          </p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-6 shadow-xl">
          <h3 className="text-[#a8a8b8]">
            Average Similarity
          </h3>

          <p className="text-5xl font-black mt-3">
            {stats.averageSimilarity}%
          </p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-6 shadow-xl">
          <h3 className="text-[#a8a8b8]">
            Highest Similarity
          </h3>

          <p className="text-5xl font-black mt-3">
            {stats.highestSimilarity}%
          </p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-6 shadow-xl">
          <h3 className="text-[#a8a8b8]">
            Highest AI
          </h3>

          <p className="text-5xl font-black mt-3">
            {stats.highestAI || 0}%
          </p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-6 shadow-xl">
          <h3 className="text-[#a8a8b8]">
            This Month
          </h3>

          <p className="text-5xl font-black mt-3">
            {stats.reportsThisMonth || 0}
          </p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-6 shadow-xl">
          <h3 className="text-[#a8a8b8]">
            Sources Found
          </h3>

          <p className="text-5xl font-black mt-3">
            {stats.totalSources || 0}
          </p>
        </div>

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Similarity Chart */}

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold mb-6 text-[#6c63ff]">

            Similarity Analysis

          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={similarityData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#6c63ff"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Risk Distribution */}

        <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold mb-6 text-cyan-400">

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
      {/* ================= OVERVIEW ================= */}
      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Overview
        </h2>
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={overviewData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#00d4ff"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardStats;
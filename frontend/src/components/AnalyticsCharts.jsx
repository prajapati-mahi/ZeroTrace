import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AnalyticsCharts = ({ report }) => {
  const radialData = [
    {
      name: "Plagiarism",
      value: report.plagiarismScore,
      fill: "#ff6b6b",
    },
    {
      name: "AI",
      value: report.aiScore,
      fill: "#6c63ff",
    },
  ];

  const comparisonData = [
    {
      name: "Plagiarism",
      score: report.plagiarismScore,
    },
    {
      name: "AI",
      score: report.aiScore,
    },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">

      {/* Circular Chart */}

      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-8 shadow-xl">

        <h2 className="text-2xl font-bold text-cyan-400 mb-8">
          Score Overview
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <RadialBarChart
            innerRadius="25%"
            outerRadius="90%"
            data={radialData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={10}
            />

            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>

      </div>

      {/* Bar Chart */}

      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-3xl p-8 shadow-xl">

        <h2 className="text-2xl font-bold text-cyan-400 mb-8">
          Similarity Comparison
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={comparisonData}>

            <CartesianGrid stroke="#2a2a3e" />

            <XAxis dataKey="name" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Bar
              dataKey="score"
              fill="#6c63ff"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default AnalyticsCharts;
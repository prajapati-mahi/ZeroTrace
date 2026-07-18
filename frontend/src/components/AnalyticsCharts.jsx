import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaArrowTrendUp,
  FaRobot,
} from "react-icons/fa6";

const COLORS = ["#06b6d4", "#facc15", "#ef4444"];

const AnalyticsCharts = ({ stats }) => {
  if (stats.totalReports === 0) {
    return (
      <div className="rounded-3xl bg-[#151523] border border-[#2D2D44] p-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-2xl font-bold">
              Analytics Overview
            </h2>

            <p className="text-gray-400 mt-2">
              Your analytics will appear after your first scan.
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

            <FaChartLine className="text-cyan-400 text-2xl" />

          </div>

        </div>

        <div className="rounded-2xl border border-dashed border-cyan-500/30 bg-[#101018] py-16 px-8 text-center">

          <div className="w-24 h-24 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center">

            <FaArrowTrendUp className="text-5xl text-cyan-400" />

          </div>

          <h3 className="text-3xl font-bold mt-8">

            No Analytics Yet

          </h3>

          <p className="text-gray-400 mt-4 max-w-md mx-auto leading-7">

            Generate your first plagiarism report to unlock
            similarity trends, AI detection insights and
            detailed performance analytics.

          </p>

          <Link
            to="/checker"
            className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-105 transition"
          >
            Start First Scan
          </Link>

        </div>

      </div>
    );
  }

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

  const overviewData = [
    {
      name: "Reports",
      value: stats.totalReports,
    },
    {
      name: "Similarity",
      value: Number(stats.averageSimilarity),
    },
    {
      name: "AI Score",
      value: Number(stats.averageAI),
    },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* Risk Distribution */}

      <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-8">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              Risk Distribution
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Distribution of plagiarism risk.
            </p>

          </div>

          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">

            <FaChartLine className="text-cyan-400 text-xl" />

          </div>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={70}
              paddingAngle={4}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Overview */}

      <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-8">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              Performance Overview
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Reports, Similarity and AI detection.
            </p>

          </div>

          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">

            <FaRobot className="text-purple-400 text-xl" />

          </div>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <AreaChart data={overviewData}>

            <defs>

              <linearGradient
                id="overviewGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#2D2D44"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
              stroke="#9ca3af"
            />

            <YAxis stroke="#9ca3af" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="url(#overviewGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default AnalyticsCharts;
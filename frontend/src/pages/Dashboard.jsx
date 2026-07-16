import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import DashboardNavbar from "../components/DashboardNavbar";
import DashboardStats from "../components/DashboardStats";
import StatsCard from "../components/StatsCard";
import RecentReports from "../components/RecentReports";
import AnalyticsCharts from "../components/AnalyticsCharts";
import SkeletonCard from "../components/SkeletonCard";
import QuickActions from "../components/QuickActions";

import { useAuth } from "../context/AuthContext";

import {
  FaFileAlt,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, token } = useAuth();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token]);

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#09090F] p-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090F] text-white px-10 py-8">

      <DashboardNavbar />

      {/* Hero */}

      <div className="mb-14">

        <div className="flex flex-col lg:flex-row justify-between items-center">

          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold text-sm mb-5">

              Dashboard

            </span>

            <h1 className="text-5xl font-black leading-tight">

              Welcome back,

              <span className="text-cyan-400">

                {" "}
                {user?.name}

              </span>

              👋

            </h1>

            <p className="text-gray-400 mt-5 text-lg max-w-xl">

              Track plagiarism reports, monitor AI detection,
              and analyze document statistics in one place.

            </p>

          </div>

          <div className="mt-8 lg:mt-0">

  <Link
    to="/checker"
    className="
      inline-flex
      items-center
      gap-2
      px-8
      py-4
      rounded-2xl
      bg-gradient-to-r
      from-cyan-500
      to-purple-600
      font-semibold
      text-lg
      hover:scale-105
      transition
      shadow-lg
    "
  >
    + New Check
  </Link>

</div>

        </div>

      </div>

      {/* Online */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

        <span className="text-green-400 font-medium">

          System Online

        </span>

      </div>

      {/* Stats */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

        <StatsCard
          title="Reports"
          value={stats.totalReports}
          icon={<FaFileAlt />}
        />

        <StatsCard
          title="Average Similarity"
          value={`${stats.averageSimilarity}%`}
          icon={<FaRobot />}
        />

        <StatsCard
          title="Highest Similarity"
          value={`${stats.highestSimilarity}%`}
          icon={<FaShieldAlt />}
        />

        <StatsCard
          title="Average AI"
          value={`${stats.averageAI}%`}
          icon={<FaRobot />}
        />

      </div>

      {/* Analytics */}

      <div className="mt-16">

        <h2 className="text-3xl font-bold mb-8">

          Analytics Overview

        </h2>

        <DashboardStats stats={stats} />

      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-16">

  <div className="lg:col-span-2">

    <AnalyticsCharts
      stats={stats}
    />

  </div>

  <QuickActions />

</div>

      {/* Recent */}

      <div className="mt-20">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">

            Recent Activity

          </h2>

          <Link
            to="/history"
            className="
            px-6
            py-3
            rounded-xl
            bg-cyan-500
            hover:bg-cyan-600
            transition
            "
          >
            View All
          </Link>

        </div>

        <RecentReports />

      </div>

    </div>
  );
};

export default Dashboard;
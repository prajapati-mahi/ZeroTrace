import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import StatsCard from "../components/StatsCard";
import RecentReports from "../components/RecentReports";
import LogoutButton from "../components/LogoutButton";
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
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-[#0a0a0f]
      text-white
      px-10
      py-6
      relative
      overflow-hidden
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        top-0
        left-0
        w-[500px]
        h-[500px]
        bg-[#6c63ff]
        opacity-20
        blur-[180px]
        rounded-full
        "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-[500px]
        h-[500px]
        bg-[#00d4ff]
        opacity-20
        blur-[180px]
        rounded-full
        "
      />

      <div className="relative z-10">

        <Navbar />

        {/* Hero Section */}

        <div className="mt-10 mb-12">

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

            <div>

              <p className="text-cyan-400 font-semibold tracking-[4px] uppercase">

                Dashboard

              </p>

              <h1 className="text-5xl font-black mt-3">

                Welcome back,

                <span className="text-cyan-400">

                  {" "}
                  {user?.name || "User"}

                </span>

                👋

              </h1>

              <p className="text-gray-400 mt-5 text-lg">

                Manage plagiarism reports, AI analysis and PDF comparisons effortlessly.

              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              <Link
                to="/checker"
                className="
                bg-cyan-500
                hover:bg-cyan-600
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
                "
              >
                + New Check
              </Link>

              <Link
                to="/history"
                className="
                border
                border-[#2d2d44]
                hover:border-cyan-400
                px-6
                py-3
                rounded-xl
                transition
                "
              >
                View History
              </Link>

              <LogoutButton />

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

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
            value={`${stats.averageAI || 0}%`}
            icon={<FaRobot />}
          />

        </div>

        {/* Analytics */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-6">

            Analytics Overview

          </h2>

          <DashboardStats stats={stats} />

        </div>

        {/* Recent Reports */}

        <div className="mt-14">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">

              Recent Activity

            </h2>

            <Link
              to="/history"
              className="
              bg-cyan-500
              hover:bg-cyan-600
              px-5
              py-2
              rounded-lg
              transition
              "
            >
              View All
            </Link>

          </div>

          <RecentReports />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
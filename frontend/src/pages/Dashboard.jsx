import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import DashboardNavbar from "../components/DashboardNavbar";
import StatsCard from "../components/StatsCard";
import AnalyticsCharts from "../components/AnalyticsCharts";
import AnalyticsSummary from "../components/AnalyticsSummary";
import QuickActions from "../components/QuickActions";
import InsightsPanel from "../components/InsightsPanel";
import RecentReports from "../components/RecentReports";
import SkeletonCard from "../components/SkeletonCard";

import { useAuth } from "../context/AuthContext";

import {
  FaFileAlt,
  FaRobot,
  FaShieldAlt,
  FaBrain,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, token } = useAuth();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (token) fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#09090F] px-8 py-10">
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
    <div className="relative min-h-screen overflow-hidden bg-[#09090F] text-white">

      {/* Background Glow */}

      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        <DashboardNavbar />

        {/* HERO */}

        <section className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-16">

          <div>

            <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-5 py-2 text-sm font-semibold mb-6">

              Dashboard

            </span>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight">

              Welcome Back,

              <span className="text-cyan-400">
                {" "}
                {user?.name}
              </span>

              👋

            </h1>

            <p className="text-gray-400 mt-6 text-lg max-w-2xl leading-8">

              Track plagiarism reports, AI detection,
              document statistics and monitor your
              writing performance from one place.

            </p>

            <div className="flex items-center gap-4 mt-8">

              <Link
                to="/checker"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-105 transition"
              >
                + New Scan
              </Link>

              <div className="flex items-center gap-2 text-green-400">

                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

                System Online

              </div>

            </div>

          </div>

          <div className="hidden lg:flex w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-2xl"></div>

        </section>

        {/* STATS */}

        <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

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
            icon={<FaBrain />}
          />

        </section>

        {/* Analytics */}

        <section className="mt-20">

          <div className="mb-10">

            <h2 className="text-3xl font-bold">

              Analytics Overview

            </h2>

            <p className="text-gray-400 mt-2">

              Monitor plagiarism trends and AI detection
              performance in real time.

            </p>

          </div>

          <div className="grid lg:grid-cols-12 gap-8">

            {/* LEFT */}

            <div className="lg:col-span-8 space-y-8">

              <AnalyticsSummary
                stats={stats}
              />

              <AnalyticsCharts
                stats={stats}
              />

            </div>

            {/* RIGHT */}

            <div className="lg:col-span-4 space-y-8">

              <QuickActions />

              <InsightsPanel />

            </div>

          </div>

        </section>

                {/* Recent Reports */}

        <section className="mt-20">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h2 className="text-3xl font-bold">
                Recent Reports
              </h2>

              <p className="text-gray-400 mt-2">
                View your latest plagiarism scans and continue where you left off.
              </p>

            </div>

            <Link
              to="/history"
              className="
                px-6
                py-3
                rounded-xl
                border
                border-cyan-500/30
                bg-cyan-500/10
                text-cyan-400
                hover:bg-cyan-500
                hover:text-white
                transition
              "
            >
              Open History →
            </Link>

          </div>

          <RecentReports />

        </section>

        {/* Footer */}

        <footer className="mt-20 border-t border-[#2D2D44] pt-8 pb-4">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h3 className="text-xl font-bold">
                ZeroTrace
              </h3>

              <p className="text-gray-500 mt-2">

                AI Powered Plagiarism Detection Platform

              </p>

            </div>

            <div className="flex gap-10 text-sm text-gray-400">

              <div>

                <p className="font-semibold text-white mb-2">
                  Reports
                </p>

                <p>{stats.totalReports}</p>

              </div>

              <div>

                <p className="font-semibold text-white mb-2">
                  Average Similarity
                </p>

                <p>{stats.averageSimilarity}%</p>

              </div>

              <div>

                <p className="font-semibold text-white mb-2">
                  Average AI
                </p>

                <p>{stats.averageAI}%</p>

              </div>

            </div>

          </div>

          <div className="mt-10 text-center text-gray-500 text-sm">

            © 2026 ZeroTrace • Built with React, Node.js & MongoDB

          </div>

        </footer>

      </div>

    </div>

  );

};

export default Dashboard;
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import StatsCard from "../components/StatsCard";
import RecentReports from "../components/RecentReports";

import {
  FaFileAlt,
  FaRobot,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

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
      text-[#f0f0f5]
      px-10
      py-6
      relative
      overflow-hidden
      "
    >
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

        <div className="mt-8 mb-10">
          <h1
            className="
            text-6xl
            font-black
            bg-gradient-to-r
            from-[#6c63ff]
            to-[#00d4ff]
            bg-clip-text
            text-transparent
            "
          >
            ZeroTrace Dashboard
          </h1>

          <p className="text-[#a8a8b8] mt-2">
            AI-Powered Plagiarism Intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <StatsCard
            title="Reports"
            value={stats.totalReports}
            icon={<FaFileAlt />}
          />

          <StatsCard
            title="Average"
            value={`${stats.averageSimilarity}%`}
            icon={<FaRobot />}
          />

          <StatsCard
            title="Highest"
            value={`${stats.highestSimilarity}%`}
            icon={<FaShieldAlt />}
          />

          <StatsCard
            title="Sources"
            value="Web"
            icon={<FaGlobe />}
          />

        </div>

        <div className="mt-10">
          <DashboardStats
            stats={stats}
          />
        </div>

        <div className="mt-10">
          <RecentReports />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
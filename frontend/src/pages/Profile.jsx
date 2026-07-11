import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import {
  FaUserCircle,
  FaFileAlt,
  FaRobot,
  FaChartLine,
  FaMedal,
  FaArrowLeft,
} from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
  return (
    <div className="min-h-screen bg-[#09090F] p-10">

      <div className="grid md:grid-cols-4 gap-6">

        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />

      </div>

    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#09090F] text-white px-8 py-12">

      <div className="max-w-6xl mx-auto">

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-10"
        >
          <FaArrowLeft />
          Dashboard
        </Link>

        <div
          className="
          bg-[#151523]
          rounded-3xl
          p-10
          border
          border-[#2D2D44]
          shadow-2xl
          "
        >

          <div className="flex flex-col lg:flex-row items-center gap-10">

            <FaUserCircle
              className="text-cyan-400"
              size={140}
            />

            <div>

              <h1 className="text-5xl font-black">

                {profile.user.name}

              </h1>

              <p className="text-gray-400 mt-3">

                AI Plagiarism Analyst

              </p>

              <p className="mt-6">

                📧 {profile.user.email}

              </p>

              <p className="mt-2">

                📅 Member Since{" "}
                {new Date(
                  profile.user.createdAt
                ).toLocaleDateString()}

              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            <StatCard
              icon={<FaFileAlt />}
              title="Reports"
              value={profile.totalReports}
            />

            <StatCard
              icon={<FaChartLine />}
              title="Similarity"
              value={`${profile.averageSimilarity}%`}
            />

            <StatCard
              icon={<FaRobot />}
              title="Average AI"
              value={`${profile.averageAI}%`}
            />

          </div>

          <div className="mt-14">

            <h2 className="text-2xl font-bold flex items-center gap-3">

              <FaMedal />

              Achievements

            </h2>

            <div className="flex flex-wrap gap-4 mt-6">

              <Badge text="ZeroTrace User" />

              {profile.totalReports >= 1 && (
                <Badge text="First Report" />
              )}

              {profile.totalReports >= 10 && (
                <Badge text="10 Reports" />
              )}

              {profile.averageAI >= 80 && (
                <Badge text="AI Expert" />
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <div
      className="
      bg-[#1E1E30]
      rounded-2xl
      p-8
      border
      border-[#2D2D44]
      hover:border-cyan-400
      transition
      "
    >
      <div className="text-cyan-400 text-3xl">

        {icon}

      </div>

      <p className="mt-5 text-gray-400">

        {title}

      </p>

      <h2 className="text-4xl font-black mt-2">

        {value}

      </h2>

    </div>
  );
}

function Badge({ text }) {
  return (
    <div
      className="
      bg-cyan-500/20
      border
      border-cyan-500
      px-5
      py-2
      rounded-full
      "
    >
      ⭐ {text}
    </div>
  );
}

export default Profile;
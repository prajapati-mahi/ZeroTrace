import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import SkeletonCard from "../components/SkeletonCard";

import {
  FaUserCircle,
  FaFileAlt,
  FaRobot,
  FaChartLine,
  FaMedal,
  FaArrowLeft,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/profile");

      setProfile(res.data);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090F] px-10 py-10">

        <div className="max-w-6xl mx-auto">

          <div className="h-12 w-72 rounded-xl bg-[#181825] animate-pulse mb-10"></div>

          <div className="bg-[#151523] rounded-3xl p-10">

            <div className="flex flex-col lg:flex-row gap-10">

              <SkeletonCard />
              <SkeletonCard />

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />

            </div>

          </div>

        </div>

      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#09090F] flex items-center justify-center text-white">

        <div className="text-center">

          <h2 className="text-3xl font-bold">
            Unable to load profile
          </h2>

          <p className="text-gray-400 mt-3">
            Please try refreshing the page.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090F] text-white px-8 py-12">

      <div className="max-w-6xl mx-auto">

        <Link
          to="/dashboard"
          className="
            inline-flex
            items-center
            gap-3
            text-cyan-400
            hover:text-cyan-300
            transition
            mb-10
          "
        >
          <FaArrowLeft />

          Dashboard
        </Link>

        <div
          className="
            bg-[#151523]
            rounded-3xl
            border
            border-[#2D2D44]
            shadow-2xl
            p-10
          "
        >

          <div className="flex flex-col lg:flex-row items-center gap-10"></div>
                    {/* Avatar */}

            <div className="flex flex-col items-center">

              <FaUserCircle
                className="text-cyan-400 drop-shadow-lg"
                size={150}
              />

              <div
                className="
                  mt-5
                  px-5
                  py-2
                  rounded-full
                  bg-cyan-500/20
                  border
                  border-cyan-500/30
                  text-cyan-300
                  font-semibold
                "
              >
                ZeroTrace Member
              </div>

            </div>

            {/* User Information */}

            <div className="flex-1">

              <h1 className="text-5xl font-black break-words">
                {profile.user.name}
              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                AI Plagiarism Analyst
              </p>

              <div className="grid md:grid-cols-2 gap-5 mt-8">

                <div
                  className="
                    bg-[#10101A]
                    rounded-2xl
                    border
                    border-[#2D2D44]
                    p-5
                  "
                >
                  <div className="flex items-center gap-3 text-cyan-400">

                    <FaEnvelope />

                    <span className="font-semibold">
                      Email
                    </span>

                  </div>

                  <p className="mt-3 text-gray-300 break-all">
                    {profile.user.email}
                  </p>

                </div>

                <div
                  className="
                    bg-[#10101A]
                    rounded-2xl
                    border
                    border-[#2D2D44]
                    p-5
                  "
                >
                  <div className="flex items-center gap-3 text-cyan-400">

                    <FaCalendarAlt />

                    <span className="font-semibold">
                      Member Since
                    </span>

                  </div>

                  <p className="mt-3 text-gray-300">
                    {new Date(
                      profile.user.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-7 mt-14">

            <StatCard
              icon={<FaFileAlt />}
              title="Reports"
              value={profile.totalReports || 0}
            />

            <StatCard
              icon={<FaChartLine />}
              title="Average Similarity"
              value={`${profile.averageSimilarity || 0}%`}
            />

            <StatCard
              icon={<FaRobot />}
              title="Average AI Score"
              value={`${profile.averageAI || 0}%`}
            />

          </div>

          {/* Achievements */}

          <div className="mt-14">

            <h2 className="text-3xl font-bold flex items-center gap-3">

              <FaMedal className="text-yellow-400" />

              Achievements

            </h2>

            <div className="flex flex-wrap gap-4 mt-7">

              <Badge text="ZeroTrace User" />

              {profile.totalReports >= 1 && (
                <Badge text="First Report" />
              )}

              {profile.totalReports >= 10 && (
                <Badge text="10 Reports" />
              )}

              {profile.totalReports >= 25 && (
                <Badge text="Power User" />
              )}

              {profile.averageAI >= 80 && (
                <Badge text="AI Expert" />
              )}

              {profile.averageSimilarity <= 20 &&
                profile.totalReports > 0 && (
                  <Badge text="Original Writer" />
                )}

            </div>

          </div>

        </div>

      </div>

  );
}


    function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <div
      className="
        bg-[#1E1E30]
        border
        border-[#2D2D44]
        rounded-2xl
        p-8
        hover:border-cyan-400
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <div className="text-3xl text-cyan-400">
        {icon}
      </div>

      <p className="mt-5 text-gray-400 tracking-wide">
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
        bg-cyan-500/15
        border
        border-cyan-500/40
        rounded-full
        px-5
        py-2
        text-cyan-300
        font-medium
        transition
        hover:bg-cyan-500/25
      "
    >
      ⭐ {text}
    </div>
  );
}

export default Profile;
          
                    
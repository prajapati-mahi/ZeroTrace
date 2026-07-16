import { Link } from "react-router-dom";
import {
  FaHome,
  FaHistory,
  FaUserCircle,
} from "react-icons/fa";

import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/logo.png";

const DashboardNavbar = () => {
  const { user } = useAuth();

  return (
    <nav
      className="
      flex
      justify-between
      items-center
      mb-14
      py-4
      "
    >
      {/* Logo */}

      <Link
        to="/dashboard"
        className="flex items-center gap-4"
      >
        <img
          src={logo}
          alt="ZeroTrace"
          className="w-14 h-14 object-contain"
        />

        <div>
          <h1
            className="
            text-3xl
            font-black
            bg-gradient-to-r
            from-cyan-400
            to-purple-500
            bg-clip-text
            text-transparent
            "
          >
            ZeroTrace
          </h1>

          <p className="text-gray-400 text-sm">
            AI Plagiarism Detection
          </p>
        </div>
      </Link>

      {/* Navigation */}

      <div className="hidden lg:flex gap-10">

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition"
        >
          <FaHome />

          Dashboard
        </Link>

        <Link
          to="/history"
          className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition"
        >
          <FaHistory />

          History
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition"
        >
          <FaUserCircle />

          Profile
        </Link>

      </div>

      {/* User */}

      <div className="flex items-center gap-5">

        <div className="text-right">

          <p className="font-semibold text-white">

            {user?.name}

          </p>

          <p className="text-sm text-gray-400">

            Student Plan

          </p>

        </div>

        <LogoutButton />

      </div>

    </nav>
  );
};

export default DashboardNavbar;
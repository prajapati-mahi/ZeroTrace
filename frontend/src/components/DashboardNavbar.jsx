import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaFilePdf,
  FaHistory,
  FaUserCircle,
  FaBell,
} from "react-icons/fa";

import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const links = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      title: "Text Checker",
      icon: <FaFileAlt />,
      path: "/checker",
    },
    {
      title: "PDF Compare",
      icon: <FaFilePdf />,
      path: "/pdf-checker",
    },
    {
      title: "History",
      icon: <FaHistory />,
      path: "/history",
    },
    {
      title: "Profile",
      icon: <FaUserCircle />,
      path: "/profile",
    },
  ];

  return (
    <nav
      className="
        sticky
        top-5
        z-50
        mb-12
        rounded-3xl
        border
        border-[#2D2D44]
        bg-[#151523]/80
        backdrop-blur-xl
        px-6 md:px-8
        py-4 md:py-5
        shadow-xl
      "
    >
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <img
            src={logo}
            alt="ZeroTrace"
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              ZeroTrace
            </h1>
            <p className="text-[10px] md:text-xs text-gray-400 hidden sm:block">
              AI Plagiarism Detection
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-2">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.title}
                to={link.path}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300
                  ${
                    active
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-gray-400 hover:bg-[#1E1E2F] hover:text-cyan-400"
                  }
                `}
              >
                {link.icon}
                {link.title}
              </Link>
            );
          })}
        </div>

        {/* Right Side User / Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            aria-label="Notifications"
            className="
              relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[#1E1E2F] border border-[#2D2D44]
              flex justify-center items-center hover:border-cyan-400 transition
            "
          >
            <FaBell className="text-cyan-400 text-base" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400" />
          </button>

          <div className="text-right hidden md:block">
            <p className="font-semibold text-sm leading-tight text-white">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] text-green-400 mt-0.5">
              ✓ Verified
            </p>
          </div>

          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex justify-center items-center text-sm md:text-base font-bold text-white shadow-md">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

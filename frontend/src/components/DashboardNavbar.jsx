import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
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
        mb-14
        rounded-3xl
        border
        border-[#2D2D44]
        bg-[#151523]/80
        backdrop-blur-xl
        px-8
        py-5
        shadow-xl
      "
    >
      <div className="flex items-center justify-between">

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
                via-blue-400
                to-purple-500
                bg-clip-text
                text-transparent
              "
            >
              ZeroTrace
            </h1>

            <p className="text-xs text-gray-400 mt-1">
              AI Plagiarism Detection
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <div className="hidden lg:flex items-center gap-3">

          {links.map((link) => {

            const active = location.pathname === link.path;

            return (
              <Link
                key={link.title}
                to={link.path}
                className={`
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-2xl
                  font-medium
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-cyan-500 text-white shadow-lg"
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

        {/* Right Side */}

        <div className="flex items-center gap-5">

          {/* Notification */}

          <button
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-[#1E1E2F]
              border
              border-[#2D2D44]
              flex
              justify-center
              items-center
              hover:border-cyan-400
              transition
            "
          >

            <FaBell className="text-cyan-400 text-lg" />

            <span
              className="
                absolute
                top-2
                right-2
                w-2.5
                h-2.5
                rounded-full
                bg-green-400
              "
            />

          </button>

          {/* User */}

          <div className="text-right hidden md:block">

            <p className="font-semibold">

              {user?.name}

            </p>

            <p className="text-xs text-green-400">

              ✓ Verified User

            </p>

          </div>

          {/* Avatar */}

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-gradient-to-br
              from-cyan-500
              to-purple-600
              flex
              justify-center
              items-center
              text-lg
              font-bold
            "
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <LogoutButton />

        </div>

      </div>

    </nav>
  );
};

export default DashboardNavbar;
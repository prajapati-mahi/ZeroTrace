import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090F]/80 border-b border-[#222238]">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="ZeroTrace"
            className="w-12 h-12"
          />

          <div>

            <h1
              className="
              text-3xl
              font-black
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
              "
            >
              ZeroTrace
            </h1>

            <p className="text-xs text-gray-400">
              AI Plagiarism Detection
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-10">

          <a
            href="#features"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Features
          </a>

          <a
            href="#how"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            How It Works
          </a>

          <a
            href="#tech"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Tech Stack
          </a>

          <a
            href="#about"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            About
          </a>

        </nav>

        {/* Buttons */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="
            text-gray-300
            hover:text-cyan-400
            transition
            "
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            hover:scale-105
            transition
            font-semibold
            text-white
            shadow-lg
            shadow-cyan-500/20
            "
          >
            Get Started
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
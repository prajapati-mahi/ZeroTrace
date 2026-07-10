import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div
      className="
      flex
      justify-between
      items-center
      py-6
      "
    >
      <div>
        <h1
          className="
          text-5xl
          font-extrabold
          bg-gradient-to-r
          from-purple-500
          to-cyan-400
          bg-clip-text
          text-transparent
          "
        >
          ZeroTrace AI
        </h1>

        <p className="text-zinc-400 mt-2">
          AI-Powered Plagiarism Detection
        </p>

        <Link
  to="/settings"
  className="hover:text-cyan-400 transition"
>
  Settings
</Link>
      </div>
    </div>
  );
};

export default Navbar;
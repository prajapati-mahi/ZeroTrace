import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="
      flex
      items-center
      gap-2
      px-5
      py-3
      rounded-xl
      bg-red-500
      hover:bg-red-600
      transition
      text-white
      font-semibold
      "
    >
      <FaSignOutAlt />

      Logout
    </button>
  );
};

export default LogoutButton;
import { Link } from "react-router-dom";
import {
  FaFileUpload,
  FaRobot,
  FaHistory,
  FaUser
} from "react-icons/fa";

const actions = [
  {
    title: "Upload PDF",
    icon: <FaFileUpload />,
    path: "/checker",
  },
  {
    title: "Text Checker",
    icon: <FaRobot />,
    path: "/checker",
  },
  {
    title: "History",
    icon: <FaHistory />,
    path: "/history",
  },
  {
    title: "Profile",
    icon: <FaUser />,
    path: "/profile",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-[#151523] rounded-3xl border border-[#2d2d44] p-8">

      <h2 className="text-2xl font-bold mb-8">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-5">

        {actions.map((item) => (

          <Link
            key={item.title}
            to={item.path}
            className="
              rounded-2xl
              border
              border-[#2d2d44]
              p-6
              flex
              flex-col
              items-center
              gap-3
              hover:border-cyan-400
              hover:bg-[#1b1b2b]
              transition
            "
          >

            <div className="text-3xl text-cyan-400">

              {item.icon}

            </div>

            <p className="font-semibold">

              {item.title}

            </p>

          </Link>

        ))}

      </div>

    </div>
  );
};

export default QuickActions;
import { Link } from "react-router-dom";
import {
  FaFileUpload,
  FaRobot,
  FaHistory,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";

const actions = [
  {
    title: "Upload PDF",
    subtitle: "Analyze PDF documents",
    icon: <FaFileUpload />,
    path: "/checker",
  },
  {
    title: "Text Checker",
    subtitle: "Paste and analyze text",
    icon: <FaRobot />,
    path: "/checker",
  },
  {
    title: "History",
    subtitle: "View previous reports",
    icon: <FaHistory />,
    path: "/history",
  },
  {
    title: "Profile",
    subtitle: "Manage your account",
    icon: <FaUser />,
    path: "/profile",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <p className="text-gray-400 mt-2 text-sm">
          Access the most frequently used features.
        </p>

      </div>

      <div className="space-y-4">

        {actions.map((item) => (

          <Link
            key={item.title}
            to={item.path}
            className="
              group
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-[#2D2D44]
              bg-[#1B1B2B]
              p-5
              hover:border-cyan-400
              hover:bg-[#202033]
              transition-all
              duration-300
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
                  text-cyan-400
                  text-xl
                  group-hover:scale-110
                  transition
                "
              >
                {item.icon}
              </div>

              <div>

                <h3 className="font-semibold">

                  {item.title}

                </h3>

                <p className="text-xs text-gray-400 mt-1">

                  {item.subtitle}

                </p>

              </div>

            </div>

            <FaArrowRight
              className="
                text-gray-500
                group-hover:text-cyan-400
                group-hover:translate-x-1
                transition-all
              "
            />

          </Link>

        ))}

      </div>

    </div>
  );
};

export default QuickActions;
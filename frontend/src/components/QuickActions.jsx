import { Link } from "react-router-dom";
import {
  FaFilePdf,
  FaRobot,
  FaHistory,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";

const actions = [
  {
    title: "Text Plagiarism Checker",
    subtitle: "Paste text or code to analyze",
    icon: <FaRobot />,
    path: "/checker",
  },
  {
    title: "PDF Document Comparison",
    subtitle: "Compare two PDF/DOCX files",
    icon: <FaFilePdf />,
    path: "/pdf-checker",
  },
  {
    title: "Report History",
    subtitle: "View previous scans & results",
    icon: <FaHistory />,
    path: "/history",
  },
  {
    title: "User Profile",
    subtitle: "Manage your account & settings",
    icon: <FaUser />,
    path: "/profile",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Quick Actions
        </h2>
        <p className="text-gray-400 mt-1 text-sm">
          Access the most frequently used detection tools.
        </p>
      </div>

      <div className="space-y-3.5">
        {actions.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="
              group flex items-center justify-between rounded-2xl border border-[#2D2D44] bg-[#1B1B2B] p-4.5
              hover:border-cyan-400 hover:bg-[#202033] transition-all duration-300
            "
          >
            <div className="flex items-center gap-3.5">
              <div
                className="
                  w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center
                  text-cyan-400 text-lg group-hover:scale-110 transition
                "
              >
                {item.icon}
              </div>

              <div>
                <h3 className="font-semibold text-white text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <FaArrowRight
              className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all text-sm"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

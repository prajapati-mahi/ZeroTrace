import {
  FaLightbulb,
  FaChartLine,
  FaRobot,
  FaShieldAlt,
  FaArrowUp,
} from "react-icons/fa";

const insights = [
  {
    icon: <FaLightbulb />,
    title: "Writing Tip",
    value: "Keep similarity below 15% for maximum originality.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: <FaRobot />,
    title: "AI Detection",
    value: "Every submission is analyzed using AI detection models.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: <FaArrowUp />,
    title: "Performance",
    value: "Track improvements across all your plagiarism reports.",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: <FaShieldAlt />,
    title: "Privacy",
    value: "Your uploaded files are encrypted and securely stored.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

const InsightsPanel = () => {
  return (
    <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Insights
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Helpful recommendations for better reports.
          </p>

        </div>

        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">

          <FaChartLine className="text-cyan-400 text-xl" />

        </div>

      </div>

      {/* Cards */}

      <div className="space-y-4">

        {insights.map((item) => (

          <div
            key={item.title}
            className="
              group
              rounded-2xl
              border
              border-[#2D2D44]
              bg-[#1B1B2B]
              p-4
              hover:border-cyan-400
              hover:bg-[#202033]
              transition-all
              duration-300
            "
          >

            <div className="flex gap-4">

              <div
                className={`
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  ${item.bg}
                  ${item.color}
                  text-xl
                  group-hover:scale-110
                  transition
                `}
              >
                {item.icon}
              </div>

              <div>

                <h3 className="font-semibold text-white">

                  {item.title}

                </h3>

                <p className="text-sm text-gray-400 mt-2 leading-6">

                  {item.value}

                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default InsightsPanel;
import {
  FaChartLine,
  FaRobot,
  FaCalendarAlt,
  FaArrowUp,
} from "react-icons/fa";

const cards = (stats) => [
  {
    title: "Total Reports",
    value: stats.totalReports,
    icon: <FaChartLine />,
    color: "from-cyan-500 to-blue-500",
    badge: "All Time",
  },
  {
    title: "Average Similarity",
    value: `${stats.averageSimilarity}%`,
    icon: <FaRobot />,
    color: "from-purple-500 to-pink-500",
    badge: "Average",
  },
  {
    title: "This Month",
    value: stats.reportsThisMonth,
    icon: <FaCalendarAlt />,
    color: "from-green-500 to-emerald-500",
    badge: "Monthly",
  },
];

const AnalyticsSummary = ({ stats }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">

      {cards(stats).map((card) => (

        <div
          key={card.title}
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-[#151523]
            border
            border-[#2D2D44]
            p-7
            group
            hover:border-cyan-400
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          {/* Glow */}

          <div
            className={`
              absolute
              -top-10
              -right-10
              w-32
              h-32
              rounded-full
              bg-gradient-to-br
              ${card.color}
              opacity-10
              blur-3xl
            `}
          />

          {/* Badge */}

          <div className="flex justify-between items-start mb-8">

            <span className="px-3 py-1 rounded-full bg-white/5 border border-[#2D2D44] text-xs text-gray-400">

              {card.badge}

            </span>

            <div
              className={`
                w-12
                h-12
                rounded-2xl
                flex
                justify-center
                items-center
                text-white
                bg-gradient-to-br
                ${card.color}
              `}
            >
              {card.icon}
            </div>

          </div>

          {/* Title */}

          <p className="text-gray-400 text-sm">

            {card.title}

          </p>

          {/* Value */}

          <h2 className="text-5xl font-black mt-3">

            {card.value}

          </h2>

          {/* Bottom */}

          <div className="flex items-center gap-2 mt-8 text-green-400 text-sm">

            <FaArrowUp />

            <span>Updated Live</span>

          </div>

        </div>

      ))}

    </div>
  );
};

export default AnalyticsSummary;
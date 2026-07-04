import {
  FaFileAlt,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";

const ScoreCards = ({ report }) => {

  const cards = [
    {
      title: "Plagiarism Score",
      value: `${report.plagiarismScore}%`,
      icon: <FaFileAlt />,
      color: "from-red-500 to-orange-400",
      width: report.plagiarismScore,
      description:
        report.plagiarismScore >= 60
          ? "High Similarity"
          : report.plagiarismScore >= 30
          ? "Moderate Similarity"
          : "Mostly Original",
    },

    {
      title: "AI Score",
      value: `${report.aiScore}%`,
      icon: <FaRobot />,
      color: "from-purple-500 to-cyan-400",
      width: report.aiScore,
      description:
        report.aiScore >= 60
          ? "Likely AI Generated"
          : report.aiScore >= 30
          ? "Mixed Content"
          : "Mostly Human Written",
    },

    {
      title: "Risk Level",
      value: report.risk,
      icon: <FaShieldAlt />,
      color: "from-green-500 to-emerald-400",
      width:
        report.risk.includes("LOW")
          ? 25
          : report.risk.includes("MEDIUM")
          ? 60
          : 100,
      description:
        report.risk.includes("LOW")
          ? "Safe Document"
          : report.risk.includes("MEDIUM")
          ? "Needs Manual Review"
          : "High Risk Document",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">

      {cards.map((card, index) => (

        <div
          key={index}
          className="
          bg-[#1a1a2e]
          border
          border-[#2a2a3e]
          rounded-3xl
          p-8
          shadow-xl
          hover:border-[#6c63ff]
          hover:-translate-y-2
          transition-all
          duration-300
          "
        >

          <div
            className="
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-3xl
            bg-gradient-to-r
            text-white
            mb-6
            "
          >
            {card.icon}
          </div>

          <h3
            className="
            text-[#a8a8b8]
            text-lg
            "
          >
            {card.title}
          </h3>

          <h1
            className="
            text-5xl
            font-black
            mt-4
            "
          >
            {card.value}
          </h1>

          <div
            className="
            h-3
            rounded-full
            bg-[#2a2a3e]
            mt-8
            overflow-hidden
            "
          >

            <div
              className={`bg-gradient-to-r ${card.color} h-full rounded-full transition-all duration-1000`}
              style={{
                width: `${card.width}%`,
              }}
            />

          </div>

          <p
            className="
            text-[#a8a8b8]
            mt-5
            "
          >
            {card.description}
          </p>

        </div>

      ))}

    </div>
  );
};

export default ScoreCards;
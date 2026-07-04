import {
  FaChartLine,
  FaLink,
  FaShieldAlt,
  FaArrowUp,
} from "react-icons/fa";

const SimilarityInsights = ({ report }) => {

  const totalSources =
    report.matches.length;

  const highestMatch =
    totalSources > 0
      ? Math.max(
          ...report.matches.map(
            (m) => m.score
          )
        )
      : 0;

  const averageScore =
    totalSources > 0
      ? (
          report.matches.reduce(
            (sum, m) =>
              sum + m.score,
            0
          ) / totalSources
        ).toFixed(1)
      : 0;

  const highestSource =
    totalSources > 0
      ? report.matches.find(
          (m) =>
            m.score === highestMatch
        )
      : null;

  const cards = [
    {
      icon: <FaArrowUp />,
      title: "Highest Match",
      value: `${highestMatch}%`,
      subtitle:
        highestSource?.title ||
        "No Source",
      color: "text-red-400",
    },

    {
      icon: <FaChartLine />,
      title: "Average Similarity",
      value: `${averageScore}%`,
      subtitle:
        "Across Sources",
      color: "text-cyan-400",
    },

    {
      icon: <FaLink />,
      title: "Sources Matched",
      value: totalSources,
      subtitle:
        "Web Sources",
      color: "text-yellow-400",
    },

    {
      icon: <FaShieldAlt />,
      title: "Overall Risk",
      value: report.risk,
      subtitle:
        "Assessment",
      color: "text-green-400",
    },
  ];

  return (

    <div className="mt-12">

      <h2
        className="
        text-3xl
        font-bold
        text-cyan-400
        mb-8
        "
      >
        Similarity Insights
      </h2>

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
      >

        {

          cards.map(
            (
              card,
              index
            ) => (

              <div
                key={index}
                className="
                bg-[#1a1a2e]
                border
                border-[#2a2a3e]
                rounded-3xl
                p-7
                hover:border-cyan-500
                transition
                "
              >

                <div
                  className={`
                  text-3xl
                  ${card.color}
                  `}
                >
                  {card.icon}
                </div>

                <h3
                  className="
                  mt-5
                  text-[#a8a8b8]
                  "
                >
                  {card.title}
                </h3>

                <h1
                  className="
                  text-4xl
                  font-black
                  mt-3
                  "
                >
                  {card.value}
                </h1>

                <p
                  className="
                  mt-3
                  text-sm
                  text-[#a8a8b8]
                  "
                >
                  {card.subtitle}
                </p>

              </div>

            )

          )

        }

      </div>

    </div>

  );

};

export default SimilarityInsights;
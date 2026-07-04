const SourceCard = ({ source, index }) => {

  let color = "";
  let label = "";

  if (source.score >= 70) {

    color = "from-red-500 to-orange-500";
    label = "High Similarity";

  }

  else if (source.score >= 40) {

    color = "from-yellow-400 to-orange-400";
    label = "Moderate Similarity";

  }

  else {

    color = "from-green-400 to-emerald-500";
    label = "Low Similarity";

  }

  return (

    <div
      className="
      bg-[#1a1a2e]
      border
      border-[#2a2a3e]
      rounded-3xl
      p-7
      transition
      duration-300
      hover:scale-[1.02]
      hover:border-cyan-500
      "
    >

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm text-[#9aa0b8]">
            Source #{index + 1}
          </p>

          <h2 className="text-xl font-bold mt-2">
            {source.title}
          </h2>

        </div>

        <div
          className={`
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          bg-gradient-to-r
          ${color}
          `}
        >
          {source.score}%
        </div>

      </div>

      <div className="mt-6">

        <div className="w-full h-3 rounded-full bg-[#2d2d45]">

          <div
            className={`
            h-3
            rounded-full
            bg-gradient-to-r
            ${color}
            `}
            style={{
              width: `${source.score}%`,
            }}
          />

        </div>

      </div>

      <div className="flex justify-between items-center mt-6">

        <p
          className={`
          font-semibold
          ${
            source.score >= 70
              ? "text-red-400"
              : source.score >= 40
              ? "text-yellow-400"
              : "text-green-400"
          }
          `}
        >
          {label}
        </p>

        <a
          href={source.link}
          target="_blank"
          rel="noreferrer"
          className="
          text-cyan-400
          hover:text-cyan-300
          font-semibold
          "
        >
          Visit Source →
        </a>

      </div>

    </div>

  );

};

export default SourceCard;
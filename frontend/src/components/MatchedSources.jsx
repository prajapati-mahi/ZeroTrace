import SourceCard from "./SourceCard";

const MatchedSources = ({ matches }) => {

  return (

    <div
      className="
      mt-10
      "
    >

      <h2
        className="
        text-3xl
        font-bold
        text-cyan-400
        mb-8
        "
      >
        Matched Sources
      </h2>

      {

        !matches || matches.length === 0 ? (

          <div
            className="
            bg-[#1a1a2e]
            rounded-3xl
            p-8
            border
            border-[#2a2a3e]
            text-center
            "
          >

            <h3
              className="
              text-2xl
              font-bold
              text-green-400
              "
            >
              No Similar Sources Found
            </h3>

            <p
              className="
              mt-4
              text-[#a8a8b8]
              "
            >
              This document appears to be original.
            </p>

          </div>

        ) : (

          <div
            className="
            grid
            gap-6
            "
          >

            {

              matches.map(

                (source, index) => (

                  <SourceCard
                    key={index}
                    source={source}
                    index={index}
                  />

                )

              )

            }

          </div>

        )

      }

    </div>

  );

};

export default MatchedSources;
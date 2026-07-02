const MatchedSources = ({ matches }) => {
  return (
    <div className="mt-10 bg-[#1a1a2e] rounded-3xl p-8 border border-[#2a2a3e]">

      <h2 className="text-3xl font-bold mb-8 text-cyan-400">
        Matched Sources
      </h2>

      {matches.length === 0 ? (

        <div className="text-center py-10 text-[#a8a8b8]">
          No matching sources found.
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-[#2a2a3e]">

                <th className="text-left py-4">
                  #
                </th>

                <th className="text-left py-4">
                  Source
                </th>

                <th className="text-center py-4">
                  Similarity
                </th>

                <th className="text-center py-4">
                  Link
                </th>

              </tr>

            </thead>

            <tbody>

              {matches.map(
                (source, index) => (

                  <tr
                    key={source._id}
                    className="
                    border-b
                    border-[#2a2a3e]
                    hover:bg-[#242438]
                    transition
                    "
                  >

                    <td className="py-5">
                      {index + 1}
                    </td>

                    <td className="py-5">

                      <h3 className="font-semibold">
                        {source.title}
                      </h3>

                    </td>

                    <td className="text-center">

                      <span
                        className="
                        bg-gradient-to-r
                        from-[#6c63ff]
                        to-[#00d4ff]
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-bold
                        "
                      >
                        {source.score}%
                      </span>

                    </td>

                    <td className="text-center">

                      <a
                        href={source.link}
                        target="_blank"
                        rel="noreferrer"
                        className="
                        text-cyan-400
                        hover:underline
                        "
                      >
                        View
                      </a>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default MatchedSources;
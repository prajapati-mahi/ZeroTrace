function MatchedContent({
  matches,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Matched Content
      </h2>

      {matches.length === 0 ? (
        <p>
          No matching content found.
        </p>
      ) : (
        <div className="space-y-4">

          {matches.map(
            (match, index) => (
              <div
                key={index}
                className="
                bg-red-50
                border
                border-red-200
                rounded-xl
                p-4
                "
              >
                {match}
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default MatchedContent;
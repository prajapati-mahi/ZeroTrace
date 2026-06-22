import { useState } from "react";
import axios from "axios";

function Checker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/text/check",
        {
          text,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.log(error);

      alert("Error analyzing text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-[#0a0a0f]
      text-[#f0f0f5]
      p-10
      "
    >
      <h1
        className="
        text-5xl
        font-black
        mb-3
        bg-gradient-to-r
        from-[#6c63ff]
        to-[#00d4ff]
        bg-clip-text
        text-transparent
        "
      >
        AI & Plagiarism Checker
      </h1>

      <p className="text-[#a8a8b8] mb-8">
        Detect plagiarism, AI content and source matches.
      </p>

      <textarea
        rows="10"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Paste your content here..."
        className="
        w-full
        p-5
        rounded-2xl
        bg-[#1a1a2e]
        border
        border-[#2a2a3e]
        outline-none
        "
      />

      <button
        onClick={handleAnalyze}
        className="
        mt-5
        px-8
        py-3
        rounded-xl
        font-semibold
        bg-gradient-to-r
        from-[#6c63ff]
        to-[#00d4ff]
        "
      >
        {loading
          ? "Analyzing..."
          : "Analyze Text"}
      </button>

      {result && (
        <>
          <div
            className="
            grid
            md:grid-cols-3
            gap-6
            mt-10
            "
          >
            <div className="bg-[#1a1a2e] p-6 rounded-2xl">
              <h3 className="text-[#a8a8b8]">
                Plagiarism Score
              </h3>

              <p className="text-4xl font-bold mt-2">
                {result.plagiarismScore}%
              </p>
            </div>

            <div className="bg-[#1a1a2e] p-6 rounded-2xl">
              <h3 className="text-[#a8a8b8]">
                AI Score
              </h3>

              <p className="text-4xl font-bold mt-2">
                {result.aiScore}%
              </p>
            </div>

            <div className="bg-[#1a1a2e] p-6 rounded-2xl">
              <h3 className="text-[#a8a8b8]">
                AI Risk
              </h3>

              <p className="text-4xl font-bold mt-2">
                {result.aiRisk}
              </p>
            </div>
          </div>

          <div
            className="
            bg-[#1a1a2e]
            mt-10
            p-6
            rounded-2xl
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              Sources
            </h2>

            {result.sources?.length === 0 ? (
              <p>No sources found</p>
            ) : (
              result.sources?.map(
                (source, index) => (
                  <div
                    key={index}
                    className="mb-4"
                  >
                    <a
                      href={source.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400"
                    >
                      {source.title}
                    </a>

                    <p>
                      Similarity:
                      {" "}
                      {source.score}%
                    </p>
                  </div>
                )
              )
            )}
          </div>

          <div
            className="
            bg-[#1a1a2e]
            mt-10
            p-6
            rounded-2xl
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              Matched Sentences
            </h2>

            {result.matchedSentences
              ?.length === 0 ? (
              <p>
                No matched sentences
              </p>
            ) : (
              result.matchedSentences?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="
                    border-b
                    border-[#2a2a3e]
                    py-4
                    "
                  >
                    <p>
                      {item.sentence}
                    </p>

                    <p
                      className="
                      text-sm
                      text-cyan-400
                      mt-2
                      "
                    >
                      {item.source}
                    </p>

                    <p
                      className="
                      text-sm
                      text-purple-400
                      "
                    >
                      Match:
                      {" "}
                      {item.score}%
                    </p>
                  </div>
                )
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Checker;
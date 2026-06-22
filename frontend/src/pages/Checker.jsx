import { useState } from "react";
import axios from "axios";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

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
        { text }
      );

      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Error analyzing text");
    } finally {
      setLoading(false);
    }
  };

  const copyReport = () => {
    if (!result) return;

    const report = `
Plagiarism Score: ${result.plagiarismScore}%
AI Score: ${result.aiScore}%
AI Risk: ${result.aiRisk}
Sources Found: ${result.sources?.length || 0}
`;

    navigator.clipboard.writeText(report);

    alert("Report copied");
  };

  const downloadReport = () => {
    if (!result) return;

    const blob = new Blob(
      [JSON.stringify(result, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "report.json";
    a.click();
  };

  const riskColor =
    result?.aiRisk === "HIGH"
      ? "#ff6b6b"
      : result?.aiRisk === "MEDIUM"
      ? "#ffd93d"
      : "#51cf66";

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
        Detect plagiarism, AI content and
        source matches.
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

      <div className="flex gap-4 mt-5">
        <button
          onClick={handleAnalyze}
          className="
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
            <button
              onClick={copyReport}
              className="
              px-6
              py-3
              rounded-xl
              bg-[#1a1a2e]
              "
            >
              Copy Report
            </button>

            <button
              onClick={downloadReport}
              className="
              px-6
              py-3
              rounded-xl
              bg-[#1a1a2e]
              "
            >
              Export JSON
            </button>
          </>
        )}
      </div>

      {result && (
        <>
          <div
            className="
            grid
            md:grid-cols-4
            gap-6
            mt-10
            "
          >
            <div className="bg-[#1a1a2e] p-6 rounded-2xl flex flex-col items-center">
              <div className="w-32 h-32">
                <CircularProgressbar
                  value={
                    result.plagiarismScore
                  }
                  text={`${result.plagiarismScore}%`}
                  styles={buildStyles({
                    pathColor:
                      "#6c63ff",
                    textColor:
                      "#f0f0f5",
                    trailColor:
                      "#2a2a3e",
                  })}
                />
              </div>

              <p className="mt-4">
                Plagiarism
              </p>
            </div>

            <div className="bg-[#1a1a2e] p-6 rounded-2xl flex flex-col items-center">
              <div className="w-32 h-32">
                <CircularProgressbar
                  value={
                    result.aiScore
                  }
                  text={`${result.aiScore}%`}
                  styles={buildStyles({
                    pathColor:
                      "#00d4ff",
                    textColor:
                      "#f0f0f5",
                    trailColor:
                      "#2a2a3e",
                  })}
                />
              </div>

              <p className="mt-4">
                AI Score
              </p>
            </div>

            <div className="bg-[#1a1a2e] p-6 rounded-2xl flex flex-col justify-center">
              <h3 className="text-[#a8a8b8]">
                AI Risk
              </h3>

              <p
                className="text-4xl font-bold mt-3"
                style={{
                  color: riskColor,
                }}
              >
                {result.aiRisk}
              </p>
            </div>

            <div className="bg-[#1a1a2e] p-6 rounded-2xl flex flex-col justify-center">
              <h3 className="text-[#a8a8b8]">
                Sources Found
              </h3>

              <p className="text-4xl font-bold mt-3">
                {
                  result.sources
                    ?.length
                }
              </p>
            </div>
          </div>

          <div className="bg-[#1a1a2e] mt-10 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Sources
            </h2>

            {result.sources?.map(
              (source, index) => (
                <div
                  key={index}
                  className="mb-5"
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
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Checker;
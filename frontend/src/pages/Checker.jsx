import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
  FaSearch,
  FaCopy,
  FaDownload,
} from "react-icons/fa";

function Checker() {
  const [text, setText] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const wordCount =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  const characterCount = text.length;

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.warning("Please enter some text.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "http://localhost:5000/api/text/check",
        {
          text,
        }
      );

      setResult(response.data);

      toast.success("Analysis completed.");
    } catch (error) {
      console.log(error);

      toast.error(
        "Error analyzing text."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyReport = async () => {
    if (!result) return;

    const report = `
Plagiarism Score : ${result.plagiarismScore}%
AI Score : ${result.aiScore}%
AI Risk : ${result.aiRisk}
Sources : ${result.sources?.length || 0}
`;

    await navigator.clipboard.writeText(
      report
    );

    toast.success(
      "Report copied successfully."
    );
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

    a.download = "ZeroTrace_Report.json";

    a.click();

    toast.success(
      "Report downloaded."
    );
  };

  const riskColor =
    result?.aiRisk === "HIGH"
      ? "#ef4444"
      : result?.aiRisk === "MEDIUM"
      ? "#eab308"
      : "#22c55e";

  return (
    <div className="min-h-screen bg-[#09090F] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black">
          AI & Plagiarism Checker
        </h1>

        <p className="text-gray-400 mt-4 mb-10">
          Detect plagiarism, AI generated
          content and matching sources.
        </p>

        <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-8">

          <textarea
            rows={12}
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Paste your content here..."
            className="
              w-full
              bg-[#10101A]
              border
              border-[#2D2D44]
              rounded-2xl
              p-6
              resize-none
              outline-none
              focus:border-cyan-400
            "
          />

          <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">

            <span>
              Words : {wordCount}
            </span>

            <span>
              Characters : {characterCount}
            </span>

          </div>

          <div className="flex flex-wrap gap-4 mt-8">

            <button
              disabled={loading}
              onClick={handleAnalyze}
              className="
                bg-cyan-500
                hover:bg-cyan-600
                disabled:opacity-60
                px-8
                py-4
                rounded-2xl
                font-bold
                flex
                items-center
                gap-3
              "
            >
              <FaSearch />

              {loading
                ? "Analyzing..."
                : "Analyze Text"}
            </button>

            {result && (
              <>
                <button
                  onClick={copyReport}
                  className="
                    bg-[#10101A]
                    border
                    border-[#2D2D44]
                    px-6
                    py-4
                    rounded-2xl
                    flex
                    items-center
                    gap-3
                  "
                >
                  <FaCopy />

                  Copy Report
                </button>

                <button
                  onClick={downloadReport}
                  className="
                    bg-[#10101A]
                    border
                    border-[#2D2D44]
                    px-6
                    py-4
                    rounded-2xl
                    flex
                    items-center
                    gap-3
                  "
                >
                  <FaDownload />

                  Export JSON
                </button>
              </>
            )}

          </div>

        </div>

        {result && (
          <>            {/* Analytics Cards */}

            <div className="grid lg:grid-cols-4 gap-7 mt-10">

              {/* Plagiarism */}

              <div
                className="
                  bg-[#151523]
                  border
                  border-[#2D2D44]
                  rounded-3xl
                  p-7
                  text-center
                "
              >

                <h3 className="font-bold mb-6">
                  Plagiarism
                </h3>

                <div className="w-36 h-36 mx-auto">

                  <CircularProgressbar
                    value={result.plagiarismScore}
                    text={`${result.plagiarismScore}%`}
                    styles={buildStyles({
                      pathColor: "#06b6d4",
                      trailColor: "#2D2D44",
                      textColor: "#ffffff",
                      textSize: "16px",
                    })}
                  />

                </div>

              </div>

              {/* AI Score */}

              <div
                className="
                  bg-[#151523]
                  border
                  border-[#2D2D44]
                  rounded-3xl
                  p-7
                  text-center
                "
              >

                <h3 className="font-bold mb-6">
                  AI Score
                </h3>

                <div className="w-36 h-36 mx-auto">

                  <CircularProgressbar
                    value={result.aiScore}
                    text={`${result.aiScore}%`}
                    styles={buildStyles({
                      pathColor: "#8b5cf6",
                      trailColor: "#2D2D44",
                      textColor: "#ffffff",
                      textSize: "16px",
                    })}
                  />

                </div>

              </div>

              {/* Risk */}

              <div
                className="
                  bg-[#151523]
                  border
                  border-[#2D2D44]
                  rounded-3xl
                  p-7
                  flex
                  flex-col
                  justify-center
                "
              >

                <p className="text-gray-400">
                  AI Risk
                </p>

                <h2
                  className="text-4xl font-black mt-5"
                  style={{
                    color: riskColor,
                  }}
                >
                  {result.aiRisk}
                </h2>

              </div>

              {/* Sources */}

              <div
                className="
                  bg-[#151523]
                  border
                  border-[#2D2D44]
                  rounded-3xl
                  p-7
                  flex
                  flex-col
                  justify-center
                "
              >

                <p className="text-gray-400">
                  Sources Found
                </p>

                <h2 className="text-4xl font-black mt-5 text-cyan-400">
                  {result.sources?.length || 0}
                </h2>

              </div>

            </div>

            {/* Sources */}

            <div
              className="
                bg-[#151523]
                border
                border-[#2D2D44]
                rounded-3xl
                p-8
                mt-10
              "
            >

              <h2 className="text-2xl font-bold mb-8">
                Matching Sources
              </h2>

              {result.sources?.length === 0 ? (

                <div
                  className="
                    bg-[#10101A]
                    rounded-2xl
                    p-6
                    text-gray-400
                  "
                >
                  No matching sources were found.
                </div>

              ) : (

                <div className="space-y-5">

                  {result.sources.map(
                    (source, index) => (

                      <div
                        key={index}
                        className="
                          bg-[#10101A]
                          border
                          border-[#2D2D44]
                          rounded-2xl
                          p-6
                          hover:border-cyan-400
                          transition
                        "
                      >

                        <a
                          href={source.link}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            text-cyan-400
                            font-semibold
                            hover:underline
                            break-all
                          "
                        >
                          {source.title}
                        </a>

                        <div className="flex justify-between mt-4">

                          <span className="text-gray-400">
                            Similarity
                          </span>

                          <span className="font-bold">
                            {source.score}%
                          </span>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

            {/* Final section continues in Part 3 */}          </>

        )}

        {/* Footer */}

        <footer
          className="
            mt-20
            border-t
            border-[#2D2D44]
            pt-8
            text-center
            text-gray-500
          "
        >
          <p className="text-lg">
            Powered by{" "}
            <span className="text-cyan-400 font-semibold">
              ZeroTrace
            </span>
          </p>

          <p className="mt-2 text-sm">
            AI-Powered Plagiarism & Content Analysis
          </p>
        </footer>

      </div>

    </div>

  );
}

export default Checker;
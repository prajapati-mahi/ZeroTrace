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
  FaExclamationTriangle,
  FaLayerGroup,
  FaLink,
  FaTrashAlt,
  FaMagic,
} from "react-icons/fa";

const SAMPLE_LEETCODE = "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.";

function Checker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const characterCount = text.length;

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.warning("Please enter some text or code to analyze.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await api.post("/text/check", { text });
      setResult(response.data);
      toast.success("Analysis completed.");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error analyzing content.");
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => {
    setText(SAMPLE_LEETCODE);
    setResult(null);
    toast.info("LeetCode Two Sum sample loaded.");
  };

  const clearText = () => {
    setText("");
    setResult(null);
  };

  const copyReport = async () => {
    if (!result) return;

    const report = `
ZeroTrace Plagiarism & Content Authenticity Report
--------------------------------------------------
Plagiarism Score : ${result.plagiarismScore}%
Exact Overlap    : ${result.analysis?.exactMatch || 0}%
Near-Exact Match : ${result.analysis?.nearExactMatch || 0}%
Semantic Match   : ${result.analysis?.semanticSimilarity || 0}%
AI Score         : ${result.aiScore}%
Risk Level       : ${result.riskLevel || result.aiRisk || "LOW"}
Sources Found    : ${result.sources?.length || 0}
Matched Words    : ${result.stats?.matchedWords || 0} / ${result.stats?.inputWords || 0}
Coverage         : ${result.stats?.coveragePercent || 0}%
`;

    await navigator.clipboard.writeText(report);
    toast.success("Report copied to clipboard.");
  };

  const downloadReport = () => {
    if (!result) return;

    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ZeroTrace_Report_${Date.now()}.json`;
    a.click();
    toast.success("Report downloaded as JSON.");
  };

  const plagColor =
    (result?.plagiarismScore || 0) >= 50
      ? "#ef4444"
      : (result?.plagiarismScore || 0) >= 20
      ? "#eab308"
      : "#22c55e";

  return (
    <div className="min-h-screen bg-[#09090F] text-white px-6 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black">
              Multi-Signal Plagiarism & AI Checker
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Identifies exact web matches, paraphrasing, code structures, and AI-generated text.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadSample}
              className="px-4 py-2 rounded-xl bg-[#151523] border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/10 flex items-center gap-2 transition"
            >
              <FaMagic /> Load Sample Question
            </button>
            {text && (
              <button
                onClick={clearText}
                className="px-4 py-2 rounded-xl bg-[#151523] border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/10 flex items-center gap-2 transition"
              >
                <FaTrashAlt /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Input Box */}
        <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 md:p-8 shadow-2xl">
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your problem statement, code snippet, essay, or research paragraph here..."
            className="w-full bg-[#10101A] border border-[#2D2D44] rounded-2xl p-5 md:p-6 resize-none outline-none focus:border-cyan-400 font-mono text-sm leading-relaxed transition"
          />

          <div className="flex justify-between items-center mt-4 text-gray-400 text-xs md:text-sm">
            <span>Words: <strong className="text-gray-200">{wordCount}</strong></span>
            <span>Characters: <strong className="text-gray-200">{characterCount}</strong></span>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              disabled={loading}
              onClick={handleAnalyze}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 transition shadow-lg shadow-cyan-500/20"
            >
              <FaSearch />
              {loading ? "Running Multi-Signal Analysis..." : "Analyze Content"}
            </button>

            {result && (
              <>
                <button
                  onClick={copyReport}
                  className="bg-[#10101A] border border-[#2D2D44] hover:border-cyan-400 px-5 py-3.5 rounded-2xl flex items-center gap-2.5 transition text-sm"
                >
                  <FaCopy /> Copy Summary
                </button>

                <button
                  onClick={downloadReport}
                  className="bg-[#10101A] border border-[#2D2D44] hover:border-cyan-400 px-5 py-3.5 rounded-2xl flex items-center gap-2.5 transition text-sm"
                >
                  <FaDownload /> Export JSON
                </button>
              </>
            )}
          </div>
        </div>

        {/* Results Area */}
        {result && (
          <div className="mt-10 space-y-8 animate-fadeIn">
            {/* Warning banner */}
            {result.warnings && result.warnings.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4.5 flex items-center gap-4 text-amber-300 text-sm">
                <FaExclamationTriangle className="text-xl flex-shrink-0" />
                <p>{result.warnings.join(" ")}</p>
              </div>
            )}

            {/* Score Overview Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Plagiarism Score */}
              <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 text-center">
                <h3 className="font-bold mb-4 text-gray-300 text-sm">Plagiarism Score</h3>
                <div className="w-32 h-32 mx-auto">
                  <CircularProgressbar
                    value={result.plagiarismScore || 0}
                    text={`${result.plagiarismScore || 0}%`}
                    styles={buildStyles({
                      pathColor: plagColor,
                      trailColor: "#2D2D44",
                      textColor: "#ffffff",
                      textSize: "20px",
                    })}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  {result.plagiarismScore >= 50
                    ? "High Overlap Detected"
                    : result.plagiarismScore >= 20
                    ? "Moderate Overlap"
                    : "Low / Original Content"}
                </p>
              </div>

              {/* AI Detection Score */}
              <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 text-center">
                <h3 className="font-bold mb-4 text-gray-300 text-sm">AI Score</h3>
                <div className="w-32 h-32 mx-auto">
                  <CircularProgressbar
                    value={result.aiScore || 0}
                    text={`${result.aiScore || 0}%`}
                    styles={buildStyles({
                      pathColor: "#8b5cf6",
                      trailColor: "#2D2D44",
                      textColor: "#ffffff",
                      textSize: "20px",
                    })}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-4">Independent AI probability</p>
              </div>

              {/* Risk Level */}
              <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 flex flex-col justify-center">
                <p className="text-gray-400 text-xs">Risk Assessment</p>
                <h2 className="text-3xl font-black mt-2" style={{ color: plagColor }}>
                  {result.riskLevel || result.risk || "LOW"}
                </h2>
                <p className="text-xs text-gray-400 mt-3">
                  Token Coverage: <strong className="text-white">{result.stats?.coveragePercent || 0}%</strong>
                </p>
              </div>

              {/* Sources Found */}
              <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 flex flex-col justify-center">
                <p className="text-gray-400 text-xs">Sources Detected</p>
                <h2 className="text-3xl font-black mt-2 text-cyan-400">
                  {result.sources?.length || 0}
                </h2>
                <p className="text-xs text-gray-400 mt-3">
                  <strong className="text-white">{result.stats?.matchedSentencesCount || 0}</strong> overlapping passages
                </p>
              </div>
            </div>

            {/* Breakdown Analysis */}
            {result.analysis && (
              <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 md:p-7">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2.5">
                  <FaLayerGroup className="text-cyan-400" />
                  Similarity Signal Breakdown
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4.5">
                    <p className="text-gray-400 text-xs">Exact Match Overlap</p>
                    <h3 className="text-2xl font-bold mt-1.5 text-red-400">
                      {result.analysis.exactMatch}%
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-1">Identical character sequences</p>
                  </div>
                  <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4.5">
                    <p className="text-gray-400 text-xs">Near-Exact / Shingles</p>
                    <h3 className="text-2xl font-bold mt-1.5 text-yellow-400">
                      {result.analysis.nearExactMatch}%
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-1">Minor edits & word substitutions</p>
                  </div>
                  <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4.5">
                    <p className="text-gray-400 text-xs">Semantic Similarity</p>
                    <h3 className="text-2xl font-bold mt-1.5 text-purple-400">
                      {result.analysis.semanticSimilarity}%
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-1">Paraphrased concept alignment</p>
                  </div>
                </div>
              </div>
            )}

            {/* Matched Passages List */}
            {result.matchedSentences && result.matchedSentences.length > 0 && (
              <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 md:p-7">
                <h2 className="text-xl font-bold mb-5">Matched Passages & Source Evidence</h2>
                <div className="space-y-4">
                  {result.matchedSentences.map((match, idx) => (
                    <div
                      key={idx}
                      className="bg-[#10101A] border border-[#2D2D44] hover:border-cyan-500/50 rounded-2xl p-5 transition"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">
                          {match.matchType || "Matched"}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/20 text-red-400">
                          {match.score}% Similarity ({match.confidence || "HIGH"} Confidence)
                        </span>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed font-mono">
                        "{match.sentence}"
                      </p>
                      {match.matchedPassage && match.matchedPassage !== match.sentence && (
                        <p className="text-gray-400 text-xs mt-2.5 border-l-2 border-cyan-500 pl-3">
                          <strong className="text-gray-300">Source:</strong> "{match.matchedPassage}"
                        </p>
                      )}
                      <p className="text-cyan-400/80 text-xs mt-3 truncate">
                        Source: {match.sourceTitle || match.source}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Sources */}
            <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 md:p-7">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2.5">
                <FaLink className="text-cyan-400" />
                Matching Sources
              </h2>

              {!result.sources || result.sources.length === 0 ? (
                <div className="bg-[#10101A] rounded-2xl p-6 text-gray-400 text-center text-sm">
                  No overlapping sources were detected online.
                </div>
              ) : (
                <div className="space-y-3.5">
                  {result.sources.map((source, index) => (
                    <div
                      key={index}
                      className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-5 hover:border-cyan-400 transition"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="min-w-0 flex-1">
                          <a
                            href={source.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 font-semibold hover:underline block truncate text-sm"
                          >
                            {source.title || source.domain || source.link}
                          </a>
                          <span className="text-xs text-gray-400 mt-1 block">
                            {source.domain || source.link}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-lg font-bold text-white block">
                            {source.score}%
                          </span>
                          <span className="text-xs text-gray-400">
                            {source.confidence || "HIGH"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-[#2D2D44] pt-8 text-center text-gray-500 text-xs">
          Powered by <span className="text-cyan-400 font-semibold">ZeroTrace Engine</span>
        </footer>
      </div>
    </div>
  );
}

export default Checker;

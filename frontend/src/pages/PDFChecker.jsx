import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaTimes,
  FaCheckCircle,
  FaDownload,
  FaExchangeAlt,
  FaLayerGroup,
} from "react-icons/fa";

function PDFChecker() {
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);

  const [score, setScore] = useState(null);
  const [matches, setMatches] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [scanTime, setScanTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!pdf1 || !pdf2) {
      toast.warning("Please upload both PDF files.");
      return;
    }

    try {
      setLoading(true);
      setScore(null);
      setMatches([]);

      const formData = new FormData();
      formData.append("pdf1", pdf1);
      formData.append("pdf2", pdf2);

      const response = await api.post("/pdf/compare", formData);

      setScore(response.data.similarityScore ?? 0);
      setMatches(response.data.matches || []);
      setAnalysis(response.data.analysis || null);
      setScanTime(new Date().toLocaleString());

      toast.success("Comparison completed.");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to compare PDFs.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = () => {
    if (score < 20)
      return {
        label: "LOW RISK",
        color: "#22c55e",
        message: "No significant plagiarism detected between the documents.",
      };

    if (score < 50)
      return {
        label: "MEDIUM RISK",
        color: "#eab308",
        message: "Moderate overlap detected. Common citations or similar references.",
      };

    return {
      label: "HIGH RISK",
      color: "#ef4444",
      message: "Substantial direct overlap detected between these documents.",
    };
  };

  const risk = score !== null ? getRiskLevel() : null;

  const downloadReport = async () => {
    try {
      const riskInfo = getRiskLevel();
      const response = await api.post(
        "/report/generate",
        {
          score,
          risk: riskInfo.label,
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `ZeroTrace_PDF_Report_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("PDF Report downloaded.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to download report.");
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-[#09090F] text-white px-6 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <FaExchangeAlt /> Direct Document Alignment
          </span>
          <h1 className="text-4xl md:text-5xl font-black">
            PDF & Document Similarity Checker
          </h1>
          <p className="text-gray-400 mt-3 text-base md:text-lg max-w-2xl mx-auto">
            Upload two documents (PDF / DOCX) to perform an offline, passage-by-passage structural and lexical comparison.
          </p>
        </div>

        {/* Upload Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* First PDF */}
          <div className="relative">
            <label
              className={`
                bg-[#151523] border-2 border-dashed rounded-3xl p-8 md:p-10 cursor-pointer block
                hover:border-cyan-400 transition-all duration-300 text-center
                ${pdf1 ? "border-cyan-500/60 bg-[#161628]" : "border-[#2D2D44]"}
              `}
            >
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) setPdf1(e.target.files[0]);
                }}
              />

              <div className="flex flex-col items-center">
                <FaCloudUploadAlt className="text-cyan-400 mb-4" size={54} />
                <h2 className="text-xl font-bold">
                  {pdf1 ? "Replace Document 1" : "Upload Document 1 (Original)"}
                </h2>
                <p className="text-gray-400 text-xs mt-2">
                  Supports PDF, DOCX, and TXT files
                </p>

                {pdf1 && (
                  <div className="mt-5 w-full bg-[#10101A] border border-cyan-500/40 rounded-2xl p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 truncate">
                      <FaFilePdf className="text-red-400 flex-shrink-0 text-xl" />
                      <div className="text-left truncate">
                        <p className="text-sm font-semibold truncate text-white">{pdf1.name}</p>
                        <p className="text-xs text-gray-400">{formatFileSize(pdf1.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPdf1(null);
                      }}
                      className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-[#1E1E2F] transition"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Second PDF */}
          <div className="relative">
            <label
              className={`
                bg-[#151523] border-2 border-dashed rounded-3xl p-8 md:p-10 cursor-pointer block
                hover:border-cyan-400 transition-all duration-300 text-center
                ${pdf2 ? "border-cyan-500/60 bg-[#161628]" : "border-[#2D2D44]"}
              `}
            >
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) setPdf2(e.target.files[0]);
                }}
              />

              <div className="flex flex-col items-center">
                <FaCloudUploadAlt className="text-purple-400 mb-4" size={54} />
                <h2 className="text-xl font-bold">
                  {pdf2 ? "Replace Document 2" : "Upload Document 2 (Comparison Target)"}
                </h2>
                <p className="text-gray-400 text-xs mt-2">
                  Supports PDF, DOCX, and TXT files
                </p>

                {pdf2 && (
                  <div className="mt-5 w-full bg-[#10101A] border border-purple-500/40 rounded-2xl p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 truncate">
                      <FaFilePdf className="text-red-400 flex-shrink-0 text-xl" />
                      <div className="text-left truncate">
                        <p className="text-sm font-semibold truncate text-white">{pdf2.name}</p>
                        <p className="text-xs text-gray-400">{formatFileSize(pdf2.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPdf2(null);
                      }}
                      className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-[#1E1E2F] transition"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Compare Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleCompare}
            disabled={loading || !pdf1 || !pdf2}
            className="
              bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed
              transition px-10 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-cyan-500/20
            "
          >
            {loading ? "Comparing Documents..." : "Compare Documents"}
          </button>
        </div>

        {/* Results View */}
        {score !== null && (
          <div className="space-y-8 animate-fadeIn">
            {/* Overview Result Cards */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Score Circular Gauge */}
              <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-6 text-center">
                <h2 className="text-lg font-bold mb-4 text-gray-300">Document Similarity Score</h2>
                <div className="w-36 h-36 mx-auto">
                  <CircularProgressbar
                    value={score}
                    text={`${score}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      trailColor: "#2D2D44",
                      pathColor: risk.color,
                      textSize: "20px",
                    })}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  Multi-signal token coverage
                </p>
              </div>

              {/* Risk Level Card */}
              <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-6 flex flex-col justify-center">
                <p className="text-gray-400 text-sm">Plagiarism Risk</p>
                <h1 className="text-4xl font-black mt-3" style={{ color: risk.color }}>
                  {risk.label}
                </h1>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  {risk.message}
                </p>
              </div>

              {/* Scan Info */}
              <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-6 flex flex-col justify-center">
                <h2 className="text-lg font-bold mb-4 text-gray-300">Scan Metadata</h2>
                <div className="space-y-2.5 text-xs text-gray-300">
                  <p className="truncate">
                    <strong className="text-gray-400">Doc 1:</strong> {pdf1?.name}
                  </p>
                  <p className="truncate">
                    <strong className="text-gray-400">Doc 2:</strong> {pdf2?.name}
                  </p>
                  <p>
                    <strong className="text-gray-400">Scanned At:</strong> {scanTime}
                  </p>
                  <p>
                    <strong className="text-gray-400">Matched Segments:</strong> {matches.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown Analysis if available */}
            {analysis && (
              <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FaLayerGroup className="text-cyan-400" />
                  Comparison Signal Breakdown
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4">
                    <p className="text-gray-400 text-xs">Exact Overlap</p>
                    <h3 className="text-xl font-bold mt-1 text-red-400">{analysis.exactMatch || 0}%</h3>
                  </div>
                  <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4">
                    <p className="text-gray-400 text-xs">Near-Exact / Shingles</p>
                    <h3 className="text-xl font-bold mt-1 text-yellow-400">{analysis.nearExactMatch || 0}%</h3>
                  </div>
                  <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4">
                    <p className="text-gray-400 text-xs">Semantic Overlap</p>
                    <h3 className="text-xl font-bold mt-1 text-purple-400">{analysis.semanticSimilarity || 0}%</h3>
                  </div>
                </div>
              </div>
            )}

            {/* Matched Passages List */}
            <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">
                Matched Content Passages ({matches.length})
              </h2>

              {matches.length === 0 ? (
                <div className="bg-[#10101A] rounded-2xl p-6 text-gray-400 text-center">
                  No overlapping passages detected between these documents.
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
                  {matches.map((match, index) => {
                    const text = typeof match === "string" ? match : match.sentence || match.matchedPassage;
                    return (
                      <div
                        key={index}
                        className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-sm text-gray-200 font-mono leading-relaxed"
                      >
                        "{text}"
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Download Report */}
            <div className="text-center pt-4">
              <button
                onClick={downloadReport}
                className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 mx-auto shadow-lg shadow-cyan-500/20"
              >
                <FaDownload /> Download Detailed PDF Report
              </button>
            </div>
          </div>
        )}

        <footer className="text-center mt-20 text-gray-500 pb-6 text-xs">
          Powered by <span className="text-cyan-400 font-semibold">ZeroTrace Engine</span>
        </footer>
      </div>
    </div>
  );
}

export default PDFChecker;

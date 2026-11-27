import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaDownload,
  FaFileAlt,
  FaRobot,
  FaShieldAlt,
  FaLink,
  FaCalendarAlt,
  FaLayerGroup,
  FaCopy,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import SkeletonCard from "../components/SkeletonCard";
import DashboardNavbar from "../components/DashboardNavbar";

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/report/${id}`);
      setReport(data);
    } catch (error) {
      console.error("Failed to load report:", error);
      toast.error("Unable to load report.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    if (!report) return;
    try {
      toast.info("Generating PDF report...");
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");

      const response = await fetch(`${baseURL}/report/pdf/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to download PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ZeroTrace_Report_${report.title?.substring(0, 20) || id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("PDF report downloaded.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download PDF report.");
    }
  };

  const copyReportSummary = async () => {
    if (!report) return;
    const summary = `
ZeroTrace Plagiarism & Content Authenticity Report
--------------------------------------------------
Title            : ${report.title || "Scan"}
Report ID        : ${report._id}
Date             : ${new Date(report.createdAt).toLocaleString()}
Plagiarism Score : ${report.plagiarismScore || 0}%
AI Score         : ${report.aiScore || 0}%
Risk Level       : ${report.risk || "LOW"}
Sources Detected : ${report.matches?.length || 0}
Total Words      : ${report.stats?.inputWords || (report.text ? report.text.split(/\s+/).length : 0)}
Matched Words    : ${report.stats?.matchedWords || 0}
`;
    await navigator.clipboard.writeText(summary);
    toast.success("Report summary copied to clipboard.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090F] p-8 md:p-12 text-white">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-10 bg-[#151523] rounded-2xl w-48 animate-pulse"></div>
          <div className="grid md:grid-cols-4 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#09090F] text-white flex items-center justify-center p-6">
        <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-10 text-center max-w-md w-full">
          <h1 className="text-3xl font-black text-red-400 mb-4">Report Not Found</h1>
          <p className="text-gray-400 text-sm mb-8">
            The requested scan report could not be found or has been removed.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-bold transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const riskStr = String(report.risk || "LOW").toUpperCase();
  const riskColor = riskStr.includes("HIGH")
    ? "text-red-400"
    : riskStr.includes("MEDIUM")
    ? "text-yellow-400"
    : "text-green-400";

  const plagScore = Number(report.plagiarismScore || 0);
  const aiScore = Number(report.aiScore || 0);
  const matches = Array.isArray(report.matches) ? report.matches : [];
  const matchedSentences = Array.isArray(report.matchedSentences) ? report.matchedSentences : [];

  return (
    <div className="min-h-screen bg-[#09090F] text-white px-6 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <DashboardNavbar />

        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#151523] border border-[#2D2D44] hover:border-cyan-400 transition text-sm text-gray-300 hover:text-white"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={copyReportSummary}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#151523] border border-[#2D2D44] hover:border-cyan-400 transition text-sm font-semibold"
            >
              <FaCopy /> Copy Summary
            </button>
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition text-sm font-bold shadow-lg shadow-cyan-500/20"
            >
              <FaDownload /> Download PDF
            </button>
          </div>
        </div>

        {/* Report Title */}
        <div className="mb-10">
          <span className="inline-block text-xs uppercase font-bold tracking-wider px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3">
            Analysis Report
          </span>
          <h1 className="text-3xl md:text-5xl font-black break-words leading-tight">
            {report.title || "Scan Details"}
          </h1>
          <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
            <FaCalendarAlt className="text-cyan-400" />
            Scanned on {new Date(report.createdAt).toLocaleString()} • Report ID:{" "}
            <span className="font-mono text-gray-300 text-xs">{report._id}</span>
          </p>
        </div>

        {/* 4 Score Metric Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6">
            <div className="flex justify-between items-center text-gray-400 text-sm">
              <span>Plagiarism Score</span>
              <FaFileAlt className="text-red-400" />
            </div>
            <h2 className="text-4xl font-black mt-3 text-red-400">{plagScore}%</h2>
            <p className="text-xs text-gray-400 mt-2">
              {plagScore >= 50 ? "High Overlap Detected" : plagScore >= 20 ? "Moderate Similarity" : "Original Content"}
            </p>
          </div>

          <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6">
            <div className="flex justify-between items-center text-gray-400 text-sm">
              <span>AI Probability</span>
              <FaRobot className="text-purple-400" />
            </div>
            <h2 className="text-4xl font-black mt-3 text-purple-400">{aiScore}%</h2>
            <p className="text-xs text-gray-400 mt-2">
              {aiScore >= 60 ? "Likely AI-Generated" : aiScore >= 30 ? "Mixed / Paraphrased" : "Human Written"}
            </p>
          </div>

          <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6">
            <div className="flex justify-between items-center text-gray-400 text-sm">
              <span>Risk Assessment</span>
              <FaShieldAlt className={riskColor} />
            </div>
            <h2 className={`text-4xl font-black mt-3 ${riskColor}`}>{riskStr}</h2>
            <p className="text-xs text-gray-400 mt-2">Combined integrity rating</p>
          </div>

          <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6">
            <div className="flex justify-between items-center text-gray-400 text-sm">
              <span>Sources Detected</span>
              <FaLink className="text-cyan-400" />
            </div>
            <h2 className="text-4xl font-black mt-3 text-cyan-400">{matches.length}</h2>
            <p className="text-xs text-gray-400 mt-2">
              {matchedSentences.length} overlapping passages
            </p>
          </div>
        </div>

        {/* Breakdown Row if analysis present */}
        {report.analysis && (
          <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 md:p-8 mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">
              <FaLayerGroup className="text-cyan-400" />
              Multi-Signal Similarity Breakdown
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4.5">
                <p className="text-gray-400 text-xs">Exact Character Match</p>
                <h3 className="text-2xl font-bold mt-1 text-red-400">{report.analysis.exactMatch || 0}%</h3>
                <p className="text-[11px] text-gray-500 mt-1">Verbatim copying</p>
              </div>
              <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4.5">
                <p className="text-gray-400 text-xs">Near-Exact / Shingles</p>
                <h3 className="text-2xl font-bold mt-1 text-yellow-400">{report.analysis.nearExactMatch || 0}%</h3>
                <p className="text-[11px] text-gray-500 mt-1">Minor edits & word substitutions</p>
              </div>
              <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4.5">
                <p className="text-gray-400 text-xs">Semantic Similarity</p>
                <h3 className="text-2xl font-bold mt-1 text-purple-400">{report.analysis.semanticSimilarity || 0}%</h3>
                <p className="text-[11px] text-gray-500 mt-1">Concept alignment</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid: Content & Evidence */}
        <div className="grid xl:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Original Scanned Text */}
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-white">Scanned Document Content</h2>
                <span className="text-xs text-gray-400">
                  {report.text ? report.text.split(/\s+/).filter(Boolean).length : 0} words
                </span>
              </div>
              <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-5 md:p-6 max-h-[450px] overflow-y-auto">
                <p className="whitespace-pre-wrap leading-relaxed font-mono text-sm text-gray-200">
                  {report.text || "No text content recorded for this report."}
                </p>
              </div>
            </div>

            {/* Overlapping Passages Evidence */}
            {matchedSentences.length > 0 && (
              <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-5">
                  Overlapping Passages & Evidence ({matchedSentences.length})
                </h2>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {matchedSentences.map((match, idx) => (
                    <div
                      key={idx}
                      className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-4.5 text-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                          {match.matchType || "Matched"}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400">
                          {match.score}% Similarity
                        </span>
                      </div>
                      <p className="text-gray-200 font-mono text-xs md:text-sm leading-relaxed">
                        "{match.sentence}"
                      </p>
                      {match.sourceTitle && (
                        <p className="text-xs text-cyan-400 mt-2 truncate">
                          Source: {match.sourceTitle}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Matched Sources List */}
          <div className="space-y-8">
            <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaLink className="text-cyan-400" />
                  Matching Sources
                </h2>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold">
                  {matches.length}
                </span>
              </div>

              {matches.length === 0 ? (
                <div className="bg-[#10101A] border border-[#2D2D44] rounded-2xl p-6 text-center text-gray-400 text-sm">
                  No overlapping sources were detected online.
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
                  {matches.map((source, index) => (
                    <div
                      key={index}
                      className="bg-[#10101A] border border-[#2D2D44] hover:border-cyan-400 rounded-2xl p-4 transition"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <a
                            href={source.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 font-semibold text-sm hover:underline block truncate"
                          >
                            {source.title || source.domain || source.link}
                          </a>
                          <span className="text-xs text-gray-500 mt-0.5 block truncate">
                            {source.domain || source.link}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-base font-bold text-white block">
                            {source.score}%
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase">
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
        </div>

        {/* Footer */}
        <footer className="border-t border-[#2D2D44] pt-8 text-center text-gray-500 text-xs">
          ZeroTrace AI Engine • Plagiarism Detection & Authenticity Report
        </footer>
      </div>
    </div>
  );
};

export default ReportDetails;

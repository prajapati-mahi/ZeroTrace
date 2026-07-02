import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

import {
  FaArrowLeft,
  FaDownload,
  FaRobot,
  FaShieldAlt,
  FaFileAlt,
} from "react-icons/fa";
import MatchedSources from "../components/MatchedSources";

const ReportDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [report, setReport] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res =
        await axios.get(
          `http://localhost:5000/api/report/${id}`
        );

      setReport(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex justify-center items-center text-white text-2xl">
        Loading Report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex justify-center items-center text-red-500 text-2xl">
        Report Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="
          flex
          items-center
          gap-3
          px-5
          py-3
          rounded-xl
          bg-[#1a1a2e]
          hover:bg-[#242438]
          transition
          "
        >
          <FaArrowLeft />

          Dashboard
        </button>

        <button
          onClick={() =>
            window.open(
              `http://localhost:5000/api/report/pdf/${id}`
            )
          }
          className="
          flex
          items-center
          gap-3
          px-6
          py-3
          rounded-xl
          bg-gradient-to-r
          from-[#6c63ff]
          to-[#00d4ff]
          font-semibold
          shadow-lg
          hover:scale-105
          transition
          "
        >
          <FaDownload />

          Download PDF
        </button>

      </div>

      {/* Heading */}

      <div className="mb-12">

        <h1
          className="
          text-5xl
          font-black
          bg-gradient-to-r
          from-[#6c63ff]
          to-[#00d4ff]
          bg-clip-text
          text-transparent
          "
        >
          Report Details
        </h1>
        <MatchedSources
  matches={report.matches}
/>

        <p className="text-[#a8a8b8] mt-2">
          Complete analysis of your plagiarism report
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-[#2a2a3e]">

          <FaFileAlt
            className="text-4xl text-cyan-400 mb-4"
          />

          <h2 className="text-[#a8a8b8]">
            Plagiarism Score
          </h2>


          <h1 className="text-5xl font-bold mt-3">
            {report.plagiarismScore}%
          </h1>

        </div>

        <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-[#2a2a3e]">

          <FaRobot
            className="text-4xl text-purple-400 mb-4"
          />

          <h2 className="text-[#a8a8b8]">
            AI Score
          </h2>

          <h1 className="text-5xl font-bold mt-3">
            {report.aiScore}%
          </h1>

        </div>

        <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-[#2a2a3e]">

          <FaShieldAlt
            className="text-4xl text-green-400 mb-4"
          />

          <h2 className="text-[#a8a8b8]">
            Risk Level
          </h2>

          <h1 className="text-4xl font-bold mt-3">
            {report.risk}
          </h1>

        </div>

      </div>

      {/* Main Section */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-[#2a2a3e]">

          <h2 className="text-2xl font-bold mb-6 text-cyan-400">
            Report Information
          </h2>

          <div className="space-y-5">

            <div>

              <h3 className="text-[#a8a8b8]">
                Title
              </h3>

              <p className="mt-2">
                {report.title}
              </p>

            </div>

            <div>

              <h3 className="text-[#a8a8b8]">
                Created At
              </h3>

              <p className="mt-2">
                {new Date(
                  report.createdAt
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

        <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-[#2a2a3e]">

          <h2 className="text-2xl font-bold mb-6 text-cyan-400">
            Original Text
          </h2>

          <p className="leading-8 text-[#d8d8d8]">
            {report.text}
          </p>

        </div>

      </div>

    </div>
  );
};

export default ReportDetails;
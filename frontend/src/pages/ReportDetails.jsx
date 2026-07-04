import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

import {
  FaArrowLeft,
  FaDownload,
} from "react-icons/fa";

import ScoreCards from "../components/ScoreCards";
import ReportInformation from "../components/ReportInformation";
import ReportOverview from "../components/ReportOverview";
import MatchedSources from "../components/MatchedSources";
import AnalyticsCharts from "../components/AnalyticsCharts";
import Interpretation from "../components/Interpretation";
import SimilarityInsights from "../components/SimilarityInsights";

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

      <div
        className="
        min-h-screen
        bg-[#0a0a0f]
        flex
        justify-center
        items-center
        text-white
        text-2xl
        "
      >
        Loading Report...
      </div>

    );

  }

  if (!report) {

    return (

      <div
        className="
        min-h-screen
        bg-[#0a0a0f]
        flex
        justify-center
        items-center
        text-red-500
        text-2xl
        "
      >
        Report Not Found
      </div>

    );

  }

  return (

    <div
      className="
      min-h-screen
      bg-[#0a0a0f]
      text-white
      p-10
      relative
      overflow-hidden
      "
    >

      {/* Background Glow */}

      <div
        className="
        absolute
        -top-32
        -left-32
        w-96
        h-96
        bg-[#6c63ff]
        opacity-20
        blur-[150px]
        rounded-full
        "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-96
        h-96
        bg-cyan-500
        opacity-20
        blur-[150px]
        rounded-full
        "
      />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex justify-between items-center mb-12">

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
            border
            border-[#2a2a3e]
            hover:border-cyan-400
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
            shadow-xl
            hover:scale-105
            transition-all
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

          <p
            className="
            text-[#a8a8b8]
            mt-3
            text-lg
            "
          >
            AI-powered plagiarism analysis with detailed source matching.
          </p>

        </div>

        {/* Score Cards */}

        <ScoreCards
          report={report}
        />

        {/* Middle Section */}

        <div className="grid lg:grid-cols-2 gap-8">

          <ReportInformation
            report={report}
          />

          <div className="space-y-8">

            {/* Original Text */}

            <div
              className="
              bg-[#1a1a2e]
              border
              border-[#2a2a3e]
              rounded-3xl
              p-8
              shadow-xl
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                text-cyan-400
                mb-6
                "
              >
                Original Text
              </h2>

              <p
                className="
                text-[#d8d8d8]
                leading-8
                whitespace-pre-wrap
                "
              >
                {report.text}
              </p>

            </div>

            <ReportOverview
              report={report}
            />

          </div>

        </div>

        {/* Matched Sources */}

        <div className="mt-10">

          <MatchedSources
            matches={report.matches}
          />

        </div>
        <div className="mt-10">

          <AnalyticsCharts
            report={report}
          />

      </div>

      <div className="mt-10">

  <SimilarityInsights
    report={report}
  />

</div>
      <div className="mt-10">

  <Interpretation
    report={report}
  />

</div>

      </div>

    </div>

  );

};

export default ReportDetails;
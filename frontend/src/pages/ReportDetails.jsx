import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaDownload,
} from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../services/api";

import SkeletonCard from "../components/SkeletonCard";

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

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchReport();

  }, []);

  const fetchReport = async () => {

    try {

      const { data } = await api.get(`/report/${id}`);

      setReport(data);

    } catch (error) {

      console.log(error);

      toast.error("Unable to load report.");

    } finally {

      setLoading(false);

    }

  };

  const downloadReport = () => {

    window.open(
      `http://localhost:5000/api/report/pdf/${id}`,
      "_blank"
    );

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-[#09090F] p-10">

        <div className="grid md:grid-cols-4 gap-6">

          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />

        </div>

      </div>

    );

  }

  if (!report) {

    return (

      <div className="min-h-screen bg-[#09090F] flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-red-500">
            Report Not Found
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="
              mt-8
              px-6
              py-3
              rounded-xl
              bg-cyan-500
              hover:bg-cyan-600
              transition
            "
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#09090F] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">

          <button
            onClick={() => navigate("/dashboard")}
            className="
              flex
              items-center
              gap-3
              px-6
              py-3
              rounded-xl
              bg-[#151523]
              border
              border-[#2D2D44]
              hover:border-cyan-400
              transition
            "
          >
            <FaArrowLeft />

            Dashboard

          </button>

          <button
            onClick={downloadReport}
            className="
              flex
              items-center
              gap-3
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-500
              hover:scale-105
              transition
            "
          >
            <FaDownload />

            Download PDF

          </button>

        </div>

        {/* Title */}

        <div className="mb-12">

          <h1 className="text-5xl font-black">
            Report Details
          </h1>

          <p className="text-gray-400 text-lg mt-4">

            Detailed plagiarism analysis with AI insights and source matching.

          </p>

        </div>

        {/* Score Cards */}
                <ScoreCards report={report} />

        {/* Main Content */}

        <div className="grid xl:grid-cols-3 gap-8 mt-10">

          {/* Left Side */}

          <div className="xl:col-span-2 space-y-8">

            {/* Original Text */}

            <div
              className="
                bg-[#151523]
                border
                border-[#2D2D44]
                rounded-3xl
                p-8
              "
            >

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">
                Original Content
              </h2>

              <div
                className="
                  bg-[#10101A]
                  border
                  border-[#2D2D44]
                  rounded-2xl
                  p-6
                  max-h-[500px]
                  overflow-y-auto
                "
              >

                <p
                  className="
                    whitespace-pre-wrap
                    leading-8
                    text-gray-300
                  "
                >
                  {report.text}
                </p>

              </div>

            </div>

            {/* Overview */}

            <ReportOverview report={report} />

            {/* Similarity Insights */}

            <SimilarityInsights report={report} />

            {/* Interpretation */}

            <Interpretation report={report} />

          </div>

          {/* Right Side */}

          <div className="space-y-8">

            <ReportInformation report={report} />

            <AnalyticsCharts report={report} />

          </div>

        </div>

        {/* Sources */}

        <div className="mt-12">

          <div
            className="
              bg-[#151523]
              border
              border-[#2D2D44]
              rounded-3xl
              p-8
            "
          >

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-bold">
                  Matched Sources
                </h2>

                <p className="text-gray-400 mt-2">

                  Sources detected during plagiarism analysis.

                </p>

              </div>

              <div
                className="
                  bg-cyan-500/10
                  text-cyan-400
                  px-5
                  py-2
                  rounded-full
                  font-semibold
                "
              >
                {report.matches?.length || 0} Sources
              </div>

            </div>

            <MatchedSources
              matches={report.matches}
            />

          </div>

        </div>

        {/* Footer continues in Part 3 */}
                {/* Footer */}

        <footer
          className="
            mt-16
            border-t
            border-[#2D2D44]
            pt-8
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
          "
        >

          <div>

            <h3 className="text-xl font-bold">
              ZeroTrace
            </h3>

            <p className="text-gray-400 mt-2">
              AI-Powered Plagiarism Detection & Report Analysis
            </p>

          </div>

          <div className="text-right">

            <p className="text-gray-500">
              Generated using ZeroTrace AI Engine
            </p>

            <p className="text-gray-500 mt-1">
              © 2026 ZeroTrace. All rights reserved.
            </p>

          </div>

        </footer>

      </div>

    </div>

  );

};

export default ReportDetails;


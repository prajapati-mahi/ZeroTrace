import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SkeletonCard from "../components/SkeletonCard";
import api from "../services/api";

const History = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await api.get("/history");

      setReports(res.data.reports || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to fetch reports."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/report/${id}`);

      setReports((prev) =>
        prev.filter((report) => report._id !== id)
      );

      toast.success("Report deleted successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const title = (report.title || "").toLowerCase();

      const risk = (report.risk || "").toUpperCase();

      const matchesSearch =
        title.includes(search.toLowerCase());

      const matchesRisk =
        riskFilter === "ALL"
          ? true
          : risk.includes(riskFilter);

      return matchesSearch && matchesRisk;
    });
  }, [reports, search, riskFilter]);

  /*
      Statistics
      ------------------------------
      This completely replaces the
      undefined "stats" object that
      was crashing your page.
  */

  const stats = useMemo(() => {
    if (!reports.length) {
      return {
        totalReports: 0,
        averageSimilarity: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
      };
    }

    const totalReports = reports.length;

    const averageSimilarity =
      Math.round(
        reports.reduce(
          (sum, report) =>
            sum +
            Number(report.plagiarismScore || 0),
          0
        ) / totalReports
      );

    const highRisk = reports.filter((report) =>
      (report.risk || "")
        .toUpperCase()
        .includes("HIGH")
    ).length;

    const mediumRisk = reports.filter((report) =>
      (report.risk || "")
        .toUpperCase()
        .includes("MEDIUM")
    ).length;

    const lowRisk = reports.filter((report) =>
      (report.risk || "")
        .toUpperCase()
        .includes("LOW")
    ).length;

    return {
      totalReports,
      averageSimilarity,
      highRisk,
      mediumRisk,
      lowRisk,
    };
  }, [reports]);

  /*
      Loading Screen
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090F] px-10 py-10">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10">
            <div className="h-12 w-72 rounded-xl bg-[#181825] animate-pulse"></div>

            <div className="h-5 w-96 rounded-lg bg-[#181825] mt-5 animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-10">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090F] text-white px-10 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8 mb-12">

          <div>

            <h1 className="text-5xl font-black">
              Report History
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              View, manage and download all your plagiarism reports.
            </p>

          </div>

          <Link
            to="/dashboard"
            className="
              px-6
              py-3
              rounded-xl
              bg-cyan-500
              hover:bg-cyan-600
              transition
              font-semibold
            "
          >
            Dashboard
          </Link>

        </div>

        {/* Search + Filter */}

        <div className="flex flex-col md:flex-row gap-5 mb-10">

          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              flex-1
              bg-[#151523]
              border
              border-[#2D2D44]
              rounded-xl
              px-5
              py-4
              outline-none
              focus:border-cyan-400
            "
          />

          <select
            value={riskFilter}
            onChange={(e) =>
              setRiskFilter(e.target.value)
            }
            className="
              bg-[#151523]
              border
              border-[#2D2D44]
              rounded-xl
              px-5
              py-4
              outline-none
              focus:border-cyan-400
            "
          >
            <option value="ALL">
              All Risks
            </option>

            <option value="LOW">
              Low
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HIGH">
              High
            </option>
          </select>

        </div>

        {/* Statistics Cards start here in Part 2 */}
                {/* Statistics Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

          <div
            className="
              bg-[#151523]
              border
              border-[#2D2D44]
              rounded-3xl
              p-7
              hover:border-cyan-400
              transition-all
              duration-300
            "
          >
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              Total Reports
            </p>

            <h2 className="text-4xl font-black mt-3 text-cyan-400">
              {stats.totalReports}
            </h2>
          </div>

          <div
            className="
              bg-[#151523]
              border
              border-[#2D2D44]
              rounded-3xl
              p-7
              hover:border-purple-400
              transition-all
              duration-300
            "
          >
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              Average Similarity
            </p>

            <h2 className="text-4xl font-black mt-3 text-purple-400">
              {stats.averageSimilarity}%
            </h2>
          </div>

          <div
            className="
              bg-[#151523]
              border
              border-[#2D2D44]
              rounded-3xl
              p-7
              hover:border-red-400
              transition-all
              duration-300
            "
          >
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              High Risk
            </p>

            <h2 className="text-4xl font-black mt-3 text-red-400">
              {stats.highRisk}
            </h2>
          </div>

          <div
            className="
              bg-[#151523]
              border
              border-[#2D2D44]
              rounded-3xl
              p-7
              hover:border-green-400
              transition-all
              duration-300
            "
          >
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              Low Risk
            </p>

            <h2 className="text-4xl font-black mt-3 text-green-400">
              {stats.lowRisk}
            </h2>
          </div>

        </div>

        {/* Reports */}

        {filteredReports.length === 0 ? (

          <div
            className="
              bg-[#151523]
              border
              border-[#2D2D44]
              rounded-3xl
              p-20
              text-center
            "
          >
            <h2 className="text-3xl font-bold">
              No Reports Found
            </h2>

            <p className="text-gray-400 mt-4">
              Try changing your search or start a new plagiarism check.
            </p>
          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-8">

            {filteredReports.map((report) => {

              const risk = (report.risk || "").toUpperCase();

              const badgeClass = risk.includes("LOW")
                ? "bg-green-500/20 text-green-400"
                : risk.includes("MEDIUM")
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400";

              return (

                <div
                  key={report._id}
                  className="
                    bg-[#151523]
                    border
                    border-[#2D2D44]
                    rounded-3xl
                    p-8
                    hover:border-cyan-400
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >

                  <div className="flex justify-between items-start gap-5">

                    <div>

                      <h2 className="text-2xl font-bold break-words">
                        {report.title || "Untitled Report"}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        {new Date(
                          report.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        ${badgeClass}
                      `}
                    >
                      {report.risk}
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-8">

                    <div
                      className="
                        bg-[#10101A]
                        rounded-2xl
                        p-5
                      "
                    >
                      <p className="text-gray-400 text-sm">
                        Similarity
                      </p>

                      <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                        {report.plagiarismScore || 0}%
                      </h3>
                    </div>

                    <div
                      className="
                        bg-[#10101A]
                        rounded-2xl
                        p-5
                      "
                    >
                      <p className="text-gray-400 text-sm">
                        AI Score
                      </p>

                      <h3 className="text-3xl font-bold text-purple-400 mt-2">
                        {report.aiScore || 0}%
                      </h3>
                    </div>

                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">

                    <Link
                      to={`/report/${report._id}`}
                      className="
                        px-6
                        py-3
                        rounded-xl
                        bg-cyan-500
                        hover:bg-cyan-600
                        transition
                        font-semibold
                      "
                    >
                      View Report
                    </Link>

                    <a
                      href={`http://localhost:5000/api/report/pdf/${report._id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        px-6
                        py-3
                        rounded-xl
                        border
                        border-[#2D2D44]
                        hover:border-cyan-400
                        transition
                      "
                    >
                      Download PDF
                    </a>

                    <button
                      onClick={() =>
                        deleteReport(report._id)
                      }
                      className="
                        px-6
                        py-3
                        rounded-xl
                        bg-red-500
                        hover:bg-red-600
                        transition
                        font-semibold
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              );

            })}
                      </div>

        )}

      </div>

    </div>

  );

};

export default History;
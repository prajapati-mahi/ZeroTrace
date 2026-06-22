import { useEffect, useState } from "react";
import axios from "axios";

const RecentReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/history"
      );

      setReports(res.data.reports || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        text-3xl
        font-bold
        mb-8
        text-white
        "
      >
        Recent Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-[#a8a8b8]">
          No reports found.
        </p>
      ) : (
        reports.map((report, index) => (
          <div
            key={report._id}
            className="
            flex
            justify-between
            items-center
            py-5
            border-b
            border-[#2a2a3e]
            "
          >
            <div>
              <h3
                className="
                text-lg
                font-semibold
                text-white
                "
              >
                Report #{index + 1}
              </h3>

              <p
                className="
                text-sm
                text-[#a8a8b8]
                mt-1
                "
              >
                {new Date(
                  report.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <div className="text-right">

              <p
                className="
                text-cyan-400
                font-bold
                text-lg
                "
              >
                {report.score}%
              </p>

              <p
                className={`
                text-sm
                font-medium
                ${
                  report.risk.includes(
                    "LOW"
                  )
                    ? "text-green-400"
                    : report.risk.includes(
                        "MEDIUM"
                      )
                    ? "text-yellow-400"
                    : "text-red-400"
                }
                `}
              >
                {report.risk}
              </p>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentReports;
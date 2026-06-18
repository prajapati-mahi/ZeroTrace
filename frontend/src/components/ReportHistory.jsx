import { useEffect, useState } from "react";
import axios from "axios";

function ReportHistory() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/history"
      );

      setReports(response.data.reports);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

      <h2 className="text-3xl font-bold mb-6">
        Previous Reports
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Score
              </th>

              <th className="text-left py-3">
                Risk
              </th>

              <th className="text-left py-3">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report._id}
                className="border-b"
              >
                <td className="py-3">
                  {report.score}%
                </td>

                <td className="py-3">
                  {report.risk}
                </td>

                <td className="py-3">
                  {new Date(
                    report.createdAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ReportHistory;
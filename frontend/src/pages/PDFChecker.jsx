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
} from "react-icons/fa";

import ReportHistory from "../components/ReportHistory";
import MatchedContent from "../components/MatchedContent";

function PDFChecker() {
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);

  const [score, setScore] = useState(null);
  const [matches, setMatches] = useState([]);

  const [scanTime, setScanTime] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!pdf1 || !pdf2) {
      toast.warning("Please upload both PDF files.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("pdf1", pdf1);
      formData.append("pdf2", pdf2);

      const response = await api.post(
        "/pdf/compare",
        formData
      );

      setScore(response.data.similarityScore);

      setMatches(response.data.matches || []);

      setScanTime(
        new Date().toLocaleString()
      );

      toast.success("Comparison completed.");
    } catch (error) {
      console.log(error);

      toast.error(
        "Unable to compare PDFs."
      );
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = () => {
    if (score < 20)
      return {
        label: "LOW RISK",
        color: "#22c55e",
        message:
          "No significant plagiarism detected.",
      };

    if (score < 50)
      return {
        label: "MEDIUM RISK",
        color: "#eab308",
        message:
          "Moderate similarity detected.",
      };

    return {
      label: "HIGH RISK",
      color: "#ef4444",
      message:
        "Potential plagiarism detected.",
    };
  };

  const downloadReport = async () => {
    try {
      const risk = getRiskLevel();

      const response = await api.post(
        "/report/generate",
        {
          score,
          risk: risk.label,
        },
        {
          responseType: "blob",
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "ZeroTrace_Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.log(error);

      toast.error(
        "Unable to download report."
      );
    }
  };

  const risk =
    score !== null
      ? getRiskLevel()
      : null;

  return (
    <div className="min-h-screen bg-[#09090F] text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">

          <h1 className="text-5xl font-black">
            PDF Similarity Checker
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Compare two PDF documents using ZeroTrace AI.
          </p>

        </div>

        {/* Upload Cards */}

        <div className="grid md:grid-cols-2 gap-8 mb-10"></div>
                  {/* First PDF */}

          <label
            className="
              bg-[#151523]
              border-2
              border-dashed
              border-[#2D2D44]
              rounded-3xl
              p-10
              cursor-pointer
              hover:border-cyan-400
              transition-all
              duration-300
            "
          >
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) =>
                setPdf1(e.target.files[0])
              }
            />

            <div className="flex flex-col items-center text-center">

              <FaCloudUploadAlt
                className="text-cyan-400 mb-5"
                size={60}
              />

              <h2 className="text-2xl font-bold">
                Upload First PDF
              </h2>

              <p className="text-gray-400 mt-3">
                Click to browse or replace the file.
              </p>

              {pdf1 && (
                <div
                  className="
                    mt-6
                    bg-[#10101A]
                    border
                    border-cyan-500/40
                    rounded-xl
                    px-5
                    py-4
                    flex
                    items-center
                    gap-3
                  "
                >
                  <FaFilePdf className="text-red-400" />

                  <span className="break-all">
                    {pdf1.name}
                  </span>
                </div>
              )}

            </div>

          </label>

          {/* Second PDF */}

          <label
            className="
              bg-[#151523]
              border-2
              border-dashed
              border-[#2D2D44]
              rounded-3xl
              p-10
              cursor-pointer
              hover:border-cyan-400
              transition-all
              duration-300
            "
          >
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) =>
                setPdf2(e.target.files[0])
              }
            />

            <div className="flex flex-col items-center text-center">

              <FaCloudUploadAlt
                className="text-cyan-400 mb-5"
                size={60}
              />

              <h2 className="text-2xl font-bold">
                Upload Second PDF
              </h2>

              <p className="text-gray-400 mt-3">
                Select another document for comparison.
              </p>

              {pdf2 && (
                <div
                  className="
                    mt-6
                    bg-[#10101A]
                    border
                    border-cyan-500/40
                    rounded-xl
                    px-5
                    py-4
                    flex
                    items-center
                    gap-3
                  "
                >
                  <FaFilePdf className="text-red-400" />

                  <span className="break-all">
                    {pdf2.name}
                  </span>
                </div>
              )}

            </div>

          </label>

        </div>

        {/* Compare Button */}

        <div className="text-center mb-12">

          <button
            onClick={handleCompare}
            disabled={loading}
            className="
              bg-cyan-500
              hover:bg-cyan-600
              disabled:opacity-60
              disabled:cursor-not-allowed
              transition
              px-10
              py-4
              rounded-2xl
              text-lg
              font-bold
            "
          >
            {loading
              ? "Comparing PDFs..."
              : "Compare PDFs"}
          </button>

        </div>

        {score !== null && (

          <>

            {/* Result Cards */}

            <div className="grid lg:grid-cols-3 gap-8">

              <div
                className="
                  bg-[#151523]
                  rounded-3xl
                  border
                  border-[#2D2D44]
                  p-8
                  text-center
                "
              >

                <h2 className="text-xl font-bold mb-8">
                  Similarity Score
                </h2>

                <div className="w-40 h-40 mx-auto">

                  <CircularProgressbar
                    value={score}
                    text={`${score}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      trailColor: "#2D2D44",
                      pathColor: risk.color,
                    })}
                  />

                </div>

              </div>

              <div
                className="
                  bg-[#151523]
                  rounded-3xl
                  border
                  border-[#2D2D44]
                  p-8
                "
              >

                <h2 className="text-xl font-bold">
                  Risk Level
                </h2>

                <h1
                  className="text-5xl font-black mt-8"
                  style={{
                    color: risk.color,
                  }}
                >
                  {risk.label}
                </h1>

                <p className="text-gray-400 mt-6 leading-7">
                  {risk.message}
                </p>

              </div>

              <div
                className="
                  bg-[#151523]
                  rounded-3xl
                  border
                  border-[#2D2D44]
                  p-8
                "
              >

                <h2 className="text-xl font-bold mb-5">
                  Scan Information
                </h2>

                <div className="space-y-5 text-gray-300">

                  <p>
                    <strong>PDF 1:</strong><br />
                    {pdf1?.name}
                  </p>

                  <p>
                    <strong>PDF 2:</strong><br />
                    {pdf2?.name}
                  </p>

                  <p>
                    <strong>Scanned:</strong><br />
                    {scanTime}
                  </p>

                </div>

              </div>

            </div>

            {/* Remaining result sections continue in Part 3 */}
                        {/* AI Summary */}

            <div
              className="
                bg-[#151523]
                rounded-3xl
                border
                border-[#2D2D44]
                p-8
                mt-8
              "
            >

              <h2 className="text-2xl font-bold mb-5">
                AI Analysis Summary
              </h2>

              <p className="text-gray-300 leading-8">

                {score < 20 &&
                  "The uploaded PDFs show very little similarity. The documents appear to be largely original with no major plagiarism concerns."}

                {score >= 20 &&
                  score < 50 &&
                  "The uploaded PDFs contain a moderate amount of overlapping content. A manual review is recommended to determine whether the similarities are acceptable."}

                {score >= 50 &&
                  "The uploaded PDFs contain a high amount of similar content. This may indicate plagiarism and should be reviewed carefully before submission."}

              </p>

            </div>

            {/* Matching Content */}

            <div
              className="
                bg-[#151523]
                rounded-3xl
                border
                border-[#2D2D44]
                p-8
                mt-8
              "
            >

              <h2 className="text-2xl font-bold mb-6">
                Matching Content
              </h2>

              {matches.length === 0 ? (

                <div
                  className="
                    bg-[#10101A]
                    rounded-2xl
                    p-6
                    text-gray-400
                  "
                >
                  No exact matching sentences were found.
                </div>

              ) : (

                <>
                  <MatchedContent matches={matches} />

                  <div className="space-y-4 mt-8">

                    {matches.map((match, index) => (

                      <div
                        key={index}
                        className="
                          bg-red-500/10
                          border
                          border-red-500/30
                          rounded-2xl
                          p-5
                        "
                      >
                        {match}
                      </div>

                    ))}

                  </div>

                </>

              )}

            </div>

            {/* Actions */}

            <div className="mt-10 flex flex-col items-center gap-6">

              <button
                onClick={downloadReport}
                className="
                  bg-cyan-500
                  hover:bg-cyan-600
                  transition
                  px-10
                  py-4
                  rounded-2xl
                  font-bold
                  text-lg
                "
              >
                Download PDF Report
              </button>

              <ReportHistory />

            </div>

          </>

        )}

        <footer className="text-center mt-20 text-gray-500 pb-6">
          Powered by <span className="text-cyan-400 font-semibold">ZeroTrace</span>
        </footer>

      </div>

  );

}

export default PDFChecker;
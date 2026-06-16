import { useState } from "react";
import axios from "axios";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function PDFChecker() {
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);

  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const [scanTime, setScanTime] = useState("");

  const handleCompare = async () => {
    if (!pdf1 || !pdf2) {
      alert("Please upload both PDFs");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("pdf1", pdf1);
      formData.append("pdf2", pdf2);

      const response = await axios.post(
        "http://localhost:5000/api/pdf/compare",
        formData
      );

      setScore(response.data.similarityScore);

      setScanTime(
        new Date().toLocaleString()
      );

    } catch (error) {
      console.log(error);
      alert("Error comparing PDFs");
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = () => {
    if (score < 20) {
      return {
        label: "LOW RISK",
        color: "text-green-600",
        message:
          "No significant plagiarism detected",
      };
    }

    if (score < 50) {
      return {
        label: "MEDIUM RISK",
        color: "text-yellow-600",
        message:
          "Some similar content detected",
      };
    }

    return {
      label: "HIGH RISK",
      color: "text-red-600",
      message:
        "Potential plagiarism detected",
    };
  };

  const risk = score !== null
    ? getRiskLevel()
    : null;

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <h1 className="text-5xl font-bold text-center mb-3">
          ZeroTrace PDF Checker
        </h1>

        <p className="text-center text-gray-500 mb-12">
          AI-Powered PDF Similarity Analysis
        </p>

        {/* Upload Section */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

          <div className="mb-8">
            <h2 className="font-semibold text-xl mb-3">
              Upload First PDF
            </h2>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setPdf1(e.target.files[0])
              }
            />

            {pdf1 && (
              <p className="mt-2 text-gray-500">
                {pdf1.name}
              </p>
            )}
          </div>

          <div className="mb-8">
            <h2 className="font-semibold text-xl mb-3">
              Upload Second PDF
            </h2>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setPdf2(e.target.files[0])
              }
            />

            {pdf2 && (
              <p className="mt-2 text-gray-500">
                {pdf2.name}
              </p>
            )}
          </div>

          <button
            onClick={handleCompare}
            disabled={loading}
            className="bg-black text-white px-8 py-3 rounded-xl hover:opacity-90"
          >
            {loading
              ? "Comparing..."
              : "Compare PDFs"}
          </button>
        </div>

        {/* Results */}

        {score !== null && (

          <>
            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-3xl font-bold mb-8">
                Analysis Result
              </h2>

              <div className="grid md:grid-cols-3 gap-6">

                {/* Score */}

                <div className="bg-gray-100 rounded-2xl p-6">

                  <h3 className="font-semibold mb-4">
                    Similarity Score
                  </h3>

                  <div className="w-32 h-32 mx-auto">

                    <CircularProgressbar
                      value={score}
                      text={`${score}%`}
                      styles={buildStyles({
                        textSize: "16px",

                        pathColor:
                          score < 20
                            ? "#16a34a"
                            : score < 50
                            ? "#ca8a04"
                            : "#dc2626",

                        textColor: "#111827",
                        trailColor: "#e5e7eb",
                      })}
                    />

                  </div>

                </div>

                {/* Risk */}

                <div className="bg-gray-100 rounded-2xl p-6">

                  <h3 className="font-semibold mb-4">
                    Risk Level
                  </h3>

                  <h2
                    className={`text-4xl font-bold ${risk.color}`}
                  >
                    {risk.label}
                  </h2>

                </div>

                {/* Status */}

                <div className="bg-gray-100 rounded-2xl p-6">

                  <h3 className="font-semibold mb-4">
                    Status
                  </h3>

                  <p className="text-lg">
                    {risk.message}
                  </p>

                </div>

              </div>

            </div>

            {/* Scan Info */}

            <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

              <h2 className="text-2xl font-bold mb-5">
                Scan Information
              </h2>

              <div className="space-y-3">

                <p>
                  <strong>File 1:</strong>{" "}
                  {pdf1?.name}
                </p>

                <p>
                  <strong>File 2:</strong>{" "}
                  {pdf2?.name}
                </p>

                <p>
                  <strong>Scanned At:</strong>{" "}
                  {scanTime}
                </p>

              </div>

            </div>

            {/* AI Summary */}

            <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

              <h2 className="text-2xl font-bold mb-5">
                AI Analysis Summary
              </h2>

              <p className="text-gray-700 leading-8">

                {score < 20 &&
                  "The uploaded PDFs show very low similarity and appear largely original."}

                {score >= 20 &&
                  score < 50 &&
                  "The uploaded PDFs contain moderate overlap and should be reviewed manually."}

                {score >= 50 &&
                  "The uploaded PDFs contain significant overlap and may indicate plagiarism."}

              </p>

            </div>

          </>
        )}

        {/* Footer */}

        <footer className="text-center py-10 text-gray-500">
          Powered by ZeroTrace
        </footer>

      </div>

    </div>
  );
}

export default PDFChecker;
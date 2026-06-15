import { useState } from "react";
import axios from "axios";

function Checker() {
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

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
      console.log(JSON.stringify(response.data, null, 2));
      setScore(response.data.similarityScore);
    } catch (error) {
      console.log(error);

      alert("Error comparing PDFs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        ZeroTrace PDF Checker
      </h1>

      <div className="mb-4">

        <label>
          Upload First PDF
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setPdf1(e.target.files[0])
          }
          className="block mt-2"
        />

      </div>

      <div className="mb-6">

        <label>
          Upload Second PDF
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setPdf2(e.target.files[0])
          }
          className="block mt-2"
        />

      </div>

      <button
        onClick={handleCompare}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading
          ? "Comparing..."
          : "Compare PDFs"}
      </button>

      {score !== null && (
        <h2 className="text-2xl mt-8">
          Similarity Score: {score}%
        </h2>
      )}

    </div>
  );
}

export default Checker;
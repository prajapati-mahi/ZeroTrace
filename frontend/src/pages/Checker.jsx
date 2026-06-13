import { useState } from "react";
import axios from "axios";

function Checker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/plagiarism/check",
        {
          text1,
          text2,
        }
      );

      setScore(response.data.score);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        ZeroTrace Checker
      </h1>

      <textarea
        placeholder="Original Text"
        value={text1}
        onChange={(e) => setText1(e.target.value)}
        className="border w-full h-40 p-4 mb-4"
      />

      <textarea
        placeholder="Suspicious Text"
        value={text2}
        onChange={(e) => setText2(e.target.value)}
        className="border w-full h-40 p-4 mb-4"
      />

      <button
        onClick={handleCheck}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading ? "Checking..." : "Check Plagiarism"}
      </button>

      {score !== null && (
        <h2 className="text-2xl mt-6">
          Similarity Score: {score}%
        </h2>
      )}
    </div>
  );
}

export default Checker;
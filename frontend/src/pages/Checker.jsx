import { useState } from "react";

function Checker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
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

      <button className="border px-6 py-3 rounded">
        Check Plagiarism
      </button>
    </div>
  );
}

export default Checker;
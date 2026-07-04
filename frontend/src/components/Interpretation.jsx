const Interpretation = ({ report }) => {

  let title = "";
  let message = "";
  let color = "";

  if (
    report.plagiarismScore < 20 &&
    report.aiScore < 20
  ) {

    title = "Excellent Originality";

    color = "text-green-400";

    message =
      "This document appears to be highly original with very little similarity to existing online sources. The AI-generated content percentage is also minimal, indicating that the content is primarily human-written.";

  }

  else if (
    report.plagiarismScore < 50
  ) {

    title = "Moderate Similarity";

    color = "text-yellow-400";

    message =
      "The document contains a moderate amount of similarity with publicly available sources. Although this may include common phrases or properly cited references, a manual review is recommended to ensure originality.";

  }

  else {

    title = "High Similarity Detected";

    color = "text-red-400";

    message =
      "The document contains a high level of similarity with online sources. While the AI-generated content percentage remains relatively low, the plagiarism score indicates substantial overlap. Reviewing the highlighted sources before submission is strongly recommended.";

  }

  return (

    <div
      className="
      bg-[#1a1a2e]
      rounded-3xl
      p-8
      border
      border-[#2a2a3e]
      shadow-xl
      "
    >

      <h2
        className="
        text-3xl
        font-bold
        text-cyan-400
        mb-6
        "
      >
        AI Interpretation
      </h2>

      <h3
        className={`
        text-2xl
        font-bold
        mb-4
        ${color}
        `}
      >
        {title}
      </h3>

      <p
        className="
        text-[#d8d8d8]
        leading-8
        text-lg
        "
      >
        {message}
      </p>

    </div>

  );

};

export default Interpretation;
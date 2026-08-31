const Interpretation = ({ report }) => {

  let title = "";
  let color = "";
  let message = "";
  let recommendation = "";

  // =============================
  // CASE 1
  // =============================

  if (
    report.plagiarismScore <= 15 &&
    report.aiScore <= 15
  ) {

    title = "Excellent Originality";

    color = "text-green-400";

    message =
      "The submitted document appears to be highly original. Both plagiarism and AI-generated content percentages are very low, indicating authentic human-written content.";

    recommendation =
      "No significant concerns detected. The document is suitable for academic or professional submission.";

  }

  // =============================
  // CASE 2
  // =============================

  else if (
    report.plagiarismScore <= 35
  ) {

    title = "Mostly Original";

    color = "text-lime-400";

    message =
      "A small amount of similarity was detected. This usually happens because of commonly used phrases, references or properly cited material.";

    recommendation =
      "Perform one final review to ensure all references are correctly cited.";

  }

  // =============================
  // CASE 3
  // =============================

  else if (
    report.plagiarismScore <= 60
  ) {

    title = "Moderate Similarity";

    color = "text-yellow-400";

    message =
      "The document contains noticeable overlap with online content. Although this does not always indicate plagiarism, portions of the document should be reviewed carefully.";

    recommendation =
      "Consider paraphrasing highly similar sections before submission.";

  }

  // =============================
  // CASE 4
  // =============================

  else {

    title = "High Similarity Detected";

    color = "text-red-400";

    message =
      "A significant percentage of the document matches existing online sources. While the AI score remains acceptable, the similarity level suggests that originality may be compromised.";

    recommendation =
      "Rewrite or paraphrase the highlighted sections and verify all citations before submitting the document.";

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
        mb-8
        "
      >
        AI Interpretation
      </h2>

      <h3
        className={`
        text-3xl
        font-bold
        mb-6
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

      <div
        className="
        mt-8
        rounded-2xl
        bg-[#0f172a]
        border
        border-cyan-500/20
        p-6
        "
      >

        <h4
          className="
          text-cyan-400
          font-bold
          text-xl
          mb-3
          "
        >
          Recommendation
        </h4>

        <p
          className="
          text-[#cfcfcf]
          leading-7
          "
        >
          {recommendation}
        </p>

      </div>

    </div>

  );

};

export default Interpretation;
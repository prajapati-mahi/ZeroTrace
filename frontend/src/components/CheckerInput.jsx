const CheckerInput = ({ text, setText }) => {
  const words =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  const characters = text.length;

  const readingTime = Math.max(
    1,
    Math.ceil(words / 200)
  );

  return (
    <div
      className="
      bg-[#151523]
      border
      border-[#2D2D44]
      rounded-3xl
      p-8
      "
    >
      <h2 className="text-3xl font-bold text-white">
        AI Text Checker
      </h2>

      <p className="text-gray-400 mt-2 mb-8">
        Paste your content below to detect plagiarism,
        AI-generated content and semantic similarity.
      </p>

      <textarea
        rows={16}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your content here..."
        className="
          w-full
          rounded-2xl
          bg-[#0B0B12]
          border
          border-[#2D2D44]
          p-6
          resize-none
          outline-none
          text-white
          focus:border-cyan-400
          transition
        "
      />

      <div className="flex justify-between mt-5 text-sm text-gray-400">
        <span>Characters: {characters}</span>

        <span>Words: {words}</span>

        <span>Reading Time: {readingTime} min</span>
      </div>
    </div>
  );
};

export default CheckerInput;
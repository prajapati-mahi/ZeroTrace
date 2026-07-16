import { FaSearch, FaPaste, FaTrash } from "react-icons/fa";

const CheckerActions = ({
  loading,
  handleAnalyze,
  setText,
}) => {
  const pasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setText(text);
    } catch {
      alert("Clipboard access denied.");
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-8">

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="
          flex
          items-center
          gap-3
          px-8
          py-4
          rounded-2xl
          font-semibold
          bg-gradient-to-r
          from-cyan-500
          to-purple-600
          hover:scale-105
          transition
          disabled:opacity-50
        "
      >
        <FaSearch />

        {loading
          ? "Analyzing..."
          : "Analyze"}
      </button>

      <button
        onClick={pasteClipboard}
        className="
          flex
          items-center
          gap-3
          px-7
          py-4
          rounded-2xl
          bg-[#151523]
          border
          border-[#2D2D44]
          hover:border-cyan-400
          transition
        "
      >
        <FaPaste />
        Paste
      </button>

      <button
        onClick={() => setText("")}
        className="
          flex
          items-center
          gap-3
          px-7
          py-4
          rounded-2xl
          bg-[#151523]
          border
          border-[#2D2D44]
          hover:border-red-500
          transition
        "
      >
        <FaTrash />
        Clear
      </button>

    </div>
  );
};

export default CheckerActions;
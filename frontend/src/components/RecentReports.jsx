const RecentReports = () => {
  const reports = [
    {
      title: "Machine Learning Article",
      score: "56%",
      ai: "30%",
    },
    {
      title: "AI Research Paper",
      score: "42%",
      ai: "18%",
    },
    {
      title: "Healthcare Essay",
      score: "12%",
      ai: "9%",
    },
  ];

  return (
    <div
      className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-2xl
      p-6
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        Recent Reports
      </h2>

      {reports.map((report, index) => (
        <div
          key={index}
          className="
          py-4
          border-b
          border-zinc-800
          "
        >
          <h3 className="font-semibold">
            {report.title}
          </h3>

          <p className="text-zinc-400">
            Similarity: {report.score}
          </p>

          <p className="text-zinc-400">
            AI Score: {report.ai}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecentReports;
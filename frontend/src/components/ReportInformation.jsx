const ReportInformation = ({ report }) => {
  return (
    <div
      className="
      bg-[#1a1a2e]
      border
      border-[#2a2a3e]
      rounded-3xl
      p-8
      shadow-xl
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-6
        text-cyan-400
        "
      >
        Report Information
      </h2>

      <div className="space-y-6">

        <div>
          <p className="text-[#a8a8b8]">
            Title
          </p>

          <p className="mt-2 break-words">
            {report.title}
          </p>
        </div>

        <div>
          <p className="text-[#a8a8b8]">
            Created At
          </p>

          <p className="mt-2">
            {new Date(
              report.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-[#a8a8b8]">
            Report ID
          </p>

          <p
            className="
            mt-2
            text-sm
            break-all
            text-[#d8d8d8]
            "
          >
            {report._id}
          </p>
        </div>

      </div>

    </div>
  );
};

export default ReportInformation;
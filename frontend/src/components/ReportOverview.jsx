import {
  FaFileAlt,
  FaRobot,
  FaShieldAlt,
  FaLink,
  FaFont,
  FaCalendarAlt,
} from "react-icons/fa";

const ReportOverview = ({ report }) => {

  const wordCount =
    report.text
      ? report.text.trim().split(/\s+/).length
      : 0;

  const characterCount =
    report.text
      ? report.text.length
      : 0;

  return (
    <div
      className="
      bg-[#1a1a2e]
      rounded-3xl
      border
      border-[#2a2a3e]
      p-8
      h-fit
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        text-cyan-400
        mb-8
        "
      >
        Report Overview
      </h2>

      <div className="space-y-6">

        <OverviewRow
          icon={<FaLink />}
          title="Matched Sources"
          value={report.matches.length}
        />

        <OverviewRow
          icon={<FaFileAlt />}
          title="Plagiarism"
          value={`${report.plagiarismScore}%`}
        />

        <OverviewRow
          icon={<FaRobot />}
          title="AI Score"
          value={`${report.aiScore}%`}
        />

        <OverviewRow
          icon={<FaShieldAlt />}
          title="Risk"
          value={report.risk}
        />

        <OverviewRow
          icon={<FaFont />}
          title="Words"
          value={wordCount}
        />

        <OverviewRow
          icon={<FaFont />}
          title="Characters"
          value={characterCount}
        />

        <OverviewRow
          icon={<FaCalendarAlt />}
          title="Generated"
          value={new Date(
            report.createdAt
          ).toLocaleDateString()}
        />

      </div>
    </div>
  );
};

const OverviewRow = ({
  icon,
  title,
  value,
}) => (
  <div className="flex justify-between items-center">

    <div className="flex items-center gap-3">

      <div className="text-cyan-400 text-lg">
        {icon}
      </div>

      <span className="text-[#a8a8b8]">
        {title}
      </span>

    </div>

    <span className="font-semibold">
      {value}
    </span>

  </div>
);

export default ReportOverview;
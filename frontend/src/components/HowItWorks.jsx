import {
  FaCloudUploadAlt,
  FaRobot,
  FaSearch,
  FaFilePdf,
} from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaCloudUploadAlt />,
    title: "Upload Document",
    description:
      "Upload PDF, DOCX or TXT files securely for instant AI analysis.",
  },
  {
    icon: <FaRobot />,
    title: "AI Semantic Analysis",
    description:
      "Advanced AI understands sentence meaning beyond simple keyword matching.",
  },
  {
    icon: <FaSearch />,
    title: "Detect Similarity",
    description:
      "Identify copied, paraphrased and AI-generated content with high precision.",
  },
  {
    icon: <FaFilePdf />,
    title: "Generate Report",
    description:
      "Download a professional plagiarism report with detailed AI insights.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how"
      className="py-28 bg-[#0B0B12]"
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}

        <div className="text-center mb-24">

          <span className="text-cyan-400 font-semibold uppercase tracking-[6px]">
            Workflow
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-white mt-5">
            How ZeroTrace Works
          </h2>

          <p className="text-gray-400 text-xl mt-6 max-w-3xl mx-auto leading-8">
            Detect plagiarism in four simple steps using AI-powered semantic
            analysis.
          </p>

        </div>

        {/* Steps */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 relative">

          {steps.map((step, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative text-center"
            >

              {/* Connector Line */}

              {index !== steps.length - 1 && (
                <div
                  className="
                    hidden
                    md:block
                    absolute
                    top-10
                    left-[58%]
                    w-full
                    h-[2px]
                    bg-gradient-to-r
                    from-cyan-500
                    to-purple-600
                    z-0
                  "
                />
              )}

              {/* Icon */}

              <div
                className="
                  relative
                  z-10
                  mx-auto
                  w-20
                  h-20
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-purple-600
                  flex
                  items-center
                  justify-center
                  text-3xl
                  text-white
                  shadow-[0_0_30px_rgba(34,211,238,0.35)]
                "
              >
                {step.icon}
              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-white mt-8">
                {step.title}
              </h3>

              {/* Description */}

              <p
                className="
                  mt-5
                  mx-auto
                  max-w-[250px]
                  text-gray-400
                  leading-8
                  text-lg
                "
              >
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
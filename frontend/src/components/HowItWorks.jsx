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
      "Advanced AI understands sentence meaning beyond simple keywords.",
  },
  {
    icon: <FaSearch />,
    title: "Detect Similarity",
    description:
      "Find copied, paraphrased and AI-generated content with precision.",
  },
  {
    icon: <FaFilePdf />,
    title: "Generate Report",
    description:
      "Download a clean plagiarism report with detailed similarity insights.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-28 bg-[#0B0B12]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-cyan-400 font-semibold uppercase tracking-widest">
            Workflow
          </span>

          <h2 className="text-5xl font-black mt-4 text-white">
            How ZeroTrace Works
          </h2>

          <p className="text-gray-400 text-xl mt-6 max-w-3xl mx-auto">
            Detect plagiarism in four simple steps using AI-powered semantic
            analysis.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              {/* Connecting Line */}
              {index !== steps.length - 1 && (
                <div
                  className="
                    hidden
                    md:block
                    absolute
                    top-10
                    left-[60%]
                    w-full
                    h-[2px]
                    bg-gradient-to-r
                    from-cyan-500
                    to-purple-600
                  "
                />
              )}

              {/* Icon */}
              <div
                className="
                  mx-auto
                  w-22
                  h-22
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-purple-600
                  flex
                  items-center
                  justify-center
                  text-3xl
                  text-white
                  shadow-xl
                  shadow-cyan-500/20
                "
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mt-7 text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="
                  mt-5
                  text-gray-400
                  leading-8
                  max-w-[260px]
                  mx-auto
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
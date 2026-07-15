import {
  FaRobot,
  FaFilePdf,
  FaSearch,
  FaShieldAlt,
  FaChartPie,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Content Detection",
    description:
      "Identify AI-generated text using advanced semantic analysis.",
  },
  {
    icon: <FaSearch />,
    title: "Plagiarism Detection",
    description:
      "Compare documents intelligently instead of simple keyword matching.",
  },
  {
    icon: <FaFilePdf />,
    title: "PDF Comparison",
    description:
      "Upload two PDFs and compare them with similarity highlighting.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Reports",
    description:
      "Your reports remain private with secure storage and authentication.",
  },
  {
    icon: <FaChartPie />,
    title: "Analytics Dashboard",
    description:
      "Track plagiarism history, AI scores and report statistics.",
  },
  {
    icon: <FaCloudUploadAlt />,
    title: "Professional Reports",
    description:
      "Generate downloadable plagiarism reports in seconds.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="bg-[#09090F] py-28"
    >
      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-cyan-400 font-semibold tracking-widest uppercase">
            Features
          </span>

          <h2 className="mt-4 text-5xl font-black">
            Everything You Need
          </h2>

          <p className="mt-6 text-gray-400 text-xl max-w-3xl mx-auto">
            ZeroTrace combines plagiarism detection,
            AI-content identification,
            PDF comparison,
            report generation,
            analytics,
            and secure storage
            in one modern platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="
              group
              bg-[#151523]
              border
              border-[#2D2D44]
              rounded-3xl
              p-8
              hover:border-cyan-500
              transition
              hover:-translate-y-2
              "
            >
              <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-purple-600
                flex
                items-center
                justify-center
                text-3xl
                text-white
                "
              >
                {feature.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-5 text-gray-400 leading-8">
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;
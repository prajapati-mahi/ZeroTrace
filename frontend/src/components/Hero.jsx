import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#09090F]">

      {/* Background Glow */}

      <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[180px]" />

      <div className="max-w-7xl mx-auto px-8 pt-36 pb-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <span
            className="
            inline-block
            px-5
            py-2
            rounded-full
            bg-cyan-500/10
            border
            border-cyan-500/30
            text-cyan-400
            font-semibold
            "
          >
            AI Powered Academic Integrity Platform
          </span>

          <h1 className="mt-8 text-6xl font-black leading-tight text-white">

            Detect

            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Plagiarism
            </span>

            <br />

            In Seconds.

          </h1>

          <p className="mt-8 text-xl text-gray-400 leading-9 max-w-xl">

            ZeroTrace combines AI-powered semantic analysis,
            plagiarism detection,
            PDF comparison,
            secure report generation,
            and intelligent document insights into one modern platform.

          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-6 mt-12">

            <Link
              to="/signup"
              className="
              px-8
              py-4
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              text-white
              font-semibold
              hover:scale-105
              transition
              "
            >
              Get Started Free
            </Link>

            <a
              href="#features"
              className="
              px-8
              py-4
              rounded-xl
              border
              border-cyan-500
              text-cyan-400
              font-semibold
              hover:bg-cyan-500
              hover:text-white
              transition
              "
            >
              Learn More
            </a>

          </div>

          {/* Feature Highlights */}

          <div className="grid grid-cols-2 gap-6 mt-14">

            <div className="flex items-center gap-3">

              <FaRobot className="text-cyan-400 text-xl" />

              <span className="text-gray-300">
                AI Detection
              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaFileAlt className="text-cyan-400 text-xl" />

              <span className="text-gray-300">
                PDF Analysis
              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaShieldAlt className="text-cyan-400 text-xl" />

              <span className="text-gray-300">
                Secure Reports
              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaChartLine className="text-cyan-400 text-xl" />

              <span className="text-gray-300">
                Smart Analytics
              </span>

            </div>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >

          <div
            className="
            bg-[#151523]
            border
            border-[#2D2D44]
            rounded-3xl
            p-10
            shadow-2xl
            "
          >

            <h2 className="text-3xl font-bold text-white">
              Live Analysis
            </h2>

            <div className="mt-10 space-y-8">

              <Progress
                title="Similarity Score"
                value="18%"
                width="18%"
                color="bg-cyan-400"
              />

              <Progress
                title="AI Detection"
                value="9%"
                width="9%"
                color="bg-purple-500"
              />

              <Progress
                title="Report Accuracy"
                value="96%"
                width="96%"
                color="bg-green-400"
              />

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

const Progress = ({
  title,
  value,
  width,
  color,
}) => (
  <div>

    <div className="flex justify-between text-gray-300">

      <span>{title}</span>

      <span>{value}</span>

    </div>

    <div className="h-3 rounded-full bg-[#26263A] mt-3">

      <div
        className={`${color} h-3 rounded-full`}
        style={{ width }}
      />

    </div>

  </div>
);

export default Hero;
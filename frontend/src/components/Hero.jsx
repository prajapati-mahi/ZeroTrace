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

      <div className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold">
            AI Powered Academic Integrity Platform
          </span>

          <h1 className="mt-8 text-6xl font-black leading-tight">

            Detect

            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Plagiarism
            </span>

            <br />

            In Seconds.

          </h1>

          <p className="mt-8 text-gray-400 text-xl leading-9 max-w-xl">

            ZeroTrace combines semantic AI analysis, document comparison,
            AI-generated content detection and professional reporting
            into one modern platform.

          </p>

          <div className="mt-10 flex gap-5">

            <Link
              to="/signup"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-105 transition"
            >
              Get Started →
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-xl border border-[#2D2D44] hover:border-cyan-400 transition"
            >
              Live Demo
            </Link>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-8 mt-14">

            <div>

              <h2 className="text-4xl font-black text-cyan-400">
                95%
              </h2>

              <p className="text-gray-400">
                Detection Accuracy
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-black text-cyan-400">
                2s
              </h2>

              <p className="text-gray-400">
                Average Scan
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-black text-cyan-400">
                24/7
              </h2>

              <p className="text-gray-400">
                Availability
              </p>

            </div>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >

          <div className="bg-[#151523] rounded-3xl border border-[#2D2D44] p-8 shadow-2xl">

            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                Live Analysis
              </h2>

              <span className="text-green-400">
                ● Active
              </span>

            </div>

            <div className="mt-10 space-y-8">

              <div>

                <div className="flex justify-between">

                  <span>Similarity</span>

                  <span className="text-cyan-400">
                    18%
                  </span>

                </div>

                <div className="h-3 bg-[#26263A] rounded-full mt-2">

                  <div className="w-[18%] h-3 bg-cyan-400 rounded-full" />

                </div>

              </div>

              <div>

                <div className="flex justify-between">

                  <span>AI Generated</span>

                  <span className="text-purple-400">
                    9%
                  </span>

                </div>

                <div className="h-3 bg-[#26263A] rounded-full mt-2">

                  <div className="w-[9%] h-3 bg-purple-500 rounded-full" />

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="bg-[#1F1F33] rounded-xl p-5">

                  <FaFileAlt className="text-cyan-400 text-2xl mb-3" />

                  PDF Upload

                </div>

                <div className="bg-[#1F1F33] rounded-xl p-5">

                  <FaRobot className="text-purple-400 text-2xl mb-3" />

                  AI Detection

                </div>

                <div className="bg-[#1F1F33] rounded-xl p-5">

                  <FaShieldAlt className="text-green-400 text-2xl mb-3" />

                  Secure Reports

                </div>

                <div className="bg-[#1F1F33] rounded-xl p-5">

                  <FaChartLine className="text-yellow-400 text-2xl mb-3" />

                  Analytics

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;
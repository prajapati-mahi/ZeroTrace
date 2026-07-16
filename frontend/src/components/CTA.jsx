import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="relative py-32 bg-[#09090F] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[140px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
        }}
        className="
          relative
          max-w-6xl
          mx-auto
          px-8
        "
      >

        <div
          className="
            rounded-[40px]
            border
            border-[#2D2D44]
            bg-[#151523]
            py-20
            px-10
            text-center
          "
        >

          <span className="uppercase tracking-[6px] text-cyan-400 font-semibold">
            Start Today
          </span>

          <h2 className="text-6xl font-black text-white mt-6 leading-tight">

            Ready to Detect
            <br />

            Plagiarism Smarter?

          </h2>

          <p className="text-gray-400 text-xl mt-8 max-w-3xl mx-auto leading-9">

            Experience semantic AI-powered plagiarism detection,
            detailed reports, and intelligent document analysis
            designed for students, educators and professionals.

          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">

            <Link
              to="/signup"
              className="
                px-10
                py-5
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-purple-600
                text-white
                font-semibold
                text-lg
                hover:scale-105
                transition
              "
            >
              Get Started Free
            </Link>

            <Link
              to="/login"
              className="
                px-10
                py-5
                rounded-xl
                border
                border-cyan-500
                text-cyan-400
                font-semibold
                text-lg
                hover:bg-cyan-500
                hover:text-white
                transition
              "
            >
              Login
            </Link>

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default CTA;
import {
  FaRobot,
  FaFileAlt,
  FaShieldAlt,
  FaChartPie,
} from "react-icons/fa";

import { motion } from "framer-motion";

const ProductPreview = () => {

  return (

    <section
      className="
      py-32
      bg-[#09090F]
      "
    >

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">

          <span
            className="
            uppercase
            tracking-[0.3em]
            text-cyan-400
            "
          >

            PRODUCT

          </span>

          <h2
            className="
            text-6xl
            font-black
            mt-5
            "
          >

            See ZeroTrace

            <span
              className="
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              bg-clip-text
              text-transparent
              "
            >

              {" "}
              In Action

            </span>

          </h2>

          <p
            className="
            text-gray-400
            text-xl
            mt-8
            max-w-3xl
            mx-auto
            "
          >

            Experience a modern plagiarism detection platform
            with AI insights, analytics,
            document comparison
            and beautiful reports.

          </p>

        </div>

        <motion.div

          initial={{
            opacity:0,
            scale:0.95,
          }}

          whileInView={{
            opacity:1,
            scale:1,
          }}

          transition={{
            duration:0.8,
          }}

          viewport={{
            once:true,
          }}

          className="
          bg-[#151523]
          rounded-[40px]
          border
          border-[#2D2D44]
          p-12
          shadow-[0_0_120px_rgba(0,212,255,0.08)]
          "

        >

          <div className="grid lg:grid-cols-2 gap-14">

            {/* Left */}

            <div>

              <h3
                className="
                text-3xl
                font-bold
                mb-10
                "
              >

                Live Dashboard

              </h3>

              <div className="space-y-8">

                <DashboardProgress
                  title="Similarity Score"
                  value="18%"
                  width="18%"
                  color="bg-cyan-400"
                />

                <DashboardProgress
                  title="AI Detection"
                  value="9%"
                  width="9%"
                  color="bg-purple-500"
                />

                <DashboardProgress
                  title="Report Accuracy"
                  value="96%"
                  width="96%"
                  color="bg-green-400"
                />

              </div>

            </div>

            {/* Right */}

            <div className="grid grid-cols-2 gap-6">

              <PreviewCard
                icon={<FaRobot />}
                title="AI Analysis"
              />

              <PreviewCard
                icon={<FaFileAlt />}
                title="PDF Reports"
              />

              <PreviewCard
                icon={<FaChartPie />}
                title="Analytics"
              />

              <PreviewCard
                icon={<FaShieldAlt />}
                title="Secure Storage"
              />

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

};

const DashboardProgress = ({
  title,
  value,
  width,
  color,
}) => (

  <div>

    <div className="flex justify-between">

      <span>{title}</span>

      <span className="font-bold">

        {value}

      </span>

    </div>

    <div
      className="
      h-3
      rounded-full
      bg-[#242438]
      mt-3
      "
    >

      <div
        className={`${color} h-3 rounded-full`}
        style={{
          width,
        }}
      />

    </div>

  </div>

);

const PreviewCard = ({
  icon,
  title,
}) => (

  <div
    className="
    bg-[#1B1B2E]
    rounded-3xl
    border
    border-[#2D2D44]
    p-8
    hover:border-cyan-400
    transition
    "
  >

    <div className="text-cyan-400 text-4xl">

      {icon}

    </div>

    <h4
      className="
      text-xl
      font-bold
      mt-5
      "
    >

      {title}

    </h4>

  </div>

);

export default ProductPreview;
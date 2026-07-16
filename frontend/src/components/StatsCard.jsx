import { motion } from "framer-motion";

const StatsCard = ({
  title,
  value,
  icon,
}) => {
  return (

    <motion.div

      whileHover={{
        y: -6,
        scale: 1.03,
      }}

      transition={{
        duration: 0.25,
      }}

      className="
      relative
      overflow-hidden
      rounded-3xl
      p-8
      bg-gradient-to-br
      from-[#161625]
      to-[#0E0E16]
      border
      border-[#2D2D44]
      shadow-xl
      group
      "

    >

      {/* Glow */}

      <div
        className="
        absolute
        -top-10
        -right-10
        w-40
        h-40
        bg-cyan-500/10
        blur-3xl
        rounded-full
        group-hover:bg-cyan-500/20
        transition
        "
      />

      <div className="relative flex justify-between items-start">

        <div>

          <p className="text-gray-400 uppercase tracking-wider text-sm">

            {title}

          </p>

          <h2 className="text-5xl font-black mt-4">

            {value}

          </h2>

        </div>

        <div
          className="
          w-16
          h-16
          rounded-2xl
          bg-gradient-to-br
          from-cyan-500/20
          to-purple-500/20
          flex
          justify-center
          items-center
          text-cyan-400
          text-3xl
          "
        >

          {icon}

        </div>

      </div>

    </motion.div>

  );
};

export default StatsCard;
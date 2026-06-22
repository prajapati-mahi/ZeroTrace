import { motion } from "framer-motion";

const StatsCard = ({
  title,
  value,
  icon,
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="
      bg-zinc-900/80
      backdrop-blur-lg
      border border-zinc-800
      rounded-2xl
      p-6
      shadow-lg
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-zinc-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-4xl text-purple-500">
          {icon}
        </div>

      </div>
    </motion.div>
  );
};

export default StatsCard;
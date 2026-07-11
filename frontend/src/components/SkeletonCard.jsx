import { motion } from "framer-motion";

const SkeletonCard = () => {
  return (
    <motion.div
      animate={{
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.4,
      }}
      className="
      h-40
      rounded-3xl
      bg-[#1b1b2d]
      border
      border-[#2a2a3e]
      "
    />
  );
};

export default SkeletonCard;
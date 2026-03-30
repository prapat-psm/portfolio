import { motion } from "motion/react";

const Preload = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Preload</h1>
    </motion.div>
  );
};

export { Preload };

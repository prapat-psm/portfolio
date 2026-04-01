"use client";

import { motion, type Variants } from "motion/react";
import { Button } from "../Button";
import { usePreload } from "@/components/Providers";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Information = () => {
  const { isPreloadFinished } = usePreload();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isPreloadFinished ? "visible" : "hidden"}
      className="relative z-10 flex flex-col gap-6"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-2"
      >
        <p className="flex items-center gap-2 border border-outline rounded-full px-2 py-1">
          <span className="size-2 rounded-full animate-pulse bg-secondary" />
          <span className="text-sm text-primary tracking-widest uppercase">
            SENIOR FRONTEND DEVELOPER
          </span>
        </p>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-5xl font-semibold max-w-4xl text-on-background"
      >
        I&apos;m{" "}
        <span className="text-gradient">
          Prapat
          <br />
          Prapatsornmanu
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="body-lg max-w-xl text-on-surface-variant leading-relaxed"
      >
        Senior Frontend Expert specializing in high-performance digital
        experiences. Engineering precision-grade interfaces with Next.js, Framer
        Motion, and scalable architecture. Over a decade of frontend leadership.
      </motion.p>

      <motion.div variants={itemVariants} className="flex gap-6 mt-4">
        <Button>View Projects</Button>
        <Button variants="outline">Tech Stacks</Button>
      </motion.div>
    </motion.div>
  );
};

export { Information };

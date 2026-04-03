"use client";

import { motion, type Variants } from "motion/react";
import { Button } from "@/components/Button";
import { usePreload } from "@/components/Providers";
import { Download } from "../Icons/Download";

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
      className="relative z-10 flex flex-col gap-10"
    >
      <div className="space-y-6">
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-2"
        >
          <p className="flex items-center gap-2 rounded-md px-3 bg-surface-variant py-1">
            <span className="size-2 rounded-full animate-pulse bg-green-500" />
            <span className="text-sm text-primary">
              Senior frontend developer
            </span>
          </p>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl lg:text-5xl font-semibold text-on-background"
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
          className="text-lg text-on-surface-variant"
        >
          Senior Frontend Expert specializing in high-performance digital
          experiences. Engineering precision-grade interfaces with Next.js,
          Framer Motion, and scalable architecture. Over a decade of frontend
          leadership.
        </motion.p>
      </div>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap p-1.5 gap-5"
      >
        <Button href="#projects" variants="primary-dim">
          View Projects
        </Button>
        <Button href="#contact" variants="outline">
          Contact
        </Button>

        <button className="flex px-1 items-center gap-1 text-on-surface-variant underline cursor-pointer hover:no-underline">
          <Download className="size-5" />
          <span>Resume (Updated 2026)</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export { Information };

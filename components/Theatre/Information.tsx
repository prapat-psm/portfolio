"use client";

import { motion, type Variants } from "motion/react";
import { Button } from "@/components/Button";
import { usePreload } from "@/components/Preload/PreloadProvider";
import { Download } from "../Icons/Download";
import Link from "next/link";

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
      className="relative z-10 flex flex-col gap-10">
      <div className="space-y-6">
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-2">
          <p className="flex items-center gap-2 pixel-tag bg-surface-variant">
            <span className="size-2 animate-pulse bg-green-500" />
            <span className="text-sm pb-0.5 text-primary font-bold">
              Senior frontend developer
            </span>
          </p>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-semibold text-on-background font-press-start-2p flex gap-x-4 uppercase pt-2">
          <span>I&apos;m</span>
          <span className="text-gradient tracking-widest">Prapat</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-on-surface-variant">
          Senior Frontend Expert specializing in high-performance digital
          experiences. Engineering precision-grade interfaces with Next.js,
          Framer Motion, and scalable architecture. Over a decade of frontend
          leadership.
        </motion.p>
      </div>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap p-1.5 gap-5">
        <Button href="#projects" variants="primary-dim">
          View Projects
        </Button>
        <Button href="#contact" variants="outline">
          Contact
        </Button>

        <Link
          href="https://wbcylprqunqsmppnlprf.supabase.co/storage/v1/object/sign/resume/Resume%20Prapat%20Prapatsornmanu.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZTc2YmY2Yy1iZTlmLTQxNzItODM5OS0yZWM2ZmZlMWFjNzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN1bWUvUmVzdW1lIFByYXBhdCBQcmFwYXRzb3JubWFudS5wZGYiLCJpYXQiOjE3NzU0MTA2MDIsImV4cCI6MTgwNjk0NjYwMn0.Skr8aw7mKdwaNMIB3rx4rKxX2KgnPaoSSYsipzAK_sI"
          download
          target="_blank"
          className="flex px-1 items-center gap-1 text-on-surface-variant underline cursor-pointer hover:no-underline">
          <Download className="size-5" />
          <span>Resume (Updated 2026)</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export { Information };

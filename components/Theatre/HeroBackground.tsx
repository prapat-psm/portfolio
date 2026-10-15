"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useWebGLReady } from "./use-webgl-ready";

// three.js lives in its own chunk and is never part of the server render
const PixelField = dynamic(() => import("./PixelField"), { ssr: false });

/**
 * Hero backdrop: a CSS glow that always renders (and is the whole effect for
 * reduced motion / low-end devices), plus the WebGL pixel field on top once
 * the intro has finished and the browser is idle, so it never delays LCP.
 */
const HeroBackground = () => {
  const showCanvas = useWebGLReady();

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full lg:size-1/2 bg-primary/20 blur-[120px] pointer-events-none" />
      {showCanvas && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none">
          <PixelField />
        </motion.div>
      )}
    </>
  );
};

export { HeroBackground };

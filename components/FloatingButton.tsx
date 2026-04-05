"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { cn } from "@/libs/cn";

/**
 * FloatingButton component that stays at the bottom right corner
 * Features a pixel-perfect design and a bouncy animation loop.
 */
const FloatingButton = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={cn("fixed bottom-8 right-8 z-100", className)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -20, 0],
        scaleY: [1, 0.7, 1.2, 1],
        scaleX: [1, 1.3, 0.8, 1],
      }}
      transition={{
        scale: { duration: 0.3, type: "spring", stiffness: 260, damping: 20 },
        opacity: { duration: 0.3 },
        y: {
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: "easeOut",
        },
        scaleY: {
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: "easeOut",
        },
        scaleX: {
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: "easeOut",
        },
      }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        href="#contact"
        variants="secondary"
        className="btn-pixel--small shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]"
      >
        Hire Me
      </Button>
    </motion.div>
  );
};

export { FloatingButton };

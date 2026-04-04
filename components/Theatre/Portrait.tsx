"use client";

import { cn } from "@/libs/cn";
import Image from "next/image";
import { motion, HTMLMotionProps } from "motion/react";
import { usePreload } from "@/components/Providers";

type PortraitProps = HTMLMotionProps<"div">;

const Portrait = ({ className, ...restProps }: PortraitProps) => {
  const { isPreloadFinished } = usePreload();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={isPreloadFinished ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className={cn("relative", className)}
      {...restProps}
    >
      <Image
        src="/portrait.gif"
        alt="Prapat Prapatsornmanu"
        loading="eager"
        width={900}
        height={1200}
        className="mx-auto"
        unoptimized
        style={{
          imageRendering: "pixelated",
        }}
      />
    </motion.div>
  );
};

export { Portrait };

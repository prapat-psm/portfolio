"use client";

import { cn } from "@/libs/cn";
import Image from "next/image";
import { motion } from "motion/react";
import { usePreload } from "@/components/Providers";

type PortraitProps = React.ComponentProps<"div">;

const Portrait = ({ className, ...props }: PortraitProps) => {
  const { isPreloadFinished } = usePreload();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={isPreloadFinished ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className={cn("relative aspect-3/4", className)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
    >
      <Image
        src="/portrait.png"
        alt="Prapat Prapatsornmanu"
        loading="eager"
        className="object-center object-cover"
        fill
        sizes="(max-width: 768px) 100vw, 500px"
        style={{
          imageRendering: "pixelated",
        }}
      />
    </motion.div>
  );
};

export { Portrait };

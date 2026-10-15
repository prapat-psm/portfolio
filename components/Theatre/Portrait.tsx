"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/libs/cn";
import { usePreload } from "@/components/Preload/PreloadProvider";
import { useWebGLReady } from "./use-webgl-ready";

// three.js chunk, only fetched on devices that can run it
const VoxelPortrait = dynamic(() => import("./VoxelPortrait"), { ssr: false });

type PortraitProps = HTMLMotionProps<"div">;

/**
 * The GIF always renders first (it is the LCP image and the fallback). On capable
 * devices the voxel portrait mounts over it and the GIF fades out once cubes are drawn.
 */
const Portrait = ({ className, ...restProps }: PortraitProps) => {
  const { isPreloadFinished } = usePreload();
  const canUse3D = useWebGLReady();
  const [is3DReady, setIs3DReady] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={isPreloadFinished ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className={cn("relative", className)}
      {...restProps}>
      <Image
        src="/portrait.gif"
        alt="Prapat Prapatsornmanu"
        preload
        width={900}
        height={1200}
        className={cn("mx-auto transition-opacity duration-500", is3DReady && "opacity-0")}
        unoptimized
        style={{
          imageRendering: "pixelated",
        }}
      />
      {canUse3D && (
        // Larger than the image so cubes can fly in and tilt without being clipped
        <div className="absolute -inset-[15%]">
          <VoxelPortrait onReady={() => setIs3DReady(true)} />
        </div>
      )}
    </motion.div>
  );
};

export { Portrait };

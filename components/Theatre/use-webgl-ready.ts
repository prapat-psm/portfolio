"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { usePreload } from "@/components/Preload/PreloadProvider";
import { canUseWebGLHero, readHeroEnvironment } from "@/libs/hero-fx";

/**
 * True once the intro has finished, the browser is idle and the device can run WebGL
 * effects without hurting LCP or ignoring prefers-reduced-motion.
 */
export const useWebGLReady = (): boolean => {
  const { isPreloadFinished } = usePreload();
  const reducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isPreloadFinished || reducedMotion) return;

    const enable = () => setIsReady(canUseWebGLHero(readHeroEnvironment()));

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(enable, 300);
    return () => clearTimeout(id);
  }, [isPreloadFinished, reducedMotion]);

  return isReady && !reducedMotion;
};

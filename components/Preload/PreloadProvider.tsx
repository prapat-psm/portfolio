"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";

type PreloadContextType = {
  isPreloadFinished: boolean;
  setPreloadFinished: () => void;
};

const PreloadContext = createContext<PreloadContextType | undefined>(undefined);

export const PreloadProvider = ({ children }: { children: ReactNode }) => {
  const [isPreloadFinished, setIsPreloadFinished] = useState(false);

  // Stable identity: Preload's effect depends on it, so a new function per render would restart the intro
  const setPreloadFinished = useCallback(() => setIsPreloadFinished(true), []);

  // Audio Unlocking Logic
  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio();
      audio.muted = true;
      audio.play().then(() => {
        audio.pause();
        // Once unlocked, remove listeners
        window.removeEventListener("click", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
      }).catch(() => {});
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  return (
    <PreloadContext.Provider value={{ isPreloadFinished, setPreloadFinished }}>
      {/* Respect the OS "reduce motion" setting for every motion component */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </PreloadContext.Provider>
  );
};

export const usePreload = () => {
  const context = useContext(PreloadContext);
  if (context === undefined) {
    throw new Error("usePreload must be used within a PreloadProvider");
  }
  return context;
};

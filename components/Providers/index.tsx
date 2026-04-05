"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type PreloadContextType = {
  isPreloadFinished: boolean;
  setPreloadFinished: () => void;
};

const PreloadContext = createContext<PreloadContextType | undefined>(undefined);

export const PreloadProvider = ({ children }: { children: ReactNode }) => {
  const [isPreloadFinished, setIsPreloadFinished] = useState(false);

  const setPreloadFinished = () => setIsPreloadFinished(true);

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
      {children}
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

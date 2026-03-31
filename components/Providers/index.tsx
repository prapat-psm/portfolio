"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PreloadContextType = {
  isPreloadFinished: boolean;
  setPreloadFinished: () => void;
};

const PreloadContext = createContext<PreloadContextType | undefined>(undefined);

export const PreloadProvider = ({ children }: { children: ReactNode }) => {
  const [isPreloadFinished, setIsPreloadFinished] = useState(false);

  const setPreloadFinished = () => setIsPreloadFinished(true);

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

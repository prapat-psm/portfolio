"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Return type definition for the useHoverEffect hook.
 */
export interface HoverEffectReturn {
  onMouseEnter: () => void;
}

/**
 * useHoverSfx Hook
 *
 * A custom hook that plays an 8-bit game sound effect when triggered by a hover event.
 * Logic: Every 'mouseenter' triggers the sound from the beginning (resetting current time).
 */
export const useHoverSfx = (): HoverEffectReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pre-initialize audio on client-side
    if (typeof window !== "undefined") {
      const audio = new Audio("/8-bit-game-sfx-sound-8.mp3");
      audio.volume = 0.25;
      audio.preload = "auto"; // Optimized for low latency
      audioRef.current = audio;
    }

    // Cleanup: pause audio if component unmounts while playing
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  /**
   * Play the sound effect from the beginning.
   */
  const handleMouseEnter = useCallback(() => {
    if (!audioRef.current) return;

    // Reset current time to ensure it plays from start if hovered repeatedly
    audioRef.current.currentTime = 0;

    // Play with catch block to gracefully handle browser interaction policy (autoplay blocks)
    audioRef.current.play().catch((err) => {
      // Audio playback might be deferred until first user click
      console.warn("Pixel Sfx: Sound could not play automatically", err);
    });
  }, []);

  return {
    onMouseEnter: handleMouseEnter,
  };
};

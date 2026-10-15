/**
 * Pure logic for the WebGL pixel hero. Kept free of React/three so it can be unit tested.
 */

/** What the browser tells us about the visitor's device and preferences. */
export type HeroEnvironment = {
  reducedMotion: boolean;
  hasWebGL: boolean;
  /** `navigator.connection.saveData` (Chrome only). */
  saveData?: boolean;
  /** `navigator.deviceMemory` in GB (Chrome only). */
  deviceMemory?: number;
  /** `navigator.hardwareConcurrency`. */
  cores?: number;
};

/** Below these the CSS glow fallback is used instead of a canvas. */
export const MIN_DEVICE_MEMORY_GB = 4;
export const MIN_CORES = 4;

/** Decide whether the animated WebGL background is worth running on this device. */
export const canUseWebGLHero = (env: HeroEnvironment): boolean => {
  if (env.reducedMotion || !env.hasWebGL || env.saveData) return false;
  // Missing values mean the browser does not expose them (Safari/Firefox): assume capable.
  if (env.deviceMemory !== undefined && env.deviceMemory < MIN_DEVICE_MEMORY_GB) return false;
  if (env.cores !== undefined && env.cores < MIN_CORES) return false;
  return true;
};

/** Read the environment from the browser. Only call on the client. */
export const readHeroEnvironment = (): HeroEnvironment => {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };

  let hasWebGL = false;
  try {
    const canvas = document.createElement("canvas");
    hasWebGL = Boolean(canvas.getContext("webgl2"));
  } catch {
    hasWebGL = false;
  }

  return {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    hasWebGL,
    saveData: nav.connection?.saveData,
    deviceMemory: nav.deviceMemory,
    cores: nav.hardwareConcurrency,
  };
};

export type Rgb = readonly [r: number, g: number, b: number];

/** "#6063ee" → [0.376, 0.388, 0.933] for shader uniforms. */
export const hexToRgb = (hex: string): Rgb => {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!match) throw new Error(`Invalid hex color: ${hex}`);
  const n = parseInt(match[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/**
 * 8-bit palette, darkest to brightest. Index 0 is drawn transparent so the page
 * surface shows through; the shader dithers between the other three.
 */
export const HERO_PALETTE = ["#060e20", "#6063ee", "#a3a6ff", "#c180ff"] as const;

/** Size of one "screen pixel" of the effect, in CSS px. */
export const HERO_PIXEL_SIZE = 6;

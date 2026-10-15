import { describe, expect, it } from "vitest";
import { canUseWebGLHero, hexToRgb, type HeroEnvironment } from "./hero-fx";

const capable: HeroEnvironment = {
  reducedMotion: false,
  hasWebGL: true,
  saveData: false,
  deviceMemory: 8,
  cores: 8,
};

describe("canUseWebGLHero", () => {
  it("runs on a capable device", () => {
    expect(canUseWebGLHero(capable)).toBe(true);
  });

  it("respects prefers-reduced-motion", () => {
    expect(canUseWebGLHero({ ...capable, reducedMotion: true })).toBe(false);
  });

  it("needs WebGL2", () => {
    expect(canUseWebGLHero({ ...capable, hasWebGL: false })).toBe(false);
  });

  it("skips when the visitor asked to save data", () => {
    expect(canUseWebGLHero({ ...capable, saveData: true })).toBe(false);
  });

  it("skips low-end devices", () => {
    expect(canUseWebGLHero({ ...capable, deviceMemory: 2 })).toBe(false);
    expect(canUseWebGLHero({ ...capable, cores: 2 })).toBe(false);
  });

  it("assumes capable when the browser hides hardware info (Safari)", () => {
    expect(
      canUseWebGLHero({ reducedMotion: false, hasWebGL: true }),
    ).toBe(true);
  });
});

describe("hexToRgb", () => {
  it("converts to 0..1 channels", () => {
    expect(hexToRgb("#ffffff")).toEqual([1, 1, 1]);
    expect(hexToRgb("000000")).toEqual([0, 0, 0]);
    expect(hexToRgb("#6063ee")[2]).toBeCloseTo(0.933, 3);
  });

  it("rejects bad input", () => {
    expect(() => hexToRgb("#fff")).toThrow();
  });
});

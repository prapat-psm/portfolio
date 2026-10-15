import { describe, expect, it } from "vitest";
import {
  PATTERNS,
  CellPhase,
  buildDelays,
  cellPhase,
  gridFor,
  pickPattern,
  shouldTransition,
} from "./pixel-transition";

/** Deterministic RNG so tests don't flake. */
const seeded = (seed = 1) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const grid = { cols: 7, rows: 5 };
const click = { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false };

describe("gridFor", () => {
  it("covers the whole viewport", () => {
    expect(gridFor(1440, 900, 32)).toEqual({ cols: 45, rows: 29 });
  });
});

describe("buildDelays", () => {
  it.each(PATTERNS)("%s gives every cell a delay in 0..1", (pattern) => {
    const delays = buildDelays(pattern, grid, seeded());
    expect(delays).toHaveLength(35);
    for (const d of delays) {
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThanOrEqual(1);
    }
  });

  it("dissolve and spiral visit each cell exactly once", () => {
    for (const pattern of ["dissolve", "spiral"] as const) {
      const sorted = [...buildDelays(pattern, grid, seeded())].sort((a, b) => a - b);
      sorted.forEach((d, i) => expect(d).toBeCloseTo(i / 34));
    }
  });

  it("spiral starts in the top-left corner and ends on the middle row", () => {
    const delays = buildDelays("spiral", grid, seeded());
    expect(delays[0]).toBe(0);
    expect(delays[2 * 7 + 3]).toBeGreaterThan(0.9);
    expect(delays[2 * 7 + 4]).toBe(1);
  });

  it("iris closes from the corners to the center", () => {
    const delays = buildDelays("iris", grid, seeded());
    expect(delays[0]).toBe(0);
    expect(delays[2 * 7 + 3]).toBe(1);
  });
});

describe("cellPhase", () => {
  it("cover goes empty → edge → filled", () => {
    expect(cellPhase(0.5, 0.2, "cover")).toBe(CellPhase.Empty);
    expect(cellPhase(0.5, 0.48, "cover")).toBe(CellPhase.Edge);
    expect(cellPhase(0.5, 1, "cover")).toBe(CellPhase.Filled);
  });

  it("reveal goes filled → edge → empty", () => {
    expect(cellPhase(0.5, 0.2, "reveal")).toBe(CellPhase.Filled);
    expect(cellPhase(0.5, 0.48, "reveal")).toBe(CellPhase.Edge);
    expect(cellPhase(0.5, 1, "reveal")).toBe(CellPhase.Empty);
  });

  it("every cell is done at progress 1, even the last one", () => {
    expect(cellPhase(1, 1, "cover")).toBe(CellPhase.Filled);
    expect(cellPhase(1, 1, "reveal")).toBe(CellPhase.Empty);
  });
});

describe("pickPattern", () => {
  it("never repeats the previous pattern", () => {
    const rng = seeded(7);
    let prev = pickPattern(rng);
    for (let i = 0; i < 50; i++) {
      const next = pickPattern(rng, prev);
      expect(next).not.toBe(prev);
      prev = next;
    }
  });
});

describe("shouldTransition", () => {
  it("plays for a plain click to another page", () => {
    expect(shouldTransition("/projects", "/", click)).toBe(true);
  });

  it("skips the current page, new tabs, modifier keys and external links", () => {
    expect(shouldTransition("/projects", "/projects", click)).toBe(false);
    expect(shouldTransition("/projects#a", "/projects", click)).toBe(false);
    expect(shouldTransition("/projects", "/", { ...click, metaKey: true })).toBe(false);
    expect(shouldTransition("/projects", "/", click, "_blank")).toBe(false);
    expect(shouldTransition("https://x.com", "/", click)).toBe(false);
    expect(shouldTransition("//x.com", "/", click)).toBe(false);
  });
});

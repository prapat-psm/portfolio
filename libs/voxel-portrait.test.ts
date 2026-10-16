import { describe, expect, it } from "vitest";
import {
  buildVoxels,
  countVoxels,
  distanceToEdge,
  hatPuff,
  nextBlinkDelay,
  type VoxelGrid,
} from "./voxel-portrait";
import { PORTRAIT_VOXELS } from "@/components/Theatre/portrait-voxels.data";

// 7x7 filled block inside an empty border; the top row is "hat", the center blinks white
const block: VoxelGrid = {
  cols: 9,
  rows: 9,
  palette: ["#000000", "#ffffff"],
  cells: [
    ".........",
    ".0000000.",
    ".0000000.",
    ".0000000.",
    ".0001000.",
    ".0000000.",
    ".0000000.",
    ".0000000.",
    ".........",
  ].join(""),
  hat: "0".repeat(9) + "011111110" + "0".repeat(63),
  blink: [[4 * 9 + 4, 0]],
};

describe("distanceToEdge", () => {
  it("grows toward the middle of a shape", () => {
    const dist = distanceToEdge(block);
    expect(dist[0]).toBe(0);
    expect(dist[1 * 9 + 1]).toBe(1);
    expect(dist[4 * 9 + 4]).toBe(4);
  });
});

describe("buildVoxels", () => {
  const voxels = buildVoxels(block);

  it("makes one cube per filled cell", () => {
    expect(voxels).toHaveLength(49);
    expect(countVoxels(block)).toBe(49);
  });

  it("centers the shape and flips y so the top row is up", () => {
    const first = voxels[0];
    expect(first.x).toBe(-3);
    expect(first.y).toBe(3);
  });

  it("maps palette colors", () => {
    const center = voxels.find((v) => v.x === 0 && v.y === 0);
    expect(center?.color).toBe("#ffffff");
  });

  it("bulges the middle more than the edge", () => {
    const edge = voxels.find((v) => v.x === -3 && v.y === 0)!;
    const center = voxels.find((v) => v.x === 0 && v.y === 0)!;
    expect(edge.depth).toBeGreaterThanOrEqual(1);
    expect(center.depth).toBeGreaterThan(edge.depth);
  });

  it("marks hat cubes and blink colors", () => {
    expect(voxels.filter((v) => v.isHat)).toHaveLength(7);
    expect(voxels.find((v) => v.x === 0 && v.y === 0)?.blinkColor).toBe("#000000");
    expect(voxels.filter((v) => v.blinkColor)).toHaveLength(1);
  });

  it("rejects a grid whose size does not match", () => {
    expect(() => buildVoxels({ ...block, cols: 8 })).toThrow();
  });

  it("parses the generated portrait", () => {
    const portrait = buildVoxels(PORTRAIT_VOXELS);
    expect(portrait.length).toBeGreaterThan(1000);
    expect(portrait.every((v) => /^#[0-9a-f]{6}$/.test(v.color))).toBe(true);
    expect(portrait.some((v) => v.isHat)).toBe(true);
    expect(portrait.filter((v) => v.blinkColor).length).toBeGreaterThan(0);
  });
});

describe("animation helpers", () => {
  it("blinks at irregular gaps of a few seconds", () => {
    expect(nextBlinkDelay(() => 0)).toBe(2.5);
    expect(nextBlinkDelay(() => 1)).toBe(6);
  });

  it("hat puff stays a small, non-negative extra depth", () => {
    for (let t = 0; t < 10; t += 0.37) {
      const puff = hatPuff(t, 5);
      expect(puff).toBeGreaterThanOrEqual(0);
      expect(puff).toBeLessThanOrEqual(0.7);
    }
  });
});

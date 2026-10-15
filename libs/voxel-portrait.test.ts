import { describe, expect, it } from "vitest";
import {
  buildVoxels,
  countVoxels,
  distanceToEdge,
  easeOutBack,
  voxelProgress,
  type VoxelGrid,
} from "./voxel-portrait";
import { PORTRAIT_VOXELS } from "@/components/Theatre/portrait-voxels.data";

const fixedRng = () => 0.5;

// 7x7 filled block inside an empty border
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
  const voxels = buildVoxels(block, fixedRng);

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

  it("assembles bottom rows first", () => {
    const top = voxels.find((v) => v.y === 3)!;
    const bottom = voxels.find((v) => v.y === -3)!;
    expect(bottom.delay).toBeLessThan(top.delay);
  });

  it("rejects a grid whose size does not match", () => {
    expect(() => buildVoxels({ ...block, cols: 8 }, fixedRng)).toThrow();
  });

  it("parses the generated portrait", () => {
    const portrait = buildVoxels(PORTRAIT_VOXELS, fixedRng);
    expect(portrait.length).toBeGreaterThan(1000);
    expect(portrait.every((v) => /^#[0-9a-f]{6}$/.test(v.color))).toBe(true);
  });
});

describe("animation helpers", () => {
  it("easeOutBack starts at 0, ends at 1 and overshoots in between", () => {
    expect(easeOutBack(0)).toBeCloseTo(0);
    expect(easeOutBack(1)).toBeCloseTo(1);
    expect(Math.max(...[0.6, 0.7, 0.8].map(easeOutBack))).toBeGreaterThan(1);
  });

  it("every cube has landed when the intro ends", () => {
    expect(voxelProgress(1, 1)).toBe(1);
    expect(voxelProgress(0, 0)).toBe(0);
  });
});

/**
 * Pure logic for the voxel 3D portrait. Kept free of React/three so it can be unit tested.
 */

/** Pixel art as a grid. `cells` is row-major, top row first: "." is empty, "0".."z" index `palette`. */
export type VoxelGrid = {
  cols: number;
  rows: number;
  palette: readonly string[];
  cells: string;
};

/** One cube of the portrait, centered on the origin with +y up. */
export type Voxel = {
  x: number;
  y: number;
  /** How far the cube sticks out toward the viewer, in cells (≥ 1). */
  depth: number;
  color: string;
  /** 0..1: when this cube starts flying into place during the intro. */
  delay: number;
};

export type Rng = () => number;

/** Cells this far (or more) from the silhouette get the full relief. */
const RELIEF_DISTANCE = 10;
/** Extra depth at the center of the face, in cells. */
const RELIEF_DEPTH = 3;

/** Distance (in cells, 4-neighbour) from each cell to the nearest empty cell or the border. */
export const distanceToEdge = (grid: VoxelGrid): Int32Array => {
  const { cols, rows, cells } = grid;
  const dist = new Int32Array(cols * rows).fill(-1);
  const queue: number[] = [];

  for (let i = 0; i < cells.length; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const onBorder = c === 0 || r === 0 || c === cols - 1 || r === rows - 1;
    if (cells[i] === ".") {
      dist[i] = 0;
      queue.push(i);
    } else if (onBorder) {
      dist[i] = 1;
      queue.push(i);
    }
  }

  // Multi-source BFS outward from the silhouette
  for (let head = 0; head < queue.length; head++) {
    const i = queue[head];
    const c = i % cols;
    const r = Math.floor(i / cols);
    const neighbours = [
      c > 0 ? i - 1 : -1,
      c < cols - 1 ? i + 1 : -1,
      r > 0 ? i - cols : -1,
      r < rows - 1 ? i + cols : -1,
    ];
    for (const n of neighbours) {
      if (n < 0 || dist[n] !== -1) continue;
      dist[n] = dist[i] + 1;
      queue.push(n);
    }
  }
  return dist;
};

/** Number of cubes the grid produces (one per filled cell). */
export const countVoxels = (grid: VoxelGrid): number => grid.cells.replace(/\./g, "").length;

/** Convert the grid into cubes with a rounded relief, so the face bulges like an 8-bit bust. */
export const buildVoxels = (grid: VoxelGrid, rng: Rng): Voxel[] => {
  const { cols, rows, palette, cells } = grid;
  if (cells.length !== cols * rows) {
    throw new Error(`Voxel grid has ${cells.length} cells, expected ${cols * rows}`);
  }

  const dist = distanceToEdge(grid);
  const voxels: Voxel[] = [];

  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === ".") continue;
    const c = i % cols;
    const r = Math.floor(i / cols);
    const t = Math.min(dist[i], RELIEF_DISTANCE) / RELIEF_DISTANCE;

    voxels.push({
      x: c - (cols - 1) / 2,
      y: (rows - 1) / 2 - r,
      // sqrt gives a dome rather than a pyramid
      depth: Math.round(1 + RELIEF_DEPTH * Math.sqrt(t)),
      color: palette[parseInt(cells[i], 36)],
      // Build from the bottom up, with some jitter so it feels hand-placed
      delay: ((rows - 1 - r) / Math.max(1, rows - 1)) * 0.6 + rng() * 0.4,
    });
  }
  return voxels;
};

/** easeOutBack: overshoots slightly, like a block snapping into place. */
export const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const x = Math.min(1, Math.max(0, t));
  return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
};

/** Progress of one cube given the intro's overall progress (0..1) and the cube's delay. */
export const voxelProgress = (introProgress: number, delay: number, span = 0.35): number =>
  Math.min(1, Math.max(0, (introProgress * (1 + span) - delay) / span));

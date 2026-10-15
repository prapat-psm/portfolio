/**
 * Pure logic for the Pokemon-style pixel page transition.
 * The renderer (components/PageTransition) only draws what these functions decide.
 */

export const PATTERNS = ["dissolve", "spiral", "blinds", "checker", "diagonal", "iris"] as const;
export type PatternName = (typeof PATTERNS)[number];

export type Grid = { cols: number; rows: number };
export type Rng = () => number;

/** Cover the screen, or uncover it. */
export type TransitionMode = "cover" | "reveal";

/** What a single cell shows at a moment of the transition. */
export const CellPhase = {
  Empty: 0,
  /** The leading edge: drawn in an accent color, like the flashing tiles in Pokemon. */
  Edge: 1,
  Filled: 2,
} as const;
export type CellPhase = (typeof CellPhase)[keyof typeof CellPhase];

/** CI tokens from globals.css. */
export const TRANSITION_COLORS = {
  fill: "#060e20", // surface
  edges: ["#6063ee", "#a3a6ff", "#c180ff", "#8ce7ff"], // primary-dim, primary, secondary, tertiary
} as const;

export const CELL_SIZE = 32;
export const TRANSITION_MS = 520;
/** How long (as a share of the progress) a cell stays in its edge color. */
export const EDGE_WIDTH = 0.15;

export const gridFor = (width: number, height: number, cell = CELL_SIZE): Grid => ({
  cols: Math.max(1, Math.ceil(width / cell)),
  rows: Math.max(1, Math.ceil(height / cell)),
});

/** Pick a random pattern, never the same one twice in a row. */
export const pickPattern = (rng: Rng, previous?: PatternName): PatternName => {
  const pool = PATTERNS.filter((p) => p !== previous);
  return pool[Math.floor(rng() * pool.length) % pool.length];
};

/** Visit order of a clockwise spiral from the outer ring inward, as cell indexes. */
const spiralOrder = ({ cols, rows }: Grid): number[] => {
  const order: number[] = [];
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) order.push(top * cols + c);
    for (let r = top + 1; r <= bottom; r++) order.push(r * cols + right);
    if (top < bottom) for (let c = right - 1; c >= left; c--) order.push(bottom * cols + c);
    if (left < right) for (let r = bottom - 1; r > top; r--) order.push(r * cols + left);
    top++;
    bottom--;
    left++;
    right--;
  }
  return order;
};

const shuffled = (n: number, rng: Rng): number[] => {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** For each cell (row-major), the progress 0..1 at which it starts to change. */
export const buildDelays = (pattern: PatternName, grid: Grid, rng: Rng): Float32Array => {
  const { cols, rows } = grid;
  const n = cols * rows;
  const delays = new Float32Array(n);
  const last = Math.max(1, n - 1);

  const fromOrder = (order: number[]) => order.forEach((cell, i) => (delays[cell] = i / last));

  switch (pattern) {
    case "dissolve":
      fromOrder(shuffled(n, rng));
      break;
    case "spiral":
      fromOrder(spiralOrder(grid));
      break;
    case "blinds":
      // Each row sweeps across, alternating direction
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          delays[r * cols + c] = (r % 2 === 0 ? c : cols - 1 - c) / Math.max(1, cols - 1);
      break;
    case "checker":
      // Black squares first, then white squares, each in random order
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          delays[r * cols + c] = ((r + c) % 2) * 0.5 + rng() * 0.5;
      break;
    case "diagonal":
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          delays[r * cols + c] = (r + c) / Math.max(1, cols + rows - 2);
      break;
    case "iris": {
      // Closes from the edges toward the center
      const cx = (cols - 1) / 2;
      const cy = (rows - 1) / 2;
      const max = Math.hypot(cx, cy) || 1;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          delays[r * cols + c] = 1 - Math.hypot(c - cx, r - cy) / max;
      break;
    }
  }
  return delays;
};

/** Phase of one cell at `progress` (0..1). Cover fills cells; reveal clears them in the same order. */
export const cellPhase = (delay: number, progress: number, mode: TransitionMode): CellPhase => {
  if (progress >= 1) return mode === "cover" ? CellPhase.Filled : CellPhase.Empty;
  // Delays are squeezed into 0..1-EDGE_WIDTH so the last cell also finishes its edge flash by progress 1
  const d = progress - delay * (1 - EDGE_WIDTH);
  if (d < 0) return mode === "cover" ? CellPhase.Empty : CellPhase.Filled;
  if (d < EDGE_WIDTH) return CellPhase.Edge;
  return mode === "cover" ? CellPhase.Filled : CellPhase.Empty;
};

/** Whether a click on a link should play the transition instead of the browser default. */
export const shouldTransition = (
  href: string,
  currentPath: string,
  event: { button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean },
  target?: string | null,
): boolean => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (target && target !== "_self") return false;
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const path = href.split(/[?#]/)[0] || "/";
  return path !== currentPath;
};

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CELL_SIZE,
  CellPhase,
  TRANSITION_COLORS,
  TRANSITION_MS,
  buildDelays,
  cellPhase,
  gridFor,
  pickPattern,
  type Grid,
  type PatternName,
  type TransitionMode,
} from "@/libs/pixel-transition";

type PageTransitionContextType = {
  /** Cover the screen with pixels, navigate, then reveal the new page. */
  navigate: (href: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

/** If the new page never commits (error, offline), reveal anyway after this long. */
const NAVIGATION_TIMEOUT_MS = 6000;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isBusy = useRef(false);
  const lastPattern = useRef<PatternName | undefined>(undefined);
  /** Resolves when the pathname changes after router.push. */
  const onArrive = useRef<(() => void) | null>(null);

  useEffect(() => {
    onArrive.current?.();
    onArrive.current = null;
  }, [pathname]);

  /** Play one half of the transition on the overlay canvas. */
  const play = useCallback((mode: TransitionMode) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return Promise.resolve();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const grid: Grid = gridFor(canvas.width, canvas.height);
    const pattern = pickPattern(Math.random, lastPattern.current);
    lastPattern.current = pattern;
    const delays = buildDelays(pattern, grid, Math.random);
    const { fill, edges } = TRANSITION_COLORS;

    return new Promise<void>((resolve) => {
      const start = performance.now();
      const frame = (now: number) => {
        const progress = Math.min(1, (now - start) / TRANSITION_MS);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // One pass per color keeps fillStyle switches to five per frame
        const colors = [fill, ...edges];
        colors.forEach((color, colorIndex) => {
          ctx.fillStyle = color;
          for (let i = 0; i < delays.length; i++) {
            const phase = cellPhase(delays[i], progress, mode);
            const wanted =
              phase === CellPhase.Filled
                ? 0
                : phase === CellPhase.Edge
                  ? 1 + (i % edges.length)
                  : -1;
            if (wanted !== colorIndex) continue;
            const x = (i % grid.cols) * CELL_SIZE;
            const y = Math.floor(i / grid.cols) * CELL_SIZE;
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
          }
        });

        if (progress < 1) {
          requestAnimationFrame(frame);
          return;
        }
        if (mode === "reveal") canvas.style.display = "none";
        resolve();
      };
      requestAnimationFrame(frame);
    });
  }, []);

  const navigate = useCallback(
    async (href: string) => {
      if (isBusy.current) return;
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      isBusy.current = true;
      router.prefetch(href);

      const arrived = new Promise<void>((resolve) => {
        onArrive.current = resolve;
        setTimeout(resolve, NAVIGATION_TIMEOUT_MS);
      });

      await play("cover");
      router.push(href);
      await arrived;
      await play("reveal");
      isBusy.current = false;
    },
    [play, router],
  );

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="fixed inset-0 z-200 hidden size-full"
        style={{ imageRendering: "pixelated" }}
      />
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (context === undefined) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
};

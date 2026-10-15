"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Color, Object3D, type Group, type InstancedMesh } from "three";
import {
  buildVoxels,
  countVoxels,
  easeOutBack,
  voxelProgress,
  type Voxel,
} from "@/libs/voxel-portrait";
import { PORTRAIT_VOXELS } from "./portrait-voxels.data";

const INTRO_SECONDS = 2.4;
/** Pointer ripple: radius in cells, and how far cubes pop out. */
const RIPPLE_RADIUS = 9;
const RIPPLE_DEPTH = 5;
/** Max tilt toward the pointer, in radians. */
const TILT = { x: 0.35, y: 0.5 };
/** The canvas is this much larger than the portrait on each side (see Portrait.tsx). */
const CANVAS_BLEED = 0.15;

type VoxelState = Voxel & {
  /** Where the cube flies in from. */
  fromX: number;
  fromY: number;
  fromZ: number;
  spin: number;
  /** Current ripple offset, eased toward its target every frame. */
  pop: number;
};

const Portrait = ({ hovered, onReady }: { hovered: { current: boolean }; onReady: () => void }) => {
  const mesh = useRef<InstancedMesh>(null);
  const group = useRef<Group>(null);
  const voxels = useRef<VoxelState[]>([]);
  const elapsed = useRef(0);
  const zoomFor = useRef(0);
  const readySent = useRef(false);
  const count = useMemo(() => countVoxels(PORTRAIT_VOXELS), []);
  const dummy = useMemo(() => new Object3D(), []);

  // Random flight paths are made once on mount; colors never change after that
  useLayoutEffect(() => {
    voxels.current = buildVoxels(PORTRAIT_VOXELS, Math.random).map((v) => {
      // Scatter on a shell around the portrait, mostly toward the viewer
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 30;
      return {
        ...v,
        fromX: v.x + Math.cos(angle) * radius,
        fromY: v.y + Math.sin(angle) * radius,
        fromZ: 40 + Math.random() * 60,
        spin: (Math.random() - 0.5) * Math.PI * 4,
        pop: 0,
      };
    });

    const m = mesh.current;
    if (!m) return;
    const color = new Color();
    voxels.current.forEach((v, i) => m.setColorAt(i, color.set(v.color)));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    const m = mesh.current;
    const g = group.current;
    if (!m || !g || voxels.current.length === 0) return;
    const { camera, size, pointer } = state;

    // Match the GIF's size exactly (orthographic camera, 1 world unit = 1 cell) so the swap is seamless
    if (zoomFor.current !== size.height) {
      zoomFor.current = size.height;
      camera.zoom = size.height / (1 + 2 * CANVAS_BLEED) / PORTRAIT_VOXELS.rows;
      camera.updateProjectionMatrix();
    }

    elapsed.current += delta;
    const intro = Math.min(1, elapsed.current / INTRO_SECONDS);

    // Pointer in world units (cells), from R3F's normalized pointer
    const px = (pointer.x * size.width) / 2 / camera.zoom;
    const py = (pointer.y * size.height) / 2 / camera.zoom;
    const isHovered = hovered.current;

    // Tilt toward the pointer, or sway gently when idle
    const t = state.clock.elapsedTime;
    const targetY = isHovered ? pointer.x * TILT.y : Math.sin(t * 0.6) * 0.18;
    const targetX = isHovered ? -pointer.y * TILT.x : Math.sin(t * 0.45) * 0.06;
    const ease = Math.min(1, delta * 4);
    g.rotation.y += (targetY - g.rotation.y) * ease;
    g.rotation.x += (targetX - g.rotation.x) * ease;

    const popEase = Math.min(1, delta * 10);
    voxels.current.forEach((v, i) => {
      const p = easeOutBack(voxelProgress(intro, v.delay));

      let popTarget = 0;
      if (isHovered && intro === 1) {
        const d = Math.hypot(v.x - px, v.y - py);
        if (d < RIPPLE_RADIUS) popTarget = (1 - d / RIPPLE_RADIUS) ** 2 * RIPPLE_DEPTH;
      }
      v.pop += (popTarget - v.pop) * popEase;

      dummy.position.set(
        v.fromX + (v.x - v.fromX) * p,
        v.fromY + (v.y - v.fromY) * p,
        // The box is scaled along z to form the relief, so its front face sits at z = depth
        v.fromZ + (v.depth / 2 + v.pop - v.fromZ) * p,
      );
      dummy.rotation.set(v.spin * (1 - p), v.spin * (1 - p) * 0.5, 0);
      dummy.scale.set(1, 1, v.depth);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;

    if (!readySent.current) {
      readySent.current = true;
      onReady();
    }
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial />
      </instancedMesh>
    </group>
  );
};

/** 3D voxel version of the hero portrait. Load with `next/dynamic` + `ssr: false`. */
const VoxelPortrait = ({ onReady }: { onReady: () => void }) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering while the hero is scrolled out of view
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      aria-hidden
      className="absolute inset-0"
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}>
      <Canvas
        orthographic
        // No tone mapping: keep the pixel art palette exact
        flat
        camera={{ position: [0, 0, 200], near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        frameloop={isVisible ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}>
        <ambientLight intensity={1.9} />
        <directionalLight position={[-40, 60, 100]} intensity={1.6} />
        <Portrait hovered={hovered} onReady={onReady} />
      </Canvas>
    </div>
  );
};

export default VoxelPortrait;

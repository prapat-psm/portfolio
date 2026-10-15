"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Color, Object3D, type Group, type InstancedMesh } from "three";
import { buildVoxels, countVoxels, hatPuff, nextBlinkDelay, type Voxel } from "@/libs/voxel-portrait";
import { PORTRAIT_VOXELS } from "./portrait-voxels.data";

/** Pointer ripple: radius in cells, and how far cubes pop out. */
const RIPPLE_RADIUS = 12;
const RIPPLE_DEPTH = 5;
/** Max tilt toward the pointer, in radians. */
const TILT = { x: 0.3, y: 0.45 };
/** The canvas is this much larger than the portrait on each side (see Portrait.tsx). */
const CANVAS_BLEED = 0.15;
const BLINK_SECONDS = 0.14;
/** Clicking lifts the pillow hat, like in the photo: height in cells and duration. */
const LIFT_HEIGHT = 4;
const LIFT_SECONDS = 0.9;

type VoxelState = Voxel & {
  /** Current ripple offset, eased toward its target every frame. */
  pop: number;
};

/** Up fast, then drop back with a small bounce. 0 → 1 → 0 over t = 0..1. */
const liftCurve = (t: number) => {
  if (t <= 0 || t >= 1) return 0;
  if (t < 0.25) return Math.sin((t / 0.25) * (Math.PI / 2));
  const fall = (t - 0.25) / 0.75;
  return Math.max(0, Math.cos(fall * Math.PI * 1.5) * (1 - fall));
};

type PortraitProps = {
  hovered: { current: boolean };
  /** performance.now() of the last click, or 0. */
  liftedAt: { current: number };
  onReady: () => void;
};

const Portrait = ({ hovered, liftedAt, onReady }: PortraitProps) => {
  const mesh = useRef<InstancedMesh>(null);
  const group = useRef<Group>(null);
  const voxels = useRef<VoxelState[]>([]);
  const zoomFor = useRef(0);
  const readySent = useRef(false);
  const blink = useRef({ next: 3, closed: false });
  const count = useMemo(() => countVoxels(PORTRAIT_VOXELS), []);
  const dummy = useMemo(() => new Object3D(), []);
  const color = useMemo(() => new Color(), []);

  // Cubes start already in place (no assemble intro); colors are set once
  useLayoutEffect(() => {
    voxels.current = buildVoxels(PORTRAIT_VOXELS).map((v) => ({ ...v, pop: 0 }));
    const m = mesh.current;
    if (!m) return;
    voxels.current.forEach((v, i) => m.setColorAt(i, color.set(v.color)));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [color]);

  const setEyes = (m: InstancedMesh, closed: boolean) => {
    voxels.current.forEach((v, i) => {
      if (v.blinkColor) m.setColorAt(i, color.set(closed ? v.blinkColor : v.color));
    });
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  };

  useFrame((state, delta) => {
    const m = mesh.current;
    const g = group.current;
    if (!m || !g || voxels.current.length === 0) return;
    const { camera, size, pointer, clock } = state;
    const t = clock.elapsedTime;

    // Match the GIF's size exactly (orthographic camera, 1 world unit = 1 cell) so the swap is seamless
    if (zoomFor.current !== size.height) {
      zoomFor.current = size.height;
      camera.zoom = size.height / (1 + 2 * CANVAS_BLEED) / PORTRAIT_VOXELS.rows;
      camera.updateProjectionMatrix();
    }

    // Blink at irregular intervals
    const b = blink.current;
    if (!b.closed && t >= b.next) {
      b.closed = true;
      setEyes(m, true);
    } else if (b.closed && t >= b.next + BLINK_SECONDS) {
      b.closed = false;
      b.next = t + nextBlinkDelay(Math.random);
      setEyes(m, false);
    }

    // Pointer in world units (cells), from R3F's normalized pointer
    const px = (pointer.x * size.width) / 2 / camera.zoom;
    const py = (pointer.y * size.height) / 2 / camera.zoom;
    const isHovered = hovered.current;

    // Tilt toward the pointer, or sway gently when idle; the whole bust breathes up and down
    const targetY = isHovered ? pointer.x * TILT.y : Math.sin(t * 0.6) * 0.16;
    const targetX = isHovered ? -pointer.y * TILT.x : Math.sin(t * 0.45) * 0.05;
    const ease = Math.min(1, delta * 4);
    g.rotation.y += (targetY - g.rotation.y) * ease;
    g.rotation.x += (targetX - g.rotation.x) * ease;
    g.position.y = Math.sin(t * 1.6) * 0.35;

    const lift = liftedAt.current
      ? liftCurve((performance.now() - liftedAt.current) / 1000 / LIFT_SECONDS) * LIFT_HEIGHT
      : 0;

    const popEase = Math.min(1, delta * 10);
    voxels.current.forEach((v, i) => {
      let popTarget = 0;
      if (isHovered) {
        const d = Math.hypot(v.x - px, v.y - py);
        if (d < RIPPLE_RADIUS) popTarget = (1 - d / RIPPLE_RADIUS) ** 2 * RIPPLE_DEPTH;
      }
      v.pop += (popTarget - v.pop) * popEase;

      const depth = v.depth + (v.isHat ? hatPuff(t, v.x) : 0);
      // The box is scaled along z to form the relief, so its front face sits at z = depth
      dummy.position.set(v.x, v.y + (v.isHat ? lift : 0), depth / 2 + v.pop);
      dummy.scale.set(1, 1, depth);
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
  const liftedAt = useRef(0);
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
      onPointerLeave={() => (hovered.current = false)}
      onPointerDown={() => (liftedAt.current = performance.now())}>
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
        <Portrait hovered={hovered} liftedAt={liftedAt} onReady={onReady} />
      </Canvas>
    </div>
  );
};

export default VoxelPortrait;

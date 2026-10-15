"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector2, Vector3, type ShaderMaterial } from "three";
import { HERO_PALETTE, HERO_PIXEL_SIZE, hexToRgb } from "@/libs/hero-fx";
import { fragmentShader, vertexShader } from "./pixel-field.glsl";

type PixelFieldUniforms = {
  uTime: { value: number };
  uResolution: { value: Vector2 };
  uPointer: { value: Vector2 };
  uPixel: { value: number };
  uPalette: { value: Vector3[] };
};

/** Pointer in 0..1 canvas space (y up), shared between the DOM listener and the render loop. */
type PointerRef = { current: Vector2 };

const Field = ({ pointer }: { pointer: PointerRef }) => {
  const material = useRef<ShaderMaterial>(null);
  const size = useThree((state) => state.size);

  const uniforms = useMemo<PixelFieldUniforms>(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      // Start the glow on the portrait side
      uPointer: { value: new Vector2(0.7, 0.5) },
      uPixel: { value: HERO_PIXEL_SIZE },
      uPalette: { value: HERO_PALETTE.map((hex) => new Vector3(...hexToRgb(hex))) },
    }),
    [],
  );

  useFrame((_, delta) => {
    const u = material.current?.uniforms as PixelFieldUniforms | undefined;
    if (!u) return;
    u.uTime.value += delta;
    u.uResolution.value.set(size.width, size.height);
    // Ease toward the pointer so the glow trails smoothly
    u.uPointer.value.lerp(pointer.current, Math.min(1, delta * 3));
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

/** WebGL background for the hero. Load with `next/dynamic` + `ssr: false`. */
const PixelField = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef(new Vector2(0.7, 0.5));
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering while the hero is scrolled out of view
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The canvas ignores pointer events (content sits on top), so listen on window
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = wrapper.current?.getBoundingClientRect();
      if (!rect) return;
      pointer.current.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrapper} aria-hidden className="absolute inset-0 pointer-events-none">
      <Canvas
        // Effect is pixelated by design: render at 1x to keep the GPU cost tiny on HiDPI screens
        dpr={1}
        frameloop={isVisible ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ imageRendering: "pixelated" }}>
        <Field pointer={pointer} />
      </Canvas>
    </div>
  );
};

export default PixelField;

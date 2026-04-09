"use client";

import { motion, useAnimation, type Transition } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePreload } from "@/components/Preload/PreloadProvider";

const Preload = () => {
  const [isDone, setIsDone] = useState(false);

  const wrapperControls = useAnimation();
  const g1Controls = useAnimation();
  const g2Controls = useAnimation();
  const containerControls = useAnimation();
  const { setPreloadFinished } = usePreload();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const sequence = async () => {
      if (!mounted) return;

      // 1. Initial State (ซ่อน G1, G2 นอกกรอบ SVG สู่ด้านล่าง)
      wrapperControls.set({ x: 0, y: 0 }); // กรอบหลักอยู่ตรงกลาง
      g1Controls.set({ y: 100, x: 0 });
      g2Controls.set({ y: 100, x: 0 });
      containerControls.set({ opacity: 1 });

      await new Promise((r) => setTimeout(r, 100)); // หน่วงรอมัน mount
      if (!mounted) return;

      // 2. Animate G1 และ G2 สลับกันโผล่ขึ้นมา (แบบซ้อนทับกัน)
      const revealSpring: Transition = {
        type: "tween",
        ease: "easeInOut",
        mass: 1,
      };

      const g1Promise = g1Controls.start({ y: 0, transition: revealSpring });
      const g2Promise = g2Controls.start({ y: 0, transition: revealSpring });

      // รอจนปรากฏขึ้นมาครบทั้งคู่ (ตอนนี้มันจะซ้อนทับกันอยู่กึ่งกลางเต็มๆ)
      await Promise.all([g1Promise, g2Promise]);
      if (!mounted) return;

      // 3. Animation แยกตัวเองออกมา
      const separateSpring: Transition = {
        type: "tween",
        stiffness: 70,
        damping: 15,
        mass: 1,
      };

      await g2Controls.start({ x: 25, y: 25, transition: separateSpring });
      if (!mounted) return;

      // 4. หน่วง 500ms หลังจากแยกตัวเองออก
      await new Promise((r) => setTimeout(r, 500));
      if (!mounted) return;

      // เปิด overflow เพื่อไม่ให้โดนครอปตอนเคลื่อนย้าย
      if (wrapperRef.current) {
        wrapperRef.current.style.overflow = "visible";
      }

      // 5. คำนวณหาตำแหน่งของ Logo ใน Header จริงที่ต้องไปทับ
      const brandEl = document.querySelector(
        'a[title="Prapat Prapatsornmanu"]',
      );
      let moveX = 0;
      let moveY = -(window.innerHeight / 2 - 40); // default position in case brand is missing

      if (brandEl && innerRef.current) {
        const brandRect = brandEl.getBoundingClientRect();
        const textRect = innerRef.current.getBoundingClientRect();

        moveX = brandRect.x - textRect.x;
        moveY = brandRect.y - textRect.y;
      }

      // 6. เคลื่อนย้าย Wrapper ตัว Container หลักขึ้นไปที่เป้าหมาย
      const moveSpring: Transition = {
        type: "spring",
        stiffness: 90,
        damping: 20,
        mass: 1,
        ease: "easeInOut",
        duration: 0.25,
      };

      await wrapperControls.start({
        x: moveX,
        y: moveY,
        transition: moveSpring,
      });
      if (!mounted) return;

      // 7. Dissolve ทั้งหน้าจอ
      await containerControls.start({
        opacity: 0,
        transition: { duration: 0.25, ease: "easeInOut" },
      });
      if (!mounted) return;

      // 8. ลบคอมโพเนนต์แบบสมบูรณ์และแจ้ง State ให้ส่วนอื่นทำงานต่อ
      setIsDone(true);
      setPreloadFinished();
    };

    sequence();

    return () => {
      mounted = false;
    };
  }, [
    wrapperControls,
    g1Controls,
    g2Controls,
    containerControls,
    setPreloadFinished,
  ]);

  if (isDone) return null;

  return (
    <motion.div
      animate={containerControls}
      className="fixed inset-0 z-100 flex items-center justify-center bg-surface pointer-events-none">
      <div ref={wrapperRef} className="flex items-center justify-center">
        <motion.div ref={innerRef} animate={wrapperControls} className="flex">
          {/* Logo โครงสร้างเดียวกับ Brand */}
          <svg
            viewBox="0 0 100 100"
            className="size-16 text-on-background"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* Group 1 หลัก */}
            <motion.g animate={g1Controls} fill="currentColor">
              <rect x="20" y="20" width="10" height="60" />
              <rect x="30" y="20" width="30" height="10" />
              <rect x="30" y="45" width="30" height="10" />
              <rect x="50" y="30" width="10" height="15" />
            </motion.g>

            {/* Group 2 Shadow (พออนิเมตแยกออกมา จะไปอยู่ที่ x:25, y:25) */}
            <motion.g
              animate={g2Controls}
              fill="currentColor"
              className="opacity-40">
              <rect x="20" y="20" width="10" height="60" />
              <rect x="30" y="20" width="30" height="10" />
              <rect x="30" y="45" width="30" height="10" />
              <rect x="50" y="30" width="10" height="15" />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export { Preload };

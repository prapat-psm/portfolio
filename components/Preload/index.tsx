"use client";

import { motion, useAnimation, type Transition } from "motion/react";
import { useEffect, useRef, useState } from "react";

const Preload = () => {
  const [isDone, setIsDone] = useState(false);

  const p1Controls = useAnimation();
  const p2Controls = useAnimation();
  const containerControls = useAnimation();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const sequence = async () => {
      if (!mounted) return;

      // 1. Initial State (ซ่อน P1, P2 ตอนเริ่มต้น)
      p1Controls.set({ y: "100%", x: 0 });
      p2Controls.set({ y: "100%", x: 0 });
      containerControls.set({ opacity: 1 });

      await new Promise((r) => setTimeout(r, 100)); // หน่วงรอมัน mount ให้เรียบร้อย
      if (!mounted) return;

      // 2. Animate P1 และ P2 สลับกันเป็น Sequence
      const revealSpring: Transition = {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
      };

      const p1Promise = p1Controls.start({ y: "0%", transition: revealSpring });
      await new Promise((r) => setTimeout(r, 150)); // stagger ทีละ 150ms
      if (!mounted) return;

      const p2Promise = p2Controls.start({ y: "0%", transition: revealSpring });

      // รอจนกว่าจะปรากฏขึ้นมาครบแล้วตั้งตัวทั้งคู่
      await Promise.all([p1Promise, p2Promise]);
      if (!mounted) return;

      // 3. หน่วง 500ms
      await new Promise((r) => setTimeout(r, 500));
      if (!mounted) return;

      // ปิด overflow เพื่อเตรียมให้ตัวอักษรวิ่งออกไปนอกกรอบได้อิสระ
      if (wrapperRef.current) {
        wrapperRef.current.style.overflow = "visible";
      }

      // 4. คำนวณหาตำแหน่งของ Logo จริงใน Header เพื่อไปหา
      const brandEl = document.querySelector('a[title="Prapat Prapatsornmanu"]');
      let moveX = 0;
      let moveY = -(window.innerHeight / 2 - 40); // default position in case brand is missing

      if (brandEl && innerRef.current) {
        const brandRect = brandEl.getBoundingClientRect();
        const textRect = innerRef.current.getBoundingClientRect();

        // ระยะห่างที่ต้องเคลื่อนที่ (ค่าส่วนต่าง)
        moveX = brandRect.x - textRect.x;
        moveY = brandRect.y - textRect.y;
      }

      // 5. สั่งเคลื่อนที่ PP ไปที่เป้าหมาย
      const moveSpring: Transition = {
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 1,
      };

      await Promise.all([
        p1Controls.start({ x: moveX, y: moveY, transition: moveSpring }),
        p2Controls.start({ x: moveX, y: moveY, transition: moveSpring }),
      ]);
      if (!mounted) return;

      // 6. Dissolve ตัวกรอบให้หายไป
      await containerControls.start({
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      if (!mounted) return;

      // 7. ลบคอมโพเนนต์แบบสมบูรณ์
      setIsDone(true);
    };

    sequence();

    return () => {
      mounted = false;
    };
  }, [p1Controls, p2Controls, containerControls]);

  if (isDone) return null;

  return (
    <motion.div
      animate={containerControls}
      className="fixed inset-0 z-100 flex items-center justify-center bg-surface pointer-events-none"
    >
      <div
        ref={wrapperRef}
        className="flex items-center justify-center overflow-hidden"
      >
        <div ref={innerRef} className="flex">
          <motion.span
            initial={{ y: "100%", x: 0 }}
            animate={p1Controls}
            className="headline-lg tracking-wider text-on-background"
          >
            P
          </motion.span>
          <motion.span
            initial={{ y: "100%", x: 0 }}
            animate={p2Controls}
            className="headline-lg tracking-wider text-on-background"
          >
            P
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export { Preload };

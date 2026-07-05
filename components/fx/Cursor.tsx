"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a small dot that tracks instantly plus a trailing ring
 * that springs behind it. The ring grows over links/buttons and shows a
 * label over elements tagged data-cursor="drag" / "view".
 * Only rendered on fine-pointer devices.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;
      setHovered(!!target);
      const kind = target?.getAttribute("data-cursor");
      setLabel(kind === "drag" ? "drag" : kind === "view" ? "view" : null);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[94] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500/60 bg-blue-500/10 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: label ? 64 : hovered ? 48 : 28,
          height: label ? 64 : hovered ? 48 : 28,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        {label && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-600">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}

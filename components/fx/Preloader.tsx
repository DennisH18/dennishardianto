"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Quick counter + curtain reveal. Capped around ~1.1s so it never
 * meaningfully delays the content behind it (hero renders underneath).
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    // Timer-driven (not rAF) so it still completes in background tabs.
    const start = performance.now();
    const duration = 900;
    const interval = setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / duration);
      setCount(Math.floor(progress * 100));
      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 150);
      }
    }, 30);
    // Hard failsafe: never trap the user behind the curtain.
    const failsafe = setTimeout(() => setDone(true), 2500);
    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-between bg-slate-950 px-6 pb-6 sm:px-12 sm:pb-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400"
            >
              Dennis Hardianto — Portfolio
            </motion.p>
          </div>
          <span className="text-6xl font-bold tabular-nums text-white sm:text-8xl">
            {count}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

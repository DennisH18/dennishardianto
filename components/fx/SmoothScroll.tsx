"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;

/** Access the shared Lenis instance (null on server, touch devices w/o init, or reduced motion). */
export function getLenis() {
  return lenisInstance;
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    lenisInstance = lenis;
    (window as any).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Pinned/horizontal triggers measure page height on setup; images and
    // fonts settling afterwards can leave those measurements stale (the
    // footer becomes unreachable). Recompute once everything has loaded.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshTimer = setTimeout(refresh, 1200);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("load", refresh);
      clearTimeout(refreshTimer);
      lenis.destroy();
      lenisInstance = null;
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}

"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const SINGAPORE_LAT = 1.3521;
const SINGAPORE_LNG = 103.8198;
// cobe centers the camera on `-(lng + 90deg)`/`lat` (in radians), not
// simply `-lng`/`lat` — verified empirically against the marker projection.
const SINGAPORE_PHI = -(SINGAPORE_LNG + 90) * (Math.PI / 180);
const SINGAPORE_THETA = SINGAPORE_LAT * (Math.PI / 180);

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: SINGAPORE_PHI,
  theta: SINGAPORE_THETA,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 4000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [59 / 255, 130 / 255, 246 / 255], // accent blue
  glowColor: [0.6, 0.8, 1], // soft blue-white glow
  markers: [{ location: [SINGAPORE_LAT, SINGAPORE_LNG], size: 0.12 }],
};


export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let sway = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        // Keep Singapore in view: gently sway around it instead of
        // spinning all the way around, unless the user is dragging.
        if (!pointerInteracting.current) sway += 0.004;
        state.phi = config.phi + Math.sin(sway) * 0.35 + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[1/1] h-full w-auto max-w-full",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COLS = 70;
const ROWS = 36;
const SPACING = 0.55;

/**
 * Vanilla three.js particle wave for the hero background — a grid of
 * ~2500 blue dots undulating with a sine field, tilting slightly toward
 * the mouse. Vanilla (not react-three-fiber) because fiber crashes on
 * this React 18.3 setup.
 */
export default function DotField({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.5, 13);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const positions = new Float32Array(COLS * ROWS * 3);
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const idx = (i * ROWS + j) * 3;
        positions[idx] = (i - COLS / 2) * SPACING;
        positions[idx + 1] = 0;
        positions[idx + 2] = (j - ROWS / 2) * SPACING;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#3b82f6"),
      size: 0.045,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Pause rendering while offscreen.
    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(container);

    let frame: number;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (!visible) return;
      const t = reducedMotion ? 0 : time * 0.0008;
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const idx = i * ROWS + j;
          const x = pos.getX(idx);
          const z = pos.getZ(idx);
          pos.setY(idx, Math.sin(x * 0.55 + t) * 0.45 + Math.cos(z * 0.7 + t * 1.3) * 0.35);
        }
      }
      pos.needsUpdate = true;
      points.rotation.y += ((mouseX * 0.12 - points.rotation.y) * 0.04);
      points.rotation.x += ((mouseY * 0.06 - points.rotation.x) * 0.04);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0"}
    />
  );
}

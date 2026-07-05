"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import TextReveal from "@/components/fx/TextReveal";
import { MagicCard } from "@/components/magicui/magic-card";
import { projects } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ProjectCard({
  project,
  index,
  eager,
}: {
  project: (typeof projects)[number];
  index: number;
  eager: boolean;
}) {
  const [slide, setSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // subtle 3D tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), {
    stiffness: 200,
    damping: 20,
  });

  const startSlideshow = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(
        () => setSlide((prev) => (prev + 1) % project.src.length),
        1600
      );
    }
  };
  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseEnter={startSlideshow}
      onMouseLeave={() => {
        stopSlideshow();
        mx.set(0.5);
        my.set(0.5);
      }}
      className="w-[85vw] shrink-0 md:w-[560px]"
      data-cursor="view"
    >
      <MagicCard
        className="flex h-full flex-col rounded-3xl p-6 shadow-sm"
        gradientFrom="#3b82f6"
        gradientTo="#38bdf8"
        gradientColor="#3b82f6"
        gradientOpacity={0.12}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.src[slide]}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              <Image
                src={`/${project.src[slide]}`}
                alt={project.title}
                fill
                loading={eager ? "eager" : "lazy"}
                sizes="(max-width: 768px) 85vw, 560px"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {project.src.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === slide ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                {project.title}
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {project.description}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {project.year}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <button aria-label="GitHub" className="text-slate-400 transition-colors hover:text-slate-900">
              <FaGithub className="h-4 w-4" />
            </button>
            <button aria-label="Open project" className="text-slate-400 transition-colors hover:text-blue-500">
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </MagicCard>
    </motion.div>
  );
}

/**
 * Light chapter: on desktop the whole section pins and the card track
 * scrubs horizontally; on mobile / reduced motion it's a plain vertical
 * stack.
 */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current!;
          // rect.left accounts for the fixed sidebar offsetting the track;
          // safe to read at refresh time since invalidateOnRefresh reverts x.
          const amount = () =>
            Math.max(
              0,
              track.getBoundingClientRect().left +
                track.scrollWidth -
                window.innerWidth +
                48
            );
          gsap.to(track, {
            x: () => -amount(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${amount()}`,
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                setCounter(
                  Math.min(
                    projects.length,
                    Math.round(self.progress * (projects.length - 1)) + 1
                  )
                ),
            },
          });
        }
      );
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">
      <div className="flex min-h-screen flex-col justify-center py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-blue-600">
            03 — Stuff I&apos;ve built
          </p>
          <div className="flex items-end justify-between">
            <TextReveal
              text="A few things I'm proud of"
              className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight text-slate-900"
            />
            <span className="hidden pb-2 font-mono text-sm text-slate-400 md:block">
              {String(counter).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div
          ref={trackRef}
          data-cursor="drag"
          className="mt-12 flex flex-col gap-8 px-6 md:flex-row md:pl-12"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              eager={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

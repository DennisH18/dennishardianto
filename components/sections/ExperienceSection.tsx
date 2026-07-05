"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextReveal from "@/components/fx/TextReveal";
import { experiences } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

/**
 * Dark chapter continued: vertical timeline whose spine draws itself as
 * you scroll (GSAP scrub on scaleY).
 */
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-white pb-32 pt-8"
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-blue-600">
          02 — Where I&apos;ve worked
        </p>
        <TextReveal
          text="A few places I've called home"
          className="mb-20 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight text-slate-900"
        />

        <div className="relative">
          {/* scroll-drawn spine */}
          <div className="absolute bottom-0 left-7 top-0 w-px bg-slate-200" />
          <div
            ref={lineRef}
            className="absolute bottom-0 left-7 top-0 w-px bg-gradient-to-b from-blue-500 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
          />

          <ol className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.li
                key={index}
                custom={index}
                variants={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative pl-24"
              >
                <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_0_24px_rgba(59,130,246,0.15)] ring-1 ring-slate-200 transition-shadow hover:shadow-[0_0_28px_rgba(59,130,246,0.35)]">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={30}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="flex items-center text-xl font-semibold text-slate-900">
                    {exp.title}
                    {exp.badge && (
                      <span className="ml-3 inline-block rounded bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 ring-1 ring-blue-500/40">
                        {exp.badge}
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-sm text-slate-400">
                    {exp.time}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-blue-600">
                  {exp.company}
                </p>

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                  {exp.summary.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-blue-500/15 hover:text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

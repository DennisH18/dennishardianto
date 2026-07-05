"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { manifesto } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Dark storytelling chapter: the panel stays pinned (CSS sticky) for
 * ~2.5 screens while the manifesto's words light up one by one, scrubbed
 * to scroll.
 */
export default function Different() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (!words?.length) return;
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="different" ref={sectionRef} className="relative bg-white">
      <div className="h-[260vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* faint grid backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="relative mx-auto w-full max-w-5xl px-6">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.35em] text-blue-600">
              01 — A little about me
            </p>
            {manifesto.map((sentence, si) => (
              <p
                key={si}
                className={`${
                  si === 0
                    ? "text-[clamp(2rem,5vw,4rem)] font-bold text-slate-900"
                    : "mt-8 text-[clamp(1.4rem,3.2vw,2.6rem)] font-semibold text-slate-900"
                } leading-snug tracking-tight`}
              >
                {sentence.split(" ").map((word, wi) => (
                  <span key={wi} data-word className="inline-block">
                    {word}&nbsp;
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

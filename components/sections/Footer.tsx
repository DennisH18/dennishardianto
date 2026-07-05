"use client";

import TextReveal from "@/components/fx/TextReveal";
import Magnetic from "@/components/fx/Magnetic";
import { getLenis } from "@/components/fx/SmoothScroll";
import { contact } from "@/lib/content";

export default function Footer() {
  const backToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white pb-10 pt-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-blue-600">
          05 — Say hello
        </p>
        <TextReveal
          text="Got an idea? Let's make it happen."
          className="max-w-4xl text-[clamp(2.25rem,6vw,5rem)] font-bold tracking-tight text-slate-900"
        />

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Magnetic strength={0.35}>
            <a
              href={`mailto:${contact.email}`}
              data-cursor="view"
              className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-500"
            >
              {contact.emailDisplay}
              <span aria-hidden>→</span>
            </a>
          </Magnetic>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-900"
            >
              LinkedIn
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-900"
            >
              GitHub
            </a>
            <a
              href={contact.resume}
              download
              className="transition-colors hover:text-slate-900"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-400">
          <span>
            © {new Date().getFullYear()} Dennis Hardianto — Singapore
          </span>
          <button
            onClick={backToTop}
            className="flex items-center gap-2 uppercase tracking-[0.25em] transition-colors hover:text-slate-900"
          >
            Back to top <span aria-hidden>↑</span>
          </button>
        </div>
      </div>

      {/* oversized watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-bold leading-none text-slate-900/[0.035]"
      >
        DENNIS
      </div>
    </footer>
  );
}

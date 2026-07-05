"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AiFillFileText, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { TbCopy } from "react-icons/tb";
import { AuroraText } from "@/components/magicui/aurora-text";
import Magnetic from "@/components/fx/Magnetic";
import { contact, heroMarquee } from "@/lib/content";

const DotField = dynamic(() => import("@/components/fx/DotField"), {
  ssr: false,
});

// Waits for the preloader curtain (~1.05s) before the lines rise.
const lineReveal = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 1.15 + i * 0.12,
    },
  }),
};

function CopyChip({
  icon,
  text,
  copyValue,
}: {
  icon: React.ReactNode;
  text: string;
  copyValue: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(copyValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }}
      className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-700 backdrop-blur-sm transition-all hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
    >
      <span className="text-blue-600">{icon}</span>
      {text}
      <span className="relative">
        <TbCopy className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-blue-500" />
        <span
          className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white transition-opacity ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          Copied!
        </span>
      </span>
    </button>
  );
}

export default function Hero() {
  return (
    <section
      id="introduction"
      className="relative flex min-h-screen flex-col overflow-hidden pt-6"
    >
      <DotField className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-80" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mb-6 font-mono text-sm uppercase tracking-[0.35em] text-blue-600"
        >
          Hey there 👋 — based in Singapore
        </motion.p>

        <h1 className="text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[1.02] tracking-tight text-slate-900">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Hi, I&apos;m{" "}
              <AuroraText colors={["#3b82f6", "#38bdf8", "#6366f1", "#3b82f6"]}>
                Dennis
              </AuroraText>
              .
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              I turn data into
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-slate-400"
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              decisions.
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <CopyChip
            icon={<AiOutlineMail />}
            text={contact.emailDisplay}
            copyValue={contact.email}
          />
          <CopyChip
            icon={<AiOutlinePhone />}
            text={contact.phoneDisplay}
            copyValue={contact.phone}
          />
          <Magnetic strength={0.35}>
            <a
              href={contact.resume}
              download
              data-cursor="view"
              className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              <AiFillFileText />
              Download Resume
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓
          </motion.span>
          Scroll to explore
        </motion.div>
      </div>

      {/* Keyword marquee */}
      <div className="relative border-t border-slate-200/70 bg-white/60 py-4 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap pr-12">
          {[...heroMarquee, ...heroMarquee].map((word, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-sm font-medium uppercase tracking-[0.25em] text-slate-400"
            >
              {word}
              <span className="text-blue-500">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

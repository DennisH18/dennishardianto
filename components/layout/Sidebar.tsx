"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  AiOutlineBulb,
  AiOutlineClose,
  AiOutlineCode,
  AiOutlineLaptop,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import { TbBriefcase } from "react-icons/tb";
import { navItems, contact } from "@/lib/content";
import { scrollToSection } from "@/components/fx/SmoothScroll";

const icons: Record<string, React.ReactNode> = {
  introduction: <AiOutlineCode />,
  different: <AiOutlineUser />,
  experience: <TbBriefcase />,
  projects: <AiOutlineLaptop />,
  skills: <AiOutlineBulb />,
};

export default function Sidebar() {
  const [active, setActive] = useState("introduction");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  const handleScroll = useCallback(() => {
    // getBoundingClientRect (not offsetTop) so ScrollTrigger pin-spacers
    // and transforms don't skew the measurement.
    const probe = window.innerHeight * 0.35;
    let current = "introduction";
    for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= probe) current = id;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    let last = 0;
    const throttled = () => {
      const now = Date.now();
      if (now - last >= 120) {
        last = now;
        handleScroll();
      }
    };
    window.addEventListener("scroll", throttled, { passive: true });
    return () => window.removeEventListener("scroll", throttled);
  }, [handleScroll]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 m-1 hidden w-64 flex-col rounded-lg bg-gradient-to-b from-slate-950 to-slate-900 p-6 shadow-lg md:flex">
        {/* vertical scroll progress along the right edge */}
        <motion.div
          className="absolute bottom-6 right-0 top-6 w-[3px] origin-top rounded-full bg-gradient-to-b from-blue-600 via-sky-400 to-blue-600"
          style={{ scaleY: progress }}
        />

        <div className="mb-4 mt-4 flex items-center justify-center">
          <Image
            src="/profile.png"
            width={44}
            height={44}
            priority
            className="rounded-full object-cover shadow-[0_0_15px_rgba(0,200,255,0.4)]"
            alt="Profile Picture"
          />
          <p className="text-md ml-4 font-semibold text-white">
            Dennis Hardianto
          </p>
        </div>
        <hr className="mb-6 border-slate-700" />

        <ul>
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`group relative mb-2 flex h-10 w-full items-center rounded-lg px-4 py-2 transition-colors duration-300 ${
                  active === id
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg bg-white/10 ring-1 ring-blue-500/50 shadow-[0_0_16px_rgba(59,130,246,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative mr-2 text-lg transition-colors duration-300 ${
                    active === id ? "text-blue-400" : ""
                  }`}
                >
                  {icons[id]}
                </span>
                <span className="relative">{label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Socials */}
        <div className="mt-auto flex items-center justify-center space-x-6 p-3">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-110 hover:brightness-125"
          >
            <img src="linkedin.svg" width={22} alt="LinkedIn" />
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-110 hover:brightness-125"
          >
            <img src="github.png" width={22} alt="GitHub" />
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="transition-transform duration-300 hover:scale-110 hover:brightness-125"
          >
            <img src="gmail.png" width={22} alt="Email" />
          </a>
        </div>
      </aside>

      {/* Mobile menu trigger */}
      <button
        className="fixed right-4 top-4 z-50 rounded-full bg-white/80 p-2.5 shadow-md backdrop-blur-md md:hidden"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <AiOutlineMenu className="h-5 w-5 text-slate-900" />
      </button>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-slate-950 px-8 pb-10 pt-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                Dennis Hardianto
              </span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <AiOutlineClose className="h-6 w-6 text-white" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-2">
              {navItems.map(({ id, label }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  onClick={() => go(id)}
                  className={`text-left text-4xl font-bold tracking-tight ${
                    active === id ? "text-blue-400" : "text-white"
                  }`}
                >
                  {label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-auto flex items-center gap-6 text-sm text-slate-400">
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={`mailto:${contact.email}`}>Email</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

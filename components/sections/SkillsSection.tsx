"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  AiOutlineCode,
  AiOutlineLaptop,
} from "react-icons/ai";
import { TbBriefcase } from "react-icons/tb";
import { BarChart2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TextReveal from "@/components/fx/TextReveal";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { MagicCard } from "@/components/magicui/magic-card";
import { techStack, skills } from "@/lib/content";

const Globe = dynamic(
  () => import("@/components/magicui/globe").then((mod) => mod.Globe),
  { ssr: false }
);

const metrics = [
  {
    title: "Experience",
    value: 6,
    caption: "across all industries",
    icon: <TbBriefcase />,
  },
  {
    title: "Projects Completed",
    value: 12,
    caption: "from analytics to UI",
    icon: <AiOutlineLaptop />,
  },
  {
    title: "Hours Coding",
    value: 3000,
    caption: "from study to shipping",
    icon: <AiOutlineCode />,
  },
  {
    title: "Dashboards Deployed",
    value: 7,
    caption: "in production systems",
    icon: <BarChart2 />,
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-7xl space-y-8 px-6">
        <div>
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-blue-600">
            04 — A bit more about me
          </p>
          <TextReveal
            text="Where I've been, by the numbers"
            className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight text-slate-900"
          />
        </div>

        {/* Metrics Cards */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {metrics.map((item, idx) => (
            <motion.div key={idx} whileHover={{ y: -3 }}>
              <MagicCard
                className="group flex h-48 flex-col justify-between rounded-2xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                gradientFrom="#3b82f6"
                gradientTo="#38bdf8"
                gradientColor="#3b82f6"
                gradientOpacity={0.1}
              >
                <div className="mb-1 text-xl text-blue-500">{item.icon}</div>
                <div>
                  <h3 className="h-8 font-semibold text-gray-700">
                    {item.title}
                  </h3>
                  <NumberTicker
                    value={item.value}
                    className="mb-1 mt-1 h-12 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-4xl font-bold text-transparent"
                  />
                  <p className="h-12 text-xs text-slate-500">{item.caption}</p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Education + Location */}
        <motion.div
          className="grid grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="col-span-5 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">
              Education &amp; Certifications
            </h3>
            <div className="text-sm text-slate-700">
              <div className="mb-4 flex items-start gap-3">
                <img
                  src="smu.png"
                  alt="SMU Logo"
                  className="h-10 w-10"
                  loading="lazy"
                />
                <div>
                  <p className="font-medium text-slate-900">
                    Singapore Management University
                  </p>
                  <p>BSc in Information Systems</p>
                  <p className="text-xs text-slate-500">
                    Business Analytics &amp; Digitalization
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <img
                  src="oracle.png"
                  alt="Oracle Logo"
                  className="h-10 w-10"
                  loading="lazy"
                />
                <div>
                  <p className="font-medium text-slate-900">
                    Oracle University
                  </p>
                  <p>Java Foundations Certified Associate</p>
                  <a
                    href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=EB3D28B28CFFAA73F50339BE57731CB8E88BB64E4FA224DEDD2EE08BA36CFC55"
                    className="text-xs text-slate-500 hover:text-blue-500"
                    target="_blank"
                  >
                    See Credentials
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-5 flex h-80 flex-col rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Location</h3>
              <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 ring-1 ring-blue-100">
                🇸🇬 Singapore · UTC+8
              </span>
            </div>
            <div className="relative mt-2 min-h-0 flex-1 overflow-hidden">
              <Globe />
            </div>
          </div>
        </motion.div>

        {/* Tech Stack + Expertise */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:h-56 md:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
            <div className="relative overflow-hidden">
              <h3 className="mb-2 p-4 text-lg font-semibold">Tech Stack</h3>
              <div className="relative h-24 overflow-hidden">
                <div className="space-y-4">
                  {[0, 1].map((rowIndex) => (
                    <motion.div
                      key={rowIndex}
                      className="flex h-10 w-max items-center gap-6"
                      initial={{ x: 0 }}
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "linear",
                        repeatType: "loop",
                        delay: rowIndex * 6,
                      }}
                    >
                      {[...techStack, ...techStack].map((icon, i) => (
                        <img
                          key={`${rowIndex}-${i}`}
                          src={icon}
                          alt="tech-icon"
                          loading="lazy"
                          decoding="async"
                          className="h-8 transition duration-300 hover:grayscale-0"
                        />
                      ))}
                    </motion.div>
                  ))}
                </div>
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-32 w-24 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-32 w-24 bg-gradient-to-l from-white to-transparent" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white pr-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <h3 className="p-6 text-lg font-semibold">Expertise</h3>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={skills}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#334155" }}
                  tickLine={false}
                />
                <YAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                <Bar
                  dataKey="level"
                  fill="#3b82f6"
                  barSize={16}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import SmoothScroll from "@/components/fx/SmoothScroll";
import Preloader from "@/components/fx/Preloader";
import Cursor from "@/components/fx/Cursor";
import Sidebar from "@/components/layout/Sidebar";
import Hero from "@/components/sections/Hero";
import Different from "@/components/sections/Different";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Sidebar />
      <main className="md:ml-[17rem]">
        <Hero />
        <Different />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

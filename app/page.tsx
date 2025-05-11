"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineCode,
  AiOutlineCaretDown,
  AiFillFileText,
  AiOutlineMail,
  AiOutlinePhone,
  AiFillCalendar,
  AiFillPlayCircle,
  AiOutlineLaptop,
  AiOutlineBulb,
  AiOutlineCopy,
  AiOutlineCopyright,
} from "react-icons/ai";
import { TbBriefcase, TbCopy } from "react-icons/tb";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState("introduction");
  const contentRefs: Record<
    string,
    React.MutableRefObject<HTMLDivElement | null>
  > = {
    introduction: useRef(null),
    education: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    contentRefs[item].current!.scrollIntoView({ behavior: "smooth" });
  };
  const throttle = (func: Function, wait: number) => {
    let lastCall = 0;
    return (...args: any) => {
      const now = new Date().getTime();
      if (now - lastCall >= wait) {
        lastCall = now;
        func(...args);
      }
    };
  };

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 150;
    const sections = Object.keys(contentRefs);

    for (let section of sections) {
      const ref = contentRefs[section];
      if (
        ref.current &&
        ref.current.offsetTop <= scrollPosition &&
        ref.current.offsetTop + ref.current.clientHeight > scrollPosition
      ) {
        setSelectedItem(section);
        break;
      }
    }
  }, [contentRefs]);
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    setShowLine(false);
    const timeout = setTimeout(() => setShowLine(true), 100);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100); // 100ms throttle
    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };
  const handleCopyPhone = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 5000);
  };
  const Pcontainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: Pcontainer,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const skillData = [
    { subject: "Project Mgmt", A: 90 },
    { subject: "Full Stack", A: 85 },
    { subject: "Data Analysis", A: 80 },
    { subject: "Machine Learning", A: 70 },
    { subject: "UI/UX", A: 65 }
  ];
  const techStack = [
    "python.png", "react.png", "node.png",
    "tailwind.png", "postgres.png", "pandas.png"
  ];
  const projects = [
    {
      src: ["Satelilit-1.png", "Satelilit-2.png", "Satelilit-3.png"],
      title: "Satelilit.ai",
      description:
        "Built an ML-powered platform for housing valuation, leveraging geospatial data and advanced regression models to predict property prices with high accuracy.",
      tags: ["next.png", "fast.png", "pandas.png", "pytorch.png", "maps.png"],
    },
    {
      src: ["BB-1.png", "BB-2.png", "BB-3.png"],
      title: "BoschBoard",
      description:
        "Created a real-time analytics dashboard for Bosch tool monitoring, finalist position at Deep Learning Week 2024 with anomaly detection and performance insights.",
      tags: ["next.png", "fast.png", "pandas.png", "pytorch.png", "maps.png"],
    },
    {
      src: ["Dashboard-1.png", "Dashboard-2.png", "Dashboard-3.png"],
      title: "Financial Analytics Dashboard",
      description:
        "Engineered an automated dashboard for financial reporting, enabling streamlined Balance Sheet and P&L analysis with dynamic visualizations and automated Reporting.",
      tags: ["python.png", "supabase.png", "pandas.png", "google.png"],
    },
  ];

  const navItems = [
    { id: "introduction", label: "Introduction", icon: <AiOutlineCode /> },
    { id: "experience", label: "Experience", icon: <TbBriefcase /> },
    { id: "projects", label: "Projects", icon: <AiOutlineLaptop /> },
    { id: "skills", label: "Skills", icon: <AiOutlineBulb /> },
  ];

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const experiences = [
    {
      title: "Analyst",
      company: "COFCO International",
      time: "2024 - Present",
      badge: "Latest",
      logo: "cofco.png",
      summary: [
        "Optimize end-to-end commodity workflows, identifying automation opportunities that enhanced trade execution and reduced manual effort.",
        "Developed and maintained Python applications to automate data analysis and reporting tasks, improving accuracy of commodity price monitoring.",
      ],
      skills: [
        "Python",
        "SQL",
        "Financial Modelling",
        "Data Analysis",
        "Excel",
        "Data Visualization",
      ],
    },
    {
      title: "Software Engineering Intern",
      company: "Marymount Labs",
      time: "May - August 2024",
      logo: "marymount.png",
      summary: [
        "Engineered Full stack systems using Redis, Flask, and JS for digital health platforms.",
        "Performed statistical analysis for vaccination campaigns and built Python tools to improve healthcare decision-making.",
      ],
      skills: ["Python", "Flask", "Redis", "Next.js"],
    },
    {
      title: "Software Engineer",
      company: "Aboitiz Data Innovation",
      time: "January - April 2024",
      logo: "adi.png",
      summary: [
        "Developed real estate valuation platform using FastAPI and Next.js on Digital Ocean.",
        "Achieved ~9% MAPE in ML-based price predictions.",
      ],
      link: "https://satelilit.vercel.app/",
      skills: ["FastAPI", "Next.js", "Machine Learning", "Data Analysis"],
    },
    {
      title: "Product Management Intern",
      company: "VFlowTech",
      time: "May - Nov 2023",
      logo: "https://vflowtech.com/wp-content/uploads/2021/10/VFT-Logo-PNG.png",
      summary: [
        "Led product planning, execution, and cross-functional coordination.",
        "Engaged stakeholders to resolve roadblocks and maintain progress reporting.",
      ],
      skills: [
        "Agile Methodologies",
        "Stakeholder Management",
        "Cross-Functional Collaboration",
        "Data Analysis",
      ],
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  const ImageRotator = ({ images }: { images: string[] }) => {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
      const id = setInterval(
        () => setIdx((i) => (i + 1) % images.length),
        3000
      );
      return () => clearInterval(id);
    }, [images.length]);

    return (
      <AnimatePresence initial={false}>
        <motion.img
          key={images[idx]}
          src={`/projects/${images[idx]}`}
          alt=""
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
    );
  };

  return (
    <div className="flex">
      <div
        className={`bg-gradient-to-b from-slate-950 to-slate-900 shadow-lg p-6 fixed z-50 ${
          isMenuOpen
            ? "block w-full animate-expand-left-to-right h-[100%]"
            : "hidden sm:block rounded-lg h-[99%] m-1"
        }`}
      >
        {/* Sidebar */}

        <div className="flex justify-center items-center mb-4 mt-4">
          <img
            src={"profile.png"}
            width={60}
            height={70}
            className="rounded-full  shadow-[0_0_15px_rgba(0,200,255,0.4)]"
            alt="Profile Picture"
          />
          <p className="text-white text-md ml-4 font-semibold">
            Dennis Hardianto
          </p>
        </div>
        <hr className="border-slate-700 mb-6"></hr>

        <div>
          <ul>
            {navItems.map(({ id, label, icon }) => (
              <li key={id} onClick={() => handleItemClick(id)}>
                <button
                  key={selectedItem === id ? `selected-${id}` : id}
                  className={`flex overflow-hidden p-10 mb-4 items-center text-white h-9 px-4 py-2 w-full justify-between rounded-md relative group transition-all duration-300 ease-out
                  ${
                    selectedItem === id
                      ? "ring-1 ring-white"
                      : "hover:ring-1 hover:ring-offset-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                  }
                `}
                >
                  {/* Shine swipe */}
                  <span
                    key={`shine-${id}-${selectedItem === id ? "play" : "idle"}`}
                    className={`absolute right-0 -mt-12 h-32 w-8 bg-white rotate-12 opacity-10
                      ${
                        selectedItem === id
                          ? "shine-animate block"
                          : "shine-hover hidden group-hover:block"
                      }
                    `}
                  />

                  <div className="flex items-center">
                    <span
                      className={`text-lg mr-2 transition-all duration-300 ${
                        selectedItem === id
                          ? "text-blue-500 filter drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]"
                          : "text-white"
                      }`}
                    >
                      {icon}
                    </span>
                    <span>{label}</span>
                  </div>

                  <div className="ml-2 flex items-center gap-1 text-sm">
                    <svg
                      className="w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077..."
                      ></path>
                    </svg>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}

        <div className="absolute bottom-0 left-0 right-0 p-3 m-2 px-6 rounded-lg backdrop-blur-md">
          <div className="flex justify-center items-center space-x-6">
            <a
              href="https://www.linkedin.com/in/dennis-hardianto-196729218/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110 hover:brightness-125"
            >
              <img src="linkedin.svg" width={22} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/DennisH18"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110 hover:brightness-125"
            >
              <img src="github.png" width={22} alt="GitHub" />
            </a>
            <a
              href="mailto:dennis.hardianto@outlook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110 hover:brightness-125"
            >
              <img src="gmail.png" width={22} alt="Email" />
            </a>
          </div>
        </div>
      </div>

      <button
        className="sm:hidden top-4 right-4 z-50 fixed"
        onClick={handleToggleMenu}
      >
        {isMenuOpen ? (
          <AiOutlineClose className="w-6 h-6 cursor-pointer text-white" />
        ) : (
          <AiOutlineMenu className="w-6 h-6 cursor-pointer" />
        )}
      </button>

      <div className="flex flex-col flex-2 lg:ml-72 md:ml-72 mt-2">
        {/* Introduction Page */}
        <div
          ref={contentRefs.introduction}
          id="introduction"
          className="relative overflow-hidden min-h-screen flex flex-col"
        >
          <ParticlesBackground />

          <div className="w-[85%] ml-[5%] mt-24 relative">
            <div className="flex items-center text-blue-500 text-2xl z-20 relative">
              <AiOutlineCode className="mr-2" />
              <h2 className="font-mono">Intro</h2>
            </div>
            <h2 className="text-5xl font-semibold leading-tight font-sans tracking-tight">
              Hi, I'm Dennis,<br></br>
              Business Intelligence & Data Analyst
            </h2>
            <img
              src="intro-img.png"
              className="absolute right-[-40px] top-[-50px] opacity-5"
              width={800}
            />
            <hr className="border-2 border-slate-900 z-30 relative mt-4"></hr>

            <div className="relative w-full md:w-[60%] mt-10 p-6 rounded-2xl border border-white/10 bg-white/1 backdrop-blur-md shadow-xl hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] transition-all duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center gap-10">
                {/* Email */}
                <div className="flex items-center">
                  <div className="border-2 border-blue-500 p-2 rounded-lg mr-3">
                    <AiOutlineMail className="text-blue-500" />
                  </div>
                  <p className="mr-2">Dennis.hardianto@outlook.com</p>

                  <button
                    onClick={() =>
                      handleCopyEmail("dennis.hardianto@outlook.com")
                    }
                    className="relative group"
                  >
                    <TbCopy className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs text-white bg-slate-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      {copied ? "Copied!" : "Copy"}
                    </div>
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center">
                  <div className="border-2 border-blue-500 p-2 rounded-lg mr-3">
                    <AiOutlinePhone className="text-blue-500" />
                  </div>
                  <p className="mr-2">+65 8197 4871</p>
                  <button
                    onClick={() => handleCopyPhone("+65 81974871")}
                    className="relative group"
                  >
                    <TbCopy className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs text-white bg-slate-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      {copiedPhone ? "Copied!" : "Copy"}
                    </div>
                  </button>
                </div>
              </div>

              {/* Resume Button */}
              <div className="mt-6">
                <button
                  className="group flex items-center mb-8 border-2 border-blue-500 text-blue-500 rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white transition-all duration-300"
                  onClick={() => {
                    const url = "Resume Dennis Hardianto.pdf";
                    const anchor = document.createElement("a");
                    anchor.href = url;
                    anchor.download = "Resume Dennis Hardianto.pdf";
                    anchor.click();
                  }}
                >
                  <AiFillFileText className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Download Resume
                </button>
              </div>

              {/* Read More Toggle */}
              <button
                className={`mt-4 flex items-center font-medium transition-colors ${
                  showMore
                    ? "text-blue-500"
                    : "text-slate-400 hover:text-blue-500"
                }`}
                onClick={toggleShowMore}
                type="button"
              >
                Read More
                <span
                  className={`ml-2 transform transition-transform ${
                    showMore ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <AiOutlineCaretDown />
                </span>
              </button>

              {/* Expanded Text */}
              <AnimatePresence initial={false}>
                {showMore && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="mt-4 overflow-hidden rounded-xl text-slate-900 text-sm"
                  >
                    <p className="mb-4">
                      I am a graduate from{" "}
                      <strong>Singapore Management University</strong>, majoring
                      in <strong>Information Systems</strong> with a dual focus
                      in <strong>Business Analytics</strong> and{" "}
                      <strong>Digitalization</strong>.
                    </p>
                    <p className="mb-4">
                      Over the past few years, I’ve developed hands-on
                      experience in <strong>data-driven problem solving</strong>
                      , <strong>full-stack development</strong>, and building
                      robust digital solutions across industries like{" "}
                      <strong>finance</strong>, <strong>healthtech</strong>, and{" "}
                      <strong>IT</strong>.
                    </p>
                    <p>
                      I’m passionate about designing{" "}
                      <strong>intelligent systems</strong> that bridge technical
                      depth with business impact. Whether I’m building
                      dashboards for{" "}
                      <strong>real-time commodity tracking</strong>, engineering{" "}
                      <strong>backend architectures</strong> for clinical
                      workflows, or applying <strong>machine learning</strong>{" "}
                      to pricing models, I care about creating tools that{" "}
                      <strong>empower decisions</strong> and{" "}
                      <strong>scale with purpose</strong>.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Experience Section */}

        <div
          ref={contentRefs.experience}
          id="experience"
          className="min-h-screen"
        >
          <div className="w-[85%] mx-auto mt-16 relative">
            <div className="flex items-center text-blue-500 text-2xl z-30 mb-4">
              <TbBriefcase className="mr-2" />
              <h2 className="font-mono">Experience</h2>
            </div>

            <AnimatePresence>
              {showLine && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: "100%", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  variants={container}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute left-6 w-1 bg-gradient-to-b from-slate-950 to-transparent rounded-full"
                  style={{ zIndex: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                />
              )}
            </AnimatePresence>

            <motion.ol
              className="relative ps-6 border-l-4 border-transparent"
              variants={container}
              initial="hidden"
              whileInView="visible"
              exit="hidden"
              viewport={{ once: false, amount: 0.2 }}
            >
              {experiences.map((exp, index) => (
                <motion.li
                  key={index}
                  className="mb-8 ms-6 relative"
                  variants={item}
                >
                  <div className="absolute flex items-center justify-center bg-slate-50 p-4 rounded-full -start-14 h-14 w-14 shadow-xl hover:ring-2 hover:ring-slate-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={30}
                    />
                  </div>

                  <div className="ml-6">
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">
                      {exp.title}
                      {exp.badge && (
                        <span className="ml-3 inline-block text-xs font-semibold px-2 py-0.5 rounded bg-blue-600/10 text-blue-500 ring-1 ring-blue-500">
                          {exp.badge}
                        </span>
                      )}
                    </h3>

                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>{exp.company}</span>
                      <span>{exp.time}</span>
                    </div>

                    <ul className="list-disc text-sm list-inside space-y-2 text-slate-600">
                      {exp.summary.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills &&
                        exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-blue-50 text-slate-900 text-xs font-semibold px-2.5 py-0.5 rounded-lg shadow-sm hover:bg-blue-200 transition"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>

        {/* Projects Section */}

        <div
          ref={contentRefs.projects}
          id="projects"
          className="min-h-screen py-20 overflow-y-auto"
        >
          <div className="w-[85%] ml-[5%] relative">
            <div className="flex items-center text-blue-500 text-3xl z-30 mb-10">
              <AiOutlineLaptop className="mr-3" />
              <h2 className="font-mono tracking-wide">Projects</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, index) => {
                const [currentIndex, setCurrentIndex] = useState(0);

                useEffect(() => {
                  const interval = setInterval(() => {
                    setCurrentIndex((prev) => (prev + 1) % project.src.length);
                  }, 2500);
                  return () => clearInterval(interval);
                }, [project.src.length]);

                return (
                  <motion.div
                    key={index}
                    className="rounded-2xl border border-white/10 backdrop-blur-lg transition-all duration-500 flex flex-col justify-between hover:shadow-xl p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="overflow-hidden rounded-xl h-56 relative"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.img
                        src={project.src[currentIndex]}
                        alt={project.title}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-sm mb-5 leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Skills Section */}

        <div ref={contentRefs.skills} id="skills" className="min-h-screen">
          <div className="w-[85%] ml-[5%] mt-20 relative">
            <div className="flex items-center text-blue-500 text-2xl z-30 mb-6">
              <AiOutlineBulb className="mr-2" />
              <h2 className="font-mono">Skills and Expertise</h2>
            </div>
            <div className="mt-4 text-slate-900 p-4 rounded-2xl flex items-center shadow-xl">
              <div style={{ width: "15%", height: "100%" }}>
                <img src="pm.png" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-semibold">Project Management</p>

                <p>
                  I excel at coordinating teams and resources to deliver
                  projects on time, leveraging my experience as a Scrum Master
                  and Jira Integration tools
                </p>
              </div>
            </div>
            <div className="mt-4 text-slate-900 p-4 rounded-2xl flex items-center shadow-xl">
              <div style={{ width: "15%", height: "100%" }}>
                <img src="dev.png" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-semibold">Full Stack Development</p>

                <p>
                  My full stack skills encompass both frontend and backend
                  development, demonstrated in projects where I developed
                  several dynamic web applications.
                </p>
              </div>
            </div>
            <div className="mt-4 text-slate-900 p-4 rounded-2xl flex items-center shadow-xl">
              <div style={{ width: "15%", height: "100%" }}>
                <img src="dsa.png" />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-semibold">Data Analytics</p>

                <p>
                  I have a strong ability to analyze social media data and use
                  data mining techniques to derive valuable insights. My
                  expertise also includes improving decision making through
                  analytics-driven strategies
                </p>
              </div>
            </div>
          </div>
        </div>






        
      </div>
    </div>
  );
}

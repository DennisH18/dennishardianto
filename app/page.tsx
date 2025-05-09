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
} from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import { TbSchool, TbBooks } from "react-icons/tb";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCallback } from "react";
// import ParticleRing from "@/components/ui/particles";


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
        ref.current!.offsetTop <= scrollPosition &&
        ref.current!.offsetTop + ref.current!.clientHeight > scrollPosition
      ) {
        setSelectedItem(section);
        break;
      }
    }
  }, [contentRefs]);

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

  const projects = [
    {
      src: "satpai.png",
      title: "Satelilit.ai",
      description:
        "Develop Housing Valuation Analysis with Advanced Machine Learning Algorithms",
      tags: ["next.png", "fast.png", "pandas.png", "pytorch.png", "maps.png"],
    },
    {
      src: "gw.png",
      title: "Glasswindow",
      description:
        "One stop internal Hiring platform built on Test Driven Development and CI/CD",
      tags: [
        "cypress.png",
        "supabase.png",
        "pytest.png",
        "fast.png",
        "vercel.png",
      ],
    },
    {
      src: "itsa.png",
      title: "IT Solution Architecture",
      description:
        "Secure Authentication System and database architecture built on AWS cloud services",
      tags: ["aws.png", "react.png", "cog.png", "jwt.png", "sass.png"],
    },
    {
      src: "esd.png",
      title: "Leave Management System",
      description:
        "Platform for Leave Management built on Microservices architecture",
      tags: ["vue.png", "docker.png", "rmq.png", "kong.png", "pp.png"],
    },
    {
      src: "wad.png",
      title: "Unihelp",
      description:
        "Dedicated platform for University Students forum and Statistics in Singapore",
      tags: ["react.png", "firebase.png", "js.png", "bs.png", "node.png"],
    },
  ];
  const navItems = [
    { id: "introduction", label: "Introduction" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
  ];
  return (
    <div className="flex">
      <div
        className={`bg-slate-900 shadow-lg rounded-lg p-6 fixed m-1 top-0 left-0 z-50 ${
          isMenuOpen
            ? "block w-full animate-expand-left-to-right"
            : "hidden sm:block"
        }`}
        style={{ height: "calc(100% - 0.5rem)" }}
      >
        {/* <div className="flex justify-center items-center mb-2">
          <img src={"logo-white.png"} width={40} height={50} alt="logo" />
        </div> */}

        <div className="flex justify-center items-center mb-4 mt-4">
          <img
            src={"profile.png"}
            width={60}
            height={70}
            className="rounded-full"
            alt="Profile Picture"
          />
          <p className="text-white text-md ml-4 font-semibold">
            Dennis Hardianto
          </p>
        </div>
        <hr className="border-slate-700 mb-6"></hr>

        {/* Sidebar */}

        <div>
          <ul>
            {navItems.map(({ id, label }) => (
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

        <div className="absolute bottom-0 left-0 right-0 p-3 m-2 px-6 rounded-lg bg-slate-800/60 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
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
              href="mailto:dennis18hardianto@gmail.com"
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
          <AiOutlineClose className="w-6 h-6 cursor-pointer" />
        ) : (
          <AiOutlineMenu className="w-6 h-6 cursor-pointer" />
        )}
      </button>

      <div className="flex flex-col flex-2 lg:ml-72 md:ml-72 mt-2">

      {/* Introduction Page */}


        <div
          ref={contentRefs.introduction}
          id="introduction"
          className="min-h-screen flex flex-col"
        >
          <div className="w-[80%] ml-[5%] mt-24 relative">
            <div className="flex items-center text-blue-500 text-2xl z-20 relative">
              <AiOutlineCode className="mr-2" />
              <h2 className="font-mono">Intro</h2>
            </div>
            <h2 className="font-mono text-5xl text-slate-900 text-start relative z-30 mt-2">
              <TypeAnimation
                sequence={[
                  "Hi I'm Dennis, aspiring software engineer and data analyst",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h2>
            <img
              src="intro-img.png"
              className="absolute right-[-40px] top-[-50px] opacity-50"
              width={600}
            />
            <hr className="border-2 border-slate-900 z-30 relative mt-4"></hr>
            <div className="w-[50%] mt-4 text-slate-900">
              <div className="flex items-center">
                <div className="border-2 border-blue-500 p-1 rounded-xl mr-2">
                  <AiOutlineMail className="text-blue-500" />
                </div>
                <p>dennis18hardianto@gmail.com</p>
              </div>
              <div className="flex items-center mt-2">
                <div className="border-2 border-blue-500 p-1 rounded-xl mr-2">
                  <AiOutlinePhone className="text-blue-500" />
                </div>
                <p>+65 8197 4871</p>
              </div>
            </div>
            <div className="w-[50%] mt-4">
              <div className="flex items-center">
                <button
                  className="rounded-2xl px-4 p-1 flex items-center bg-transparent border-blue-500 border-2 hover:bg-blue-500 text-blue-500 hover:text-white"
                  onClick={() => {
                    const url = "Resume Dennis Hardianto.pdf"; // Replace with actual URL
                    const anchor = document.createElement("a");
                    anchor.href = url;
                    anchor.download = "Resume Dennis Hardianto.pdf";
                    anchor.click();
                  }}
                >
                  <AiFillFileText className="mr-2" />
                  Download Resume
                </button>
              </div>
            </div>
            <button
              className={`text-start mt-4 flex items-center hover:text-blue-500 ${
                showMore ? "text-blue-500" : "text-slate-500"
              }`}
              onClick={toggleShowMore}
            >
              Read More
              <span
                className={`ml-2 transition-transform transform ${
                  showMore ? "rotate-180" : "rotate-0"
                }`}
              >
                <AiOutlineCaretDown />
              </span>
            </button>
            {showMore && (
              <div className="w-[50%] bg-slate-50 p-4 animate-expand rounded-lg mt-2 shadow-xl relative z-10">
                <p className="mt-4 text-slate-900 AiOutlineCaretUp">
                  I am a Graduate from Singapore Management University, studying
                  Bachelor of Information Systems
                </p>
                <p className="mt-4 text-slate-900">
                  I am passionate about technology and its potential to solve
                  real-world problems. I have experience in software
                  development, data analysis, and machine learning.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div
          ref={contentRefs.education}
          id="education"
          className="min-h-screen"
        >
          <div className="w-[80%] ml-[10%] relative mt-24">
            <div className="flex items-center text-blue-500 text-2xl z-30">
              <TbSchool className="mr-2" />
              <h2 className="font-mono">Education</h2>
            </div>
            <div className="mt-4 text-slate-900 p-4 bg-slate-50 rounded-2xl flex items-center shadow-xl">
              <div style={{ width: "15%", height: "100%" }}>
                <img src="smu.png" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-semibold">Singapore Management University</p>
                <div className="flex items-center mt-2 text-slate-500">
                  <div className="mr-2">
                    <AiFillCalendar />
                  </div>
                  <p>2021 - 2024</p>
                </div>
                <p className="mt-2">Bachelor of Information Systems</p>
                <p className="mt-2 font-semibold">Dual track in</p>
                <div className="flex flex-col items-center mt-4 md:flex-row md:justify-center ">
                  <div className="w-full md:w-1/2 flex items-center justify-center md:mt-0 mx-auto bg-white p-4 rounded-3xl shadow-lg m-4">
                    <div className="text-center">
                      <p className="mt-2 font-semibold">Business Analytics</p>
                      <img
                        src="ba.png"
                        alt="Business Analytics"
                        width={60}
                        className="mx-auto"
                      />
                      <ul className="list-disc list-inside mt-2 text-left">
                        <li>Data Mining and Business Analytics</li>
                        <li>Financial Analytics</li>
                        <li>Social Analytics and Applications</li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-4"></div>
                  <div className="w-full md:w-1/2 flex items-center justify-center md:mt-0 mx-auto bg-white p-4 rounded-3xl shadow-lg m-4">
                    <div className="text-center">
                      <p className="mt-2 font-semibold">
                        Digitalization and Cloud Solutions
                      </p>
                      <img
                        src="dcs.png"
                        alt="Digitalization and Cloud Solutions"
                        width={60}
                        className="mx-auto"
                      />
                      <ul className="list-disc list-inside mt-2 text-left">
                        <li>IT Solution Architecture</li>
                        <li>Digital Transformation Strategy</li>
                        <li>Enterprise Business Solution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-slate-900 p-4 bg-slate-50 rounded-2xl flex items-center shadow-xl">
              <div style={{ width: "15%", height: "100%" }}>
                <img
                  src="https://www.ibo.org/globalassets/new-structure/icons-and-logos/images/ib-world-school-logo-1-colour-rev.png"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-semibold">Tunas Muda School</p>
                <div className="flex items-center mt-2 text-slate-500">
                  <div className="mr-2">
                    <AiFillCalendar />
                  </div>
                  <p>2018 - 2021</p>
                </div>
                <ul className="list-disc list-inside mt-2">
                  <li>International Baccaulareaute Diploma</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={contentRefs.experience}
          id="experience"
          className="min-h-screen"
        >
          <div className="w-[70%] ml-[10%] mt-16 relative">
            <div className="flex items-center text-blue-500 text-2xl z-30 mb-4">
              <TbBooks className="mr-2" />
              <h2 className="font-mono">Experience</h2>
            </div>

            <ol className="relative border-s-4 border-slate-700">
              <li className="mb-10 ms-6">
                <div className="absolute flex items-center justify-center bg-slate-50 p-4 rounded-full -start-8 shadow-xl">
                  <img src="cofco.png" alt="Your Logo" width={30} />
                </div>
                <div className="ml-6">
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 ">
                    Analyst
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded light:bg-blue-900 dark:text-blue-300 ms-3">
                      Latest
                    </span>
                  </h3>
                  <div className="flex flex-row justify-between mb-2">
                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      COFCO International
                    </time>

                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      August 2024 - February 2025
                    </time>
                  </div>
                  <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Collaborated with traders and operations teams to
                    understand workflow requirements, identifying opportunities
                    for process improvement and automation, resulted in an
                    increase in operational efficiency in commodity trading.
                  </p>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Developed and maintained Python applications to automate
                    data analysis and reporting tasks, reducing manual
                    processing time and enhancing accuracy of commodity price
                    monitoring and risk management.
                  </p>
                </div>
              </li>
              <li className="mb-10 ms-6">
                <div className="absolute flex items-center justify-center bg-slate-50 p-4 rounded-full -start-8 shadow-xl">
                  <img src="marymount.png" alt="Your Logo" width={30} />
                </div>
                <div className="ml-6">
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 ">
                    Software Engineering Intern
                  </h3>
                  <div className="flex flex-row justify-between mb-2">
                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      Marymount Labs
                    </time>

                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      May 2024 - August 2024
                    </time>
                  </div>
                  <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Spearheaded development of robust and scalable backend
                    architectures with Redis, Flask, and Streamlit for digital
                    health solutions, implementing end-to-end systems for
                    preventive health campaigns and patient stratification.
                  </p>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Engineered front-end assets leveraging Next.js and
                    Tailwind, created secured digital forms for clinical
                    operations, streamlining processes and enhancing
                    presentation of digital health solutions.
                  </p>
                  <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Conducted statistical analysis research for vaccination
                    interventions using Python to developed an automated
                    screening tool, and performed ad-hoc data analysis projects,
                    improving data-driven decision-making in medical
                    institutions.
                  </p>
                </div>
              </li>
              <li className="mb-10 ms-6">
                <div className="absolute flex items-center justify-center bg-slate-50 p-4 rounded-full -start-8 shadow-xl">
                  <img src="adi.png" alt="Your Logo" width={30} />
                </div>
                <div className="ml-6">
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 ">
                    Software Engineer
                  </h3>
                  <div className="flex flex-row justify-between mb-2">
                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      Aboitiz Data Innovation
                    </time>

                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      January 2023 - April 2024
                    </time>
                  </div>
                  <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Implemented a user-friendly platform with NextJS for
                    front-end and FastAPI on Digital Ocean, ensuring high
                    availability, scalability, and seamless integration of
                    machine learning models
                  </p>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Achieved ~9% Mean Absolute Percentage Error in property
                    price predictions through integration of advanced machine
                    learning models within a web application for real estate
                    valuation
                  </p>
                  <a
                    href="https://satelilit.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl px-4 p-1 bg-transparent border-blue-500 border-2 hover:bg-blue-500 text-blue-500 hover:text-white w-44 flex items-center"
                  >
                    <AiFillPlayCircle className="mr-2 ml-1" />
                    View Product
                  </a>
                </div>
              </li>
              <li className="mb-10 ms-6">
                <div className="absolute flex items-center justify-center bg-slate-50 p-1 py-4 rounded-full -start-8 shadow-xl">
                  <img
                    src="https://vflowtech.com/wp-content/uploads/2021/10/VFT-Logo-PNG.png"
                    alt="Your Logo"
                    width={50}
                  />
                </div>
                <div className="ml-6">
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 ">
                    Product Management Intern
                  </h3>
                  <div className="flex flex-row justify-between mb-2">
                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      VFlowTech
                    </time>
                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      May 2023 - Nov 2023
                    </time>
                  </div>
                  <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Developed product plan and milestones, execution of
                    project and coordination with other departments, and
                    preparing product report and visualization of status
                  </p>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Communicate and engage with stakeholders to ensure end
                    products or processes will solve related challenges,
                    including product status, roadblocks, and escalations to
                    Management
                  </p>
                </div>
              </li>
              <li className="mb-10 ms-6">
                <div className="absolute flex items-center justify-center bg-slate-50 p-2 rounded-full -start-8 shadow-xl">
                  <img src="smua.png" alt="Your Logo" width={45} />
                </div>
                <div className="ml-6">
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 ">
                    Student Assistant
                  </h3>
                  <div className="flex flex-row justify-between mb-2">
                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      SMU Academy
                    </time>
                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      July 2022 - Present
                    </time>
                  </div>
                  <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Facilitate Course support for SkillsFuture funded courses
                    for working professionals in partnership with the Government
                    for Technology and Intelligent Systems, Service, Operations,
                    and Business management courses
                  </p>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    • Conduct compilation of attendance, assessments, evaluation
                    reports. Approving and verifying participants registrations.
                    Setting up of units in learning management system. Creation
                    of administrative documents.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div ref={contentRefs.projects} id="projects" className="min-h-screen">
          <div className="w-[75%] ml-[10%] mt-20 relative">
            <div className="flex items-center text-blue-500 text-2xl z-30 mb-4">
              <AiOutlineLaptop className="mr-2" />
              <h2 className="font-mono">Projects</h2>
            </div>
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="-ml-1">
                {projects.map((project, index) => (
                  <CarouselItem
                    key={index}
                    className="p-3 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="bg-slate-50 shadow-md rounded-lg h-[500px] hover:rounded-lg">
                      <img
                        src={project.src}
                        alt={`Image ${index + 1}`}
                        className="rounded-t-lg shadow-lg mb-6"
                      />
                      <div className="px-2 mx-4">
                        <h3 className="text-lg font-semibold mx-auto text-center font-mono mb-2">
                          {project.title}
                        </h3>
                        <p className="mb-4 mx-auto">{project.description}</p>
                        <div className="grid grid-cols-5 gap-2 mx-auto">
                          {project.tags.map((tag, tagIndex) => (
                            <div
                              key={tagIndex}
                              className="flex items-center justify-center w-8 h-8 justify-self-center"
                              style={{ minWidth: "32px", minHeight: "32px" }}
                            >
                              <img
                                src={tag}
                                alt={tag}
                                className="rounded-lg shadow-md p-1 hover:scale-110 object-contain h-full w-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div ref={contentRefs.skills} id="skills" className="min-h-screen">
          <div className="w-[75%] ml-[10%] mt-20 relative">
            <div className="flex items-center text-blue-500 text-2xl z-30 mb-6">
              <AiOutlineBulb className="mr-2" />
              <h2 className="font-mono">Skills and Expertise</h2>
            </div>
            <div className="mt-4 text-slate-900 p-4 bg-slate-50 rounded-2xl flex items-center shadow-xl">
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
            <div className="mt-4 text-slate-900 p-4 bg-slate-50 rounded-2xl flex items-center shadow-xl">
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
            <div className="mt-4 text-slate-900 p-4 bg-slate-50 rounded-2xl flex items-center shadow-xl">
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

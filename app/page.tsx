"use client";
import React, { useState, useRef, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineCode,
  AiOutlineCaretDown,
  AiOutlineCaretUp,
} from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";

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

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 150; // Add some offset to the scroll position
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
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex">
      <div
        className={`bg-slate-900 shadow-lg rounded-lg p-6 fixed m-2 top-0 left-0 z-50 ${
          isMenuOpen
            ? "block w-full animate-expand-left-to-right"
            : "hidden sm:block"
        }`}
        style={{ height: "calc(100% - 1rem)" }}
      >
        <div className="flex justify-center items-center mb-2">
          <img src={"logo-white.png"} width={40} height={50} alt="logo" />
        </div>

        <div className="flex justify-center items-center mb-4">
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
        <div>
          <ul>
            <li
              className={`mb-2 p-2 hover:bg-slate-800 rounded-lg ${
                selectedItem === "introduction"
                  ? "bg-slate-700 animate-expand-left-to-right"
                  : ""
              }`}
              onClick={() => handleItemClick("introduction")}
            >
              <a href="#introduction" className="text-white">
                Introduction
              </a>
            </li>
            <li
              className={`mb-2 p-2 hover:bg-slate-800 rounded-lg ${
                selectedItem === "education"
                  ? "bg-slate-700 animate-expand-left-to-right"
                  : ""
              }`}
              onClick={() => handleItemClick("education")}
            >
              <a href="#education" className="text-white">
                Education
              </a>
            </li>
            <li
              className={`mb-2 p-2 hover:bg-slate-800 rounded-lg ${
                selectedItem === "experience"
                  ? "bg-slate-700 animate-expand-left-to-right"
                  : ""
              }`}
              onClick={() => handleItemClick("experience")}
            >
              <a href="#experience" className="text-white">
                Experience
              </a>
            </li>
            <li
              className={`mb-2 p-2 hover:bg-slate-800 rounded-lg ${
                selectedItem === "projects"
                  ? "bg-slate-700 animate-expand-left-to-right"
                  : ""
              }`}
              onClick={() => handleItemClick("projects")}
            >
              <a href="#projects" className="text-white">
                Projects
              </a>
            </li>
            <li
              className={`mb-2 p-2 hover:bg-slate-800 rounded-lg ${
                selectedItem === "skills"
                  ? "bg-slate-700 animate-expand-left-to-right"
                  : ""
              }`}
              onClick={() => handleItemClick("skills")}
            >
              <a href="#skills" className="text-white">
                Skills
              </a>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-4 left-0 right-0 pb-4">
          <p className="ml-6 mb-4 text-white text-sm font-semibold">
            Get in touch
          </p>
          <div className="flex justify-center items-center">
            <a
              href="https://www.linkedin.com/in/dennis-hardianto-196729218/"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-6 hover:scale-110"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
                width={22}
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://github.com/DennisH18"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-6 hover:scale-110"
            >
              <img src="github.png" width={22} alt="GitHub" />
            </a>
            <a
              href="mailto:dennis18hardianto@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
                width={22}
                alt="Email"
              />
            </a>
          </div>
        </div>
      </div>

      <button
        className="sm:hidden top-4 right-4 z-50 fixed"
        onClick={handleToggleMenu}
      >
        {isMenuOpen ? (
          <AiOutlineClose className="w-6 h-6 text-white cursor-pointer" />
        ) : (
          <AiOutlineMenu className="w-6 h-6 text-white cursor-pointer" />
        )}
      </button>

      <div className="flex flex-col flex-1 lg:ml-72 md:ml-72 mt-2">
        <div
          ref={contentRefs.introduction}
          id="introduction"
          className="min-h-screen flex flex-col"
        >
          <div className="w-[70%] ml-[10%] mt-32 relative">
            <div className="flex items-center text-blue-500 text-2xl z-30">
              <AiOutlineCode className="mr-2" />
              <h2 className="font-mono">Intro</h2>
            </div>
            <h2 className="font-mono text-4xl text-slate-900 text-start relative z-30">
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
              className="absolute z-20 right-[-20px] top-[-50px]"
              width={600}
            />
            <hr className="border-2 border-slate-900 z-20 mt-4"></hr>
            <button
              className={`text-start mt-4 flex items-center hover:text-blue-500 ${showMore ? 'text-blue-500': 'text-slate-500'}`}
              onClick={toggleShowMore}
            >
              View More
              <span className={`ml-2 transition-transform transform ${showMore ? 'rotate-180' : 'rotate-0'}`}>
                <AiOutlineCaretDown />
              </span>
            </button>
            {showMore && (
              <div className={`w-[50%] bg-slate-50 p-4 ${showMore ? 'h-auto' : 'h-0 overflow-hidden'} transition-height duration-500 ease-in-out`}>
  <p className="mt-4 text-slate-900">
    I am a final year student at the Singapore Management
    University, studying Bachelor of Information Systems
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
        <div
          ref={contentRefs.education}
          id="education"
          className="min-h-screen bg-blue-400"
        >
          Education section content
        </div>
        <div
          ref={contentRefs.experience}
          id="experience"
          className="min-h-screen bg-green-400"
        >
          Experience section content
        </div>
        <div
          ref={contentRefs.projects}
          id="projects"
          className="min-h-screen bg-yellow-400"
        >
          Projects section content
        </div>
        <div
          ref={contentRefs.skills}
          id="skills"
          className="min-h-screen bg-purple-400"
        >
          Skills section content
        </div>
      </div>
    </div>
  );
}

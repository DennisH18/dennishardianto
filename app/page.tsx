"use client";
import React, { useState, useRef, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

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

  return (
    <div className="flex">
      <div
        className={`bg-slate-900 shadow-lg rounded-lg p-6 fixed m-2 top-0 left-0 z-50 h-full ${
          isMenuOpen ? "block w-full" : "hidden sm:block"
        }`}
        style={{ height: "calc(100% - 1rem)" }}
      >
        <div className="flex justify-center items-center mb-2">
          <img src={"logo-white.png"} width={40} height={50} alt="logo" />
        </div>

        <div className="flex justify-center items-center mb-4">
          <img
            src={"profile.png"}
            width={40}
            height={50}
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
        className="sm:hidden absolute top-4 right-4 z-50"
        onClick={handleToggleMenu}
      >
        <svg
          className="w-6 h-6 text-white cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      <div className="flex flex-col flex-1 lg:ml-64 mt-2">
        <div
          ref={contentRefs.introduction}
          id="introduction"
          className="min-h-screen bg-red-400"
        >
          Introduction section content
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

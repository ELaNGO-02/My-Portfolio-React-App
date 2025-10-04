"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

 const experiences = [
  {
    title: "Developer",
    company: "ATMA AI SOLUTIONS",
    period: "Apr 2025 - Present",
    description:
      "Leading Sitecore Headless integration and performance optimization. Building scalable, high-performing e-commerce solutions with modern tech stacks.",
    projects: [
      { name: "WipeNew E-commerce", url: "https://www.wipenew.com/" },
      { name: "Rust-O Industrial", url: "https://www.rust-o.com/" },
    ],
    achievements: [
      "Built Sitecore Headless Next.js + BigCommerce PoC approved by the client.",
      "Enhanced SSR rendering for speed & SEO.",
      "Integrated custom widgets and APIs.",
      "Contributed 40% to two end-to-end BigCommerce projects.",
    ],
    technologies: ["Sitecore", "Next.js", "BigCommerce", "React.js", "SCSS", "SSR"],
  },
  {
    title: "IT Solutions Developer Intern",
    company: "ATMA AI SOLUTIONS",
    period: "Aug 2024 - Mar 2025",
    description:
      "Worked on BigCommerce and React projects focusing on UI/UX optimization, custom theme development, and responsive storefront design.",
    projects: [
      { name: "WipeNew E-commerce", url: "https://www.wipenew.com/" },
      { name: "Rust-O Industrial", url: "https://www.rust-o.com/" },
    ],
    achievements: [
      "Customized BigCommerce storefronts using Handlebars and SCSS.",
      "Integrated REST and GraphQL APIs.",
      "Developed reusable UI components in React.",
      "Contributed 40% to two complete BigCommerce projects.",
    ],
    technologies: ["BigCommerce", "React.js", "Next.js", "SCSS", "GraphQL", "REST API"],
  },
  {
    title: "Intern",
    company: "MEISTER SOLUTIONS",
    period: "Jan 2024 - Jul 2024",
    description:
      "Worked on BigCommerce customization using Handlebars.js and SCSS, integrating custom widgets and optimizing storefront performance. Contributed to a C# project assisting in backend development and API integration.",
    projects: [],
    achievements: [
      "Implemented responsive UI components using React.js and Next.js.",
      "Collaborated with team to debug, optimize, and maintain scalable code.",
      "Gained hands-on experience with modern web development practices.",
    ],
    technologies: ["BigCommerce", "React.js", "Next.js", "SCSS", "C#", "REST API"],
  },
  {
    title: "Intern",
    company: "Embuzz Technologies Private Limited",
    period: "Jul 2023 - Aug 2023",
    description:
      "Worked on embedded systems and embedded C programming for AVR microcontrollers, including developing a project with AVR ATmega16. Gained real-world experience aligning software with hardware features.",
    projects: [
      { name: "AVR ATmega16 Project", url: "#" },
    ],
    achievements: [
      "Refined embedded C programming skills with AVR microcontrollers.",
      "Received mentorship and guidance from senior engineers.",
      "Gained hands-on experience in embedded system development.",
    ],
    technologies: ["Embedded C", "AVR", "Microcontrollers", "Problem Solving"],
  },
  {
    title: "Trainee",
    company: "L&T Electrical & Automation",
    period: "Aug 2021 - Aug 2022",
    description:
      "Apprenticeship focusing on low voltage switchboards, hardware auditing, SAP ERP, relay programming, and corporate workflow. Developed both technical and professional skills in a corporate environment.",
    projects: [],
    achievements: [
      "Handled and audited multiple spare parts for low voltage switchboards.",
      "Learned SAP ERP under mentorship and improved problem-solving skills.",
      "Gained exposure to relay programming and hands-on hardware troubleshooting.",
    ],
    technologies: ["SAP ERP", "Problem Solving", "Microsoft Office", "Relay Programming", "Electrical Systems"],
  },
];


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          experiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) =>
                prev.includes(index) ? prev : [...prev, index]
              );
            }, index * 400);
          });
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("experience");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, [isVisible, experiences]);

  return (
    <section
      id="experience"
      className="relative py-28 bg-[#05060f] text-white overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b14] via-[#05060f] to-[#080a12]" />

      {/* Center glowing line (behind cards now) */}
      <div className="absolute left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-[#00e0ff]/80 via-[#0090ff]/40 to-transparent blur-sm transform -translate-x-1/2 z-0" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#00e0ff]/40 blur-sm"
            animate={{ y: [0, -60, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            style={{
              left: `${10 + i * 9}%`,
              top: `${30 + (i % 5) * 12}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-20 text-center bg-gradient-to-r from-[#00e0ff] via-[#80d0ff] to-[#9cb5d4] bg-clip-text text-transparent drop-shadow-[0_0_15px_#00e0ff]"
        >
          Experience
        </motion.h2>

        <div className="relative flex flex-col space-y-32">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
                  x: isLeft ? -100 : 100,
                  rotateY: isLeft ? -10 : 10,
                }}
                animate={
                  visibleItems.includes(index)
                    ? { opacity: 1, y: 0, x: 0, rotateY: 0 }
                    : {}
                }
                transition={{ duration: 1, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Connector Dot */}
                <div className="absolute left-1/2 top-10 transform -translate-x-1/2 z-0">
                  <div className="w-5 h-5 rounded-full bg-[#00e0ff] shadow-[0_0_30px_#00e0ff] animate-pulse" />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 40px rgba(0,224,255,0.3)",
                    transition: { duration: 0.4 },
                  }}
                  className={`relative bg-[#0b0e1a]/90 border border-[#1b1d2f] hover:border-[#00e0ff]/40 rounded-2xl p-8 md:w-[45%] backdrop-blur-md shadow-[0_0_25px_rgba(0,224,255,0.15)] ${
                    isLeft
                      ? "md:ml-0 md:mr-auto md:translate-x-[-50px]"
                      : "md:mr-0 md:ml-auto md:translate-x-[50px]"
                  }`}
                  style={{
                    zIndex: 5, // Keeps card above timeline
                  }}
                >
                  <h3 className="text-2xl font-semibold text-[#00e0ff] mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {exp.company} • {exp.period}
                  </p>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <h4 className="font-semibold text-[#00e0ff]/90 mb-2">
                    Achievements
                  </h4>
                  <ul className="list-disc list-inside text-gray-400 mb-4 space-y-1">
                    {exp.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#00e0ff]/90 mb-2">
                      Projects
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {exp.projects.map((proj, i) => (
                        <a
                          key={i}
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#80dfff] hover:text-white underline underline-offset-2 text-sm transition"
                        >
                          {proj.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-[#141527]/90 border border-[#1b1c28] text-gray-300 text-xs px-3 py-1 rounded-full hover:bg-[#00e0ff]/10 transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


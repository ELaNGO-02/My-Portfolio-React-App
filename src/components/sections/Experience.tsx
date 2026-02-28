'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const experiences = [
    {
      title: 'Developer',
      company: 'ATMA AI SOLUTIONS',
      period: 'Apr 2025 - Present',
      description:
        'Leading Sitecore Headless integration and performance optimization. Building scalable, high-performing e-commerce solutions with modern tech stacks.',
      projects: [
        { name: 'WipeNew E-commerce', url: 'https://www.wipenew.com/' },
        { name: 'Rust-O Industrial', url: 'https://www.rust-o.com/' },
      ],
      achievements: [
        'Built Sitecore Headless Next.js + BigCommerce PoC approved by the client.',
        'Enhanced SSR rendering for speed & SEO.',
        'Integrated custom widgets and APIs.',
        'Contributed 40% to two end-to-end BigCommerce projects.',
      ],
      technologies: ['Sitecore', 'Next.js', 'BigCommerce', 'React.js', 'SCSS', 'SSR'],
    },
    {
      title: 'IT Solutions Developer Intern',
      company: 'ATMA AI SOLUTIONS',
      period: 'Aug 2024 - Mar 2025',
      description:
        'Worked on BigCommerce and React projects focusing on UI/UX optimization, custom theme development, and responsive storefront design.',
      projects: [
        { name: 'WipeNew E-commerce', url: 'https://www.wipenew.com/' },
        { name: 'Rust-O Industrial', url: 'https://www.rust-o.com/' },
      ],
      achievements: [
        'Customized BigCommerce storefronts using Handlebars and SCSS.',
        'Integrated REST and GraphQL APIs.',
        'Developed reusable UI components in React.',
        'Contributed 40% to two complete BigCommerce projects.',
      ],
      technologies: ['BigCommerce', 'React.js', 'Next.js', 'SCSS', 'GraphQL', 'REST API'],
    },
    {
      title: 'Intern',
      company: 'MEISTER SOLUTIONS',
      period: 'Jan 2024 - Jul 2024',
      description:
        'Worked on BigCommerce customization using Handlebars.js and SCSS, integrating custom widgets and optimizing storefront performance.',
      projects: [],
      achievements: [
        'Implemented responsive UI components using React.js and Next.js.',
        'Collaborated with team to debug, optimize, and maintain scalable code.',
        'Gained hands-on experience with modern web development practices.',
      ],
      technologies: ['BigCommerce', 'React.js', 'Next.js', 'SCSS', 'C#', 'REST API'],
    },
    {
      title: 'Intern',
      company: 'Embuzz Technologies Private Limited',
      period: 'Jul 2023 - Aug 2023',
      description:
        'Worked on embedded systems and embedded C programming for AVR microcontrollers.',
      projects: [{ name: 'AVR ATmega16 Project', url: '#' }],
      achievements: [
        'Refined embedded C programming skills with AVR microcontrollers.',
        'Received mentorship and guidance from senior engineers.',
        'Gained hands-on experience in embedded system development.',
      ],
      technologies: ['Embedded C', 'AVR', 'Microcontrollers', 'Problem Solving'],
    },
    {
      title: 'Trainee',
      company: 'L&T Electrical & Automation',
      period: 'Aug 2021 - Aug 2022',
      description:
        'Apprenticeship focusing on low voltage switchboards, hardware auditing, SAP ERP, relay programming, and corporate workflow.',
      projects: [],
      achievements: [
        'Handled and audited multiple spare parts for low voltage switchboards.',
        'Learned SAP ERP under mentorship and improved problem-solving skills.',
        'Gained exposure to relay programming and hardware troubleshooting.',
      ],
      technologies: ['SAP ERP', 'Problem Solving', 'Microsoft Office', 'Relay Programming', 'Electrical Systems'],
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
            }, index * 350);
          });
        }
      },
      { threshold: 0.05 }
    );

    const section = document.getElementById('experience');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, [isVisible, experiences]);

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-28 text-white overflow-hidden"
    >
      {/* Background — transparent to reveal 3D universe */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/70 via-[#0a0b14]/60 to-[#05060f]/70" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="font-mono text-xs text-[#915EFF]/60 tracking-widest uppercase">{'// career.log'}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="mt-4 h-[2px] w-16 mx-auto bg-gradient-to-r from-[#915EFF] to-[#00bfff] rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 sm:left-7 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#915EFF]/50 via-[#00bfff]/30 to-transparent md:-translate-x-[1px]" />

          <div className="space-y-10 sm:space-y-14 md:space-y-20">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className="relative">
                  {/* Dot */}
                  <div className="absolute left-[14px] sm:left-[22px] md:left-1/2 top-6 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#915EFF] shadow-[0_0_12px_rgba(145,94,255,0.6)] md:-translate-x-1/2 z-10 border-2 border-[#05060f]" />

                  {/* Card */}
                  <div className={`pl-10 sm:pl-16 md:pl-0 md:flex ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2" />
                    <motion.div
                      className={`md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
                      initial={{ opacity: 0, y: 30, x: isLeft ? 40 : -40 }}
                      animate={visibleItems.includes(index) ? { opacity: 1, y: 0, x: 0 } : {}}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      {/* Terminal-style card */}
                      <div className="rounded-xl border border-white/[0.06] bg-[#0d1117]/60 backdrop-blur-2xl overflow-hidden hover:border-[#915EFF]/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(145,94,255,0.08)]">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22]/80 border-b border-white/5">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                          </div>
                          <span className="ml-1 text-[10px] text-gray-500 font-mono">{exp.company.toLowerCase().replace(/\s+/g, '-')}.ts</span>
                        </div>

                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-white">{exp.title}</h3>
                            <span className="shrink-0 text-[10px] sm:text-xs font-mono text-[#915EFF]/70 bg-[#915EFF]/10 px-2 py-0.5 rounded-full">{exp.period}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#00bfff] font-medium mb-3">{exp.company}</p>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{exp.description}</p>

                          {/* Achievements */}
                          <ul className="space-y-1.5 mb-4">
                            {exp.achievements.map((a, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                                <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Projects */}
                          {exp.projects.length > 0 && (
                            <div className="mb-3">
                              <div className="flex flex-wrap gap-2">
                                {exp.projects.map((proj, i) => (
                                  <a
                                    key={i}
                                    href={proj.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#915EFF] hover:text-[#00bfff] text-xs font-mono underline underline-offset-2 transition-colors"
                                  >
                                    {proj.name} ↗
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-gray-400 hover:text-[#915EFF] hover:border-[#915EFF]/20 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

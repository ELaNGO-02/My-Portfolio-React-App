import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profileImage from '../../assets/company/logo.jpg';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiGraphql,
  SiSpringboot,
  SiMongodb,
  SiMysql,
  SiGit,
  SiPostman,
  SiLinux,
  SiDotnet,
} from "react-icons/si";
import { FaMicrosoft, FaNodeJs } from 'react-icons/fa';

const techStack = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'C#', icon: <SiDotnet /> },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Redux', icon: <SiRedux /> },
      { name: 'TailwindCSS', icon: <SiTailwindcss /> },
    ],
  },
  {
    title: 'Backend & CMS',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'BigCommerce', icon: <SiGit /> },
      { name: 'GraphQL', icon: <SiGraphql /> },
      { name: 'REST API', icon: <SiPostman /> },
      { name: 'Spring Boot', icon: <SiSpringboot /> },
    ],
  },
  {
    title: 'Database & Cloud',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'Azure', icon: <FaMicrosoft /> },
      { name: 'Vercel', icon: <SiGit /> },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'VS Code', icon: <SiPostman /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'Linux', icon: <SiLinux /> },
    ],
  },
];

const stats = [
  { label: 'Years Exp.', value: '2+' },
  { label: 'Projects', value: '15+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Awards', value: '4' },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Section background — transparent to reveal 3D universe */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/70 via-[#0a0b14]/60 to-[#05060f]/70" />

      <div className="container mx-auto max-w-6xl relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs text-[#915EFF]/60 tracking-widest uppercase">{'// who am i'}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#00bfff]">Me</span>
          </h2>
          <div className="mt-4 h-[2px] w-16 mx-auto bg-gradient-to-r from-[#915EFF] to-[#00bfff] rounded-full" />
        </motion.div>

        {/* Profile + bio row */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start mb-16 sm:mb-20">
          {/* Image + stats column */}
          <motion.div
            className="lg:col-span-2 flex flex-col items-center"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative group mb-8">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#915EFF] to-[#00bfff] opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-[#915EFF]/30 shadow-[0_0_30px_rgba(145,94,255,0.15)]">
                <motion.img
                  src={profileImage}
                  alt="ELANGO T"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#00bfff]">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio column */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="rounded-xl border border-white/[0.06] bg-[#0d1117]/60 backdrop-blur-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_50px_rgba(145,94,255,0.08)] transition-all duration-500">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22]/80 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-2 text-[11px] text-gray-500 font-mono">about.md</span>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Hello! I'm <span className="text-[#915EFF] font-semibold">ELANGO T</span>, a passionate full-stack developer with extensive experience in BigCommerce, hands-on experience with Sitecore, and a keen interest in exploring AI-powered web solutions.
                </p>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  I specialize in <span className="text-[#00bfff]">React, Next.js, TypeScript</span>, and modern web technologies, transforming complex business requirements into scalable, high-performance applications.
                </p>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  I thrive on building immersive e-commerce experiences, integrating APIs, and optimizing performance for seamless user interactions. Beyond coding, I enjoy exploring AI, 3D web technologies, and advanced performance optimizations.
                </p>
                <div className="pt-2 border-t border-white/5">
                  <p className="text-[#915EFF]/70 font-mono text-xs italic">
                    "Turning ideas into code, and code into AI-powered, immersive experiences."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech stack grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-mono text-xs text-[#915EFF]/60 tracking-wider">{'// tech_stack'}</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#915EFF]/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {techStack.map((group, gi) => (
              <motion.div
                key={group.title}
                className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-4 hover:border-[#915EFF]/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + gi * 0.08 }}
              >
                <h3 className="text-sm font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#00bfff]">
                  {group.title}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="group flex items-center gap-2 p-2 rounded-lg border border-transparent hover:border-[#915EFF]/15 hover:bg-[#915EFF]/5 transition-all duration-200 cursor-default"
                      whileHover={{ x: 3 }}
                    >
                      <span className="text-base text-[#00bfff] group-hover:text-[#915EFF] transition-colors">{skill.icon}</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

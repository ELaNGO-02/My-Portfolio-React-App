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
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'C#', icon: <SiDotnet /> },
    ],
  },
  {
    title: 'Frontend Development',
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
      { name: 'BigCommerce', icon: <SiGit /> }, // placeholder
      { name: 'GraphQL', icon: <SiGraphql /> },
      { name: 'REST API', icon: <SiPostman /> },
      { name: 'Spring Boot', icon: <SiSpringboot /> },
    ],
  },
  {
    title: 'Databases & Cloud',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'Azure', icon: <FaMicrosoft /> },
      { name: 'Vercel', icon: <SiGit /> }, // placeholder
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'VS Code', icon: <SiPostman /> }, // placeholder
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'Linux', icon: <SiLinux /> },
    ],
  },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="min-h-screen py-16 px-6 relative overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto">
        <motion.h2
          className="text-[2.5rem] md:text-[3.5rem] font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-[#915EFF]">Me</span>
        </motion.h2>

        <div ref={ref} className="grid md:grid-cols-2 gap-8 items-start">
          {/* Profile Image */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-center relative group">
              <div className="absolute inset-0 bg-[#915EFF]/20 rounded-full blur-2xl group-hover:bg-[#915EFF]/30 transition-all" />
              <motion.img
                src={profileImage}
                alt="ELANGO T"
                className="relative w-52 h-52 md:w-64 md:h-64 rounded-full object-cover border-4 border-[#915EFF]/30"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="pt-8 text-gray-300 text-base mb-6 leading-relaxed ">
                Hello! I’m ELANGO T, a passionate full-stack developer with extensive experience in BigCommerce, hands-on experience with Sitecore, and a keen interest in exploring AI-powered web solutions. I specialize in React, Next.js, TypeScript, and modern web technologies, transforming complex business requirements into scalable, high-performance applications.

                I thrive on building immersive e-commerce experiences, integrating APIs, and optimizing performance for seamless user interactions. Beyond coding, I enjoy exploring AI, 3D web technologies, and advanced performance optimizations to push the boundaries of modern web development.

                My goal is to create beautiful, functional, and high-impact web applications that delight users and clients alike.

            </p>
            <h4>“Turning ideas into code, and code into AI-powered, immersive experiences.”</h4>
        
          </motion.div>

          {/* Bio & Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >

            {techStack.map((group) => (
              <div key={group.title} className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-[#915EFF]">{group.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="p-2 rounded-lg border border-gray-700 flex flex-col items-center justify-center hover:shadow-lg transition-all cursor-pointer bg-[#111111]"
                      whileHover={{ y: -3, scale: 1.05 }}
                    >
                      <div className="text-2xl mb-1 text-[#00BFFF]">{skill.icon}</div>
                      <p className="text-xs font-medium text-gray-200 text-center">{skill.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

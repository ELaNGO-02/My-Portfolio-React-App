import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { technologies } from "../../constants";

/** CSS-only tech icon card shown on mobile instead of heavy 3-D balls */
const TechIcon = ({ name, icon }: { name: string; icon: string }) => (
  <motion.div
    className="group flex flex-col items-center justify-center gap-2 w-20 h-24"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    <div className="w-14 h-14 rounded-xl border border-white/10 bg-[#0d1117]/60 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_20px_rgba(145,94,255,0.08)] group-hover:border-[#915EFF]/30 group-hover:shadow-[0_4px_24px_rgba(145,94,255,0.15)] transition-all duration-300">
      <img src={icon} alt={name} className="w-8 h-8 object-contain" />
    </div>
    <span className="text-[10px] text-gray-400 text-center leading-tight group-hover:text-gray-200 transition-colors">{name}</span>
  </motion.div>
);

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  return (
    <div>
      <div className="mb-10 sm:mb-14">
        <span className="font-mono text-xs text-[#915EFF]/60 tracking-widest uppercase">{'// technologies'}</span>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Tech Stack<span className="text-[#915EFF]">.</span>
        </h2>
        <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-[#915EFF] to-[#00bfff] rounded-full" />
      </div>

      {isMobile ? (
        /* Mobile: lightweight CSS icons — no WebGL context issues */
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {technologies.map((technology) => (
            <TechIcon key={technology.name} name={technology.name} icon={technology.icon} />
          ))}
        </div>
      ) : (
        /* Desktop: 3-D floating balls */
        <div className="flex flex-row flex-wrap justify-center gap-5 sm:gap-8">
          {technologies.map((technology) => (
            <div className="h-28 w-28" key={technology.name}>
              <BallCanvas icon={technology.icon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Tech, "tech");

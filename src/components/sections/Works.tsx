import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { github } from "../../assets";
import { SectionWrapper } from "../../hoc";
import { projects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { TProject } from "../../types";

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        glareColor="#915EFF"
        glareMaxOpacity={0.1}
      >
        <div className="group w-full sm:w-[340px] rounded-xl border border-white/[0.06] bg-[#0d1117]/60 backdrop-blur-xl overflow-hidden hover:border-[#915EFF]/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(145,94,255,0.1)]">
          {/* Image */}
          <div className="relative h-[200px] sm:h-[220px] w-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />

            {/* GitHub link */}
            <div className="absolute top-3 right-3">
              <div
                onClick={() => window.open(sourceCodeLink, "_blank")}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-[#915EFF]/30 hover:border-[#915EFF]/30 transition-all duration-300"
              >
                <img src={github} alt="github" className="h-1/2 w-1/2 object-contain" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-white group-hover:text-[#915EFF] transition-colors duration-300">{name}</h3>
            <p className="text-gray-400 mt-2 text-xs sm:text-sm leading-relaxed line-clamp-3">{description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-gray-400"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <div id="projects">
      <div className="mb-10">
        <span className="font-mono text-xs text-[#915EFF]/60 tracking-widest uppercase">{'// featured work'}</span>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Projects<span className="text-[#915EFF]">.</span>
        </h2>
        <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-[#915EFF] to-[#00bfff] rounded-full" />
      </div>

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-gray-400 mt-3 max-w-3xl text-sm sm:text-base leading-relaxed"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-12 sm:mt-16 flex flex-wrap gap-6 sm:gap-8 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "");

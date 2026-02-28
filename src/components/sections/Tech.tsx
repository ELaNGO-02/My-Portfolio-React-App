import { BallCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { technologies } from "../../constants";

const Tech = () => {
  return (
    <div>
      <div className="mb-10 sm:mb-14">
        <span className="font-mono text-xs text-[#915EFF]/60 tracking-widest uppercase">{'// technologies'}</span>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Tech Stack<span className="text-[#915EFF]">.</span>
        </h2>
        <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-[#915EFF] to-[#00bfff] rounded-full" />
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-5 sm:gap-8">
        {technologies.map((technology) => (
          <div className="h-20 w-20 sm:h-28 sm:w-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");

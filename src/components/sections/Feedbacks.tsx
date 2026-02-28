import { motion } from "framer-motion";

import { fadeIn } from "../../utils/motion";
import { testimonials } from "../../constants";
import { TTestimonial } from "../../types";

const FeedbackCard: React.FC<{ index: number } & TTestimonial> = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="group xs:w-[340px] w-full rounded-xl border border-white/[0.06] bg-[#0d1117]/60 backdrop-blur-2xl p-6 hover:border-[#915EFF]/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(145,94,255,0.08)]"
  >
    <p className="text-[36px] sm:text-[42px] font-black text-[#915EFF]/40 leading-none select-none">&ldquo;</p>

    <div className="mt-1">
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{testimonial}</p>

      <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/5">
        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="h-9 w-9 rounded-full object-cover border border-white/10"
        />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-white">
            <span className="text-[#915EFF] font-mono">@</span> {name}
          </p>
          <p className="text-gray-500 text-xs">
            {designation}, {company}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div id="testimonials" className="relative py-20 sm:py-28 px-4 sm:px-6">
      {/* Transparent to reveal 3D universe */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/70 via-[#0a0b14]/60 to-[#05060f]/70" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-mono text-xs text-[#915EFF]/60 tracking-widest uppercase">{'// testimonials'}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            What Others Say<span className="text-[#915EFF]">.</span>
          </h2>
          <div className="mt-4 h-[2px] w-16 mx-auto bg-gradient-to-r from-[#915EFF] to-[#00bfff] rounded-full" />
        </div>

        <div className="flex flex-wrap gap-5 sm:gap-7 justify-center">
          {testimonials.map((testimonial, index) => (
            <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;

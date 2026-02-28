import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Calendar, Buildings } from 'phosphor-react';

const awards = [
  {
    title: "TNCPL Hackathon Finalist",
    subtitle: "Intern Offer from Guvi",
    organization: "GUVI & TAMILNADU GOVERNMENT",
    date: "April 2024",
  },
  {
    title: "Maximum Outside Participation Award",
    subtitle: "",
    organization: "PPG Institute of Technology",
    date: "April 2024",
  },
  {
    title: "Ideathon Winners",
    subtitle: "Cash Prize: ₹10,000",
    organization: "Nehru Group of Institutions TBI",
    date: "Feb 2024",
  },
  {
    title: "Best 5s Employee",
    subtitle: "",
    organization: "L&T Electrical & Automation",
    date: "July 2023",
  }
];

const Awards = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="awards" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Transparent to reveal 3D universe */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/70 via-[#0a0b14]/60 to-[#05060f]/70" />

      <div className="container mx-auto max-w-5xl relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="font-mono text-xs text-[#915EFF]/60 tracking-widest uppercase">{'// achievements.log'}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Awards<span className="text-[#915EFF]">.</span>
          </h2>
          <div className="mt-4 h-[2px] w-16 mx-auto bg-gradient-to-r from-[#915EFF] to-[#00bfff] rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <div className="group rounded-xl border border-white/[0.06] bg-[#0d1117]/60 backdrop-blur-2xl p-5 hover:border-[#915EFF]/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(145,94,255,0.08)]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#915EFF]/10 group-hover:bg-[#915EFF]/20 transition-colors">
                    <Trophy size={22} weight="duotone" className="text-[#915EFF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1">{award.title}</h3>
                    {award.subtitle && (
                      <p className="text-[#00bfff] text-xs font-medium mb-2">{award.subtitle}</p>
                    )}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-500 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Buildings size={13} />
                        {award.organization}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {award.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;

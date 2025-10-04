import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Calendar, Buildings } from 'phosphor-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const awards = [
  {
    title: "TNCPL Hackathon Finalist",
    subtitle: "Intern Offer from Guvi",
    organization: "GUVI & TAMILNADU GOVERNMENT",
    date: "April 2024",
    icon: Trophy
  },
  {
    title: "Maximum Outside Participation Award",
    subtitle: "",
    organization: "PPG Institute of Technology",
    date: "April 2024",
    icon: Trophy
  },
  {
    title: "Ideathon Winners",
    subtitle: "Cash Prize: ₹10,000",
    organization: "Nehru Group of Institutions Technology Business Incubator",
    date: "Feb 2024",
    icon: Trophy
  },
  {
    title: "Best 5s Employee",
    subtitle: "",
    organization: "L&T Electrical & Automation",
    date: "July 2023",
    icon: Trophy
  }
];

const Awards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="awards" className="py-24 px-6 relative overflow-hidden bg-gray-900">
      {/* Light spots */}
      <div className="absolute w-24 h-24 bg-purple-500/30 rounded-full blur-3xl top-1/3 right-10 animate-pulse" />
      <div className="absolute w-24 h-24 bg-purple-500/30 rounded-full blur-3xl bottom-1/4 left-10 animate-pulse" />
      
      <div className="container mx-auto max-w-6xl relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Awards & Achievements
          </h2>
          <div className="h-1 w-24 bg-purple-500/50 mx-auto rounded-full shadow-lg" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="bg-gray-800/60 border border-gray-700 rounded-xl hover:shadow-[0_0_20px_rgba(145,94,255,0.6)] transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/20 transition-all duration-300 hover:bg-purple-500/40">
                      <award.icon size={32} weight="duotone" className="text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-white">
                        {award.title}
                      </CardTitle>
                      {award.subtitle && (
                        <p className="text-purple-400 font-semibold mb-2">{award.subtitle}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Buildings size={18} />
                      <span className="text-sm">{award.organization}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span className="text-sm">{award.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;

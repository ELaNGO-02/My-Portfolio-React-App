import { motion } from 'framer-motion';
import { Heart } from 'phosphor-react';
import logo from '../../assets/logo.png';
import { scrollToSection } from '../hooks/scrollTosection';

const Footer = () => {

  return (
    <footer className="border-t border-accent/20 py-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div className="text-2xl font-bold glow" whileHover={{ scale: 1.05 }}>
            <motion.img
              src={logo}
              alt="ELANGO T"
              className="relative w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full object-cover border-4 border-[#915EFF]/30"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {['About', 'Experience', 'Projects', 'Testimonials', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative px-4 py-2 rounded-md text-white bg-transparent transition-all duration-300 group hover:text-black hover:shadow-[0_0_10px_#ffffff] hover:bg-white"
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart weight="fill" className="text-accent animate-glow-pulse" />
            <span>© 2025 ELANGO T</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

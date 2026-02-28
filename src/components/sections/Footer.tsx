import { motion } from 'framer-motion';
import { Heart } from 'phosphor-react';
import logo from '../../assets/logo.png';
import { scrollToSection } from '../hooks/scrollTosection';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 py-10 sm:py-14 px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060f]/75 to-[#0a0b14]/65" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <motion.img
              src={logo}
              alt="ELANGO T"
              className="w-[46px] h-[46px] rounded-full object-cover border-2 border-[#915EFF]/30 shadow-[0_0_15px_rgba(145,94,255,0.15)]"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {['About', 'Experience', 'Projects', 'Testimonials', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm text-gray-500 bg-transparent transition-all duration-300 hover:text-white hover:bg-white/5 font-mono"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-[#915EFF]/15 to-transparent" />

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono text-[10px] sm:text-xs text-gray-600">
              <span className="text-[#915EFF]/50">{'<'}</span>
              Built with
              <Heart weight="fill" className="inline-block mx-1 text-[#915EFF] w-3 h-3" />
              by ELANGO T
              <span className="text-[#915EFF]/50">{' />'}</span>
            </p>
            <p className="text-[10px] text-gray-600 font-mono">
              © {new Date().getFullYear()} — All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

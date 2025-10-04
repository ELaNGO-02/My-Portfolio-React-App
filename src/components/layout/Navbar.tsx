import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DownloadSimple } from 'phosphor-react';
import { Button } from '../ui/button';
import logo from '../../assets/logo.png';
import { scrollToSection } from '../hooks/scrollTosection';

const NAV_ITEMS = ['About', 'Experience', 'Projects', 'Testimonials', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'ELANGO_T_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[#05060f]/60 py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div className="cursor-pointer relative glow-neon" whileHover={{ scale: 1.05 }}>
          <motion.img
            src={logo}
            alt="ELANGO T"
            className="relative w-[50px] h-[50px] md:w-[55px] md:h-[55px] rounded-full object-cover border-4 border-[#915EFF]/30"
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="relative px-4 py-2 rounded-md text-white bg-transparent transition-all duration-300 group hover:text-black hover:shadow-[0_0_10px_#ffffff] hover:bg-white"
            >
              {item}
            </button>
          ))}

          {/* Resume Button */}
          <Button
            variant="outline" // or ghost
            onClick={handleDownloadResume}
            className="bg-accent/10 text-accent hover:bg-white hover:text-black hover:shadow-[0_0_10px_#ffffff] transition-all duration-300"
          >
            <DownloadSimple className="mr-2" weight="bold" size={18} />
            Resume
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;

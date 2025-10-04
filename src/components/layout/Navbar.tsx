import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DownloadSimple } from 'phosphor-react';
import { Button } from '../ui/button';
import logo from "../../assets/logo.png"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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
        scrolled
          ? 'backdrop-blur-md bg-[#05060f]/60 py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold text-white cursor-pointer relative glow-neon"
          whileHover={{ scale: 1.05 }}
        >
           <motion.img
                src={logo}
                alt="ELANGO T"
                className="relative w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full object-cover border-4 border-[#915EFF]/30"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
        </motion.div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['about', 'Experience', 'projects', 'testimonials', 'contact'].map(
            (item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative text-white hover:text-accent transition-colors capitalize group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </button>
            )
          )}
          {/* Resume Button */}
          <Button
            onClick={handleDownloadResume}
            className="bg-accent/10 border border-accent text-accent hover:bg-accent hover:text-accent-foreground glow-neon transition-all"
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
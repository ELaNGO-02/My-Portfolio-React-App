import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadSimple, List, X } from 'phosphor-react';
import { Button } from '../ui/button';
import logo from '../../assets/logo.png';
import { scrollToSection } from '../hooks/scrollTosection';

const NAV_ITEMS = ['About', 'Experience', 'Projects', 'Testimonials', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'ELANGO_T_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavClick = (item: string) => {
    scrollToSection(item);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl bg-[#05060f]/60 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3),0_1px_0_rgba(145,94,255,0.15)] border-b border-[#915EFF]/10'
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div className="cursor-pointer relative" whileHover={{ scale: 1.05 }}>
            <motion.img
              src={logo}
              alt="ELANGO T"
              className="relative w-[42px] h-[42px] md:w-[50px] md:h-[50px] rounded-full object-cover border-2 border-[#915EFF]/40 shadow-[0_0_15px_rgba(145,94,255,0.3)]"
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="relative px-4 py-2 rounded-lg text-sm font-medium text-gray-300 bg-transparent transition-all duration-300 group hover:text-white hover:bg-white/10"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#915EFF] to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
              </button>
            ))}

            {/* Resume Button */}
            <Button
              variant="outline"
              onClick={handleDownloadResume}
              className="ml-4 border-[#915EFF]/40 text-[#915EFF] hover:bg-[#915EFF] hover:text-white hover:shadow-[0_0_20px_rgba(145,94,255,0.4)] transition-all duration-300 rounded-lg"
            >
              <DownloadSimple className="mr-2" weight="bold" size={16} />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[280px] bg-[#0a0b14]/95 backdrop-blur-xl border-l border-white/10 z-40 md:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col pt-24 px-6 gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 text-base font-medium"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    {item}
                  </motion.button>
                ))}

                <motion.div
                  className="mt-4 pt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => { handleDownloadResume(); setMobileOpen(false); }}
                    className="w-full border-[#915EFF]/40 text-[#915EFF] hover:bg-[#915EFF] hover:text-white transition-all duration-300 rounded-xl"
                  >
                    <DownloadSimple className="mr-2" weight="bold" size={16} />
                    Download Resume
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

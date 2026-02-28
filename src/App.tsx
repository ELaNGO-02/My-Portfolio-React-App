import { HashRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  Scene3D,
} from "./components";
import { useEffect } from "react";
import { config } from "./constants/config";
import Awards from "./components/sections/Awards";
import Footer from "./components/sections/Footer";
import Cursor from "./components/sections/Cursor";

/* Glowing animated divider between sections */
const SectionDivider = () => (
  <div className="relative h-px w-full overflow-visible">
    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#915EFF]/30 to-transparent" />
    <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-[#915EFF] shadow-[0_0_12px_4px_rgba(145,94,255,0.5)] animate-pulse" />
    {/* Wide ambient glow */}
    <div className="absolute inset-x-0 -top-8 h-16 bg-gradient-to-r from-transparent via-[#915EFF]/[0.04] to-transparent blur-2xl pointer-events-none" />
  </div>
);

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <HashRouter>
      <div className="bg-[#05060f] relative z-0 overflow-x-hidden">
        {/* Persistent 3-D particle universe */}
        <Scene3D />
        <Cursor />

        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>

        <div className="relative z-10">
          <SectionDivider />
          <About />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Tech />
          <SectionDivider />
          <Works />
          <SectionDivider />
          <Awards />
          <SectionDivider />
          <Feedbacks />
          <SectionDivider />
          <Contact />
          <SectionDivider />
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;

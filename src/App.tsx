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
  StarsCanvas,
} from "./components";
import { useEffect } from "react";
import { config } from "./constants/config";
import Awards from "./components/sections/Awards";
import Footer from "./components/sections/Footer";
import Cursor from "./components/sections/Cursor";

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <HashRouter>
      <div className="bg-primary relative z-0">
        <Cursor />

        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
        </div>

        <About />
        <Experience />
        <Tech />
        <Works />
        <Awards />
        <Feedbacks />

        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;

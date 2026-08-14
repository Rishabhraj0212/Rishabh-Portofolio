import { MotionConfig } from 'framer-motion';
import Background from './components/Background';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="cursor-none-desktop relative min-h-screen">
        <SmoothScroll />
        <Background />
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

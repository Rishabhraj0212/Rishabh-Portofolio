import { personal } from '../data/resume';
import { scrollToSection } from '../lib/smoothScroll';

const scrollTo = (href) => (e) => {
  e.preventDefault();
  scrollToSection(href);
};

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <span className="font-display text-gradient text-base font-bold">{personal.shortName}</span>
        <p className="text-xs text-muted">© 2026 {personal.name}. Built with React & Framer Motion.</p>
        <div className="flex gap-5 text-xs">
          <a href="#hero" onClick={scrollTo('#hero')} className="text-muted transition-colors hover:text-cyan-300">
            Top
          </a>
          <a href="#projects" onClick={scrollTo('#projects')} className="text-muted transition-colors hover:text-cyan-300">
            Projects
          </a>
          <a href="#contact" onClick={scrollTo('#contact')} className="text-muted transition-colors hover:text-cyan-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, personal } from '../data/resume';
import { scrollToSection } from '../lib/smoothScroll';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ${
        scrolled ? 'bg-bg/95 backdrop-blur-2xl border-b border-border' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#hero"
          onClick={handleClick('#hero')}
          className="font-display text-lg font-bold tracking-tight text-gradient"
          data-cursor-hover
        >
          {personal.initials}
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleClick(link.href)}
                data-cursor-hover
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  active === link.href ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-gradient-to-r from-cyan-400 to-violet-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={handleClick('#contact')}
          data-cursor-hover
          className="hidden rounded-full border border-border-hover bg-white/5 px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10 md:inline-block"
        >
          Let's talk
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[1001] flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-ink"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="h-px w-6 bg-ink"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-ink"
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-8 bg-bg/98 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleClick(link.href)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                className="font-display text-2xl font-medium text-ink"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

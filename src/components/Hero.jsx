import { motion } from 'framer-motion';
import { personal, highlights } from '../data/resume';
import MagneticButton from './MagneticButton';
import { scrollToSection } from '../lib/smoothScroll';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const scrollTo = (href) => (e) => {
  e.preventDefault();
  scrollToSection(href);
};

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.div
          variants={item}
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-cyan-300"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-pulse-dot absolute h-1.5 w-1.5 rounded-full bg-cyan-300" />
          </span>
          Available for opportunities
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[clamp(2.8rem,9vw,6.2rem)] font-bold leading-[0.98] tracking-tight text-gradient-white"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-xl text-[clamp(1rem,2.4vw,1.3rem)] font-medium text-gradient"
        >
          {personal.role}
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted"
        >
          {personal.tagline} — specializing in Flutter, secure mobile architecture, and
          Node.js full-stack systems.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            as="a"
            href="#projects"
            onClick={scrollTo('#projects')}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3 text-sm font-semibold text-bg shadow-[0_0_0_0_rgba(34,211,238,0.4)] hover:shadow-[0_8px_30px_-4px_rgba(34,211,238,0.5)]"
          >
            View Projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            onClick={scrollTo('#contact')}
            className="inline-flex items-center gap-2 rounded-full border border-border-hover px-7 py-3 text-sm font-semibold text-ink hover:border-cyan-300/40 hover:bg-cyan-300/5"
          >
            Contact Me
          </MagneticButton>
        </motion.div>

        <motion.div variants={item} className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2.5">
          {highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-cyan-300/30 hover:text-cyan-200"
            >
              {h}
            </span>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          onClick={scrollTo('#about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mx-auto mt-14 flex w-fit flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-faint"
          data-cursor-hover
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <motion.span
              className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-cyan-300 to-transparent"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { personal } from '../data/resume';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';

const resumePath = '/Rishabh_Raj_Gupta_Resume.pdf';

export default function Resume() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="resume" className="relative px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* heading */}
        <SectionHeading
          tag="Resume"
          title="My Professional"
          gradientWord="Resume"
          subtitle="A quick overview of my experience, skills, and qualifications — or download the full PDF."
          center
        />

        {/* card wrapper */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto mt-14 max-w-4xl">
            {/* glow behind the card */}
            <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/10 blur-2xl" />

            {/* glass card */}
            <div className="glass relative overflow-hidden rounded-3xl">
              {/* decorative top bar */}
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[11px] font-medium tracking-wide text-faint">
                  {personal.name} — Resume.pdf
                </span>
                <div className="w-14" /> {/* spacer for symmetry */}
              </div>

              {/* PDF embed */}
              <div className="relative aspect-[8.5/11] w-full bg-bg-soft">
                {/* loading skeleton */}
                {!loaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                      className="h-8 w-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
                    />
                    <span className="text-xs text-muted">Loading resume…</span>
                  </div>
                )}

                <iframe
                  src={`${resumePath}#toolbar=0&navpanes=0&view=FitH`}
                  title="Rishabh Raj Gupta Resume"
                  className={`h-full w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setLoaded(true)}
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA buttons */}
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              as="a"
              href={resumePath}
              download="Rishabh_Raj_Gupta_Resume.pdf"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3 text-sm font-semibold text-bg shadow-[0_0_0_0_rgba(34,211,238,0.4)] hover:shadow-[0_8px_30px_-4px_rgba(34,211,238,0.5)]"
              data-cursor-hover
            >
              {/* icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </MagneticButton>

            <MagneticButton
              as="a"
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-border-hover px-7 py-3 text-sm font-semibold text-ink hover:border-cyan-300/40 hover:bg-cyan-300/5"
              data-cursor-hover
            >
              {/* external link icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open in New Tab
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

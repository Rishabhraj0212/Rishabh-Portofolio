import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience, education } from '../data/resume';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function TimelineCard({ period, role, company, bullets, tags, current, delay }) {
  return (
    <Reveal delay={delay} className="relative pl-9">
      <span
        className={`absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-bg ${
          current ? 'bg-cyan-300 shadow-[0_0_16px_2px_rgba(34,211,238,0.5)]' : 'bg-violet-400'
        }`}
      />
      <div className="rounded-2xl border border-border bg-white/[0.03] p-6 transition-colors duration-300 hover:border-cyan-300/25 hover:bg-cyan-300/[0.03] sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-300">{period}</span>
          {current && (
            <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
              Current
            </span>
          )}
        </div>
        <h3 className="font-display mt-2 text-xl font-bold text-ink">{role}</h3>
        <p className="mt-0.5 text-sm text-muted">{company}</p>
        <ul className="mt-4 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.6'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <SectionHeading tag="Experience" title="Where I've" gradientWord="worked" />
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-0 top-1.5 bottom-1.5 w-px bg-white/[0.07]" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-1.5 w-px bg-gradient-to-b from-cyan-300 via-violet-400 to-transparent"
          />

          <div className="space-y-10">
            {experience.map((exp, i) => (
              <TimelineCard key={exp.company} {...exp} delay={i * 0.08} />
            ))}

            <Reveal delay={experience.length * 0.08} className="relative pl-9">
              <span className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-faint ring-4 ring-bg" />
              <div className="rounded-2xl border border-border bg-white/[0.02] p-6 sm:p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-faint">
                  {education.period}
                </span>
                <h3 className="font-display mt-2 text-xl font-bold text-ink">{education.degree}</h3>
                <p className="mt-0.5 text-sm text-muted">
                  {education.school} · {education.detail}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {education.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {education.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

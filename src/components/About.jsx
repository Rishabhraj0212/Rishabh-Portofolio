import { motion } from 'framer-motion';
import { personal, summary, stats, highlights } from '../data/resume';
import Counter from './Counter';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto flex max-w-xs flex-col items-center gap-5 lg:mx-0">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-[28px] border border-border bg-gradient-to-br from-bg-alt to-bg-soft">
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-cyan-400/15 via-transparent to-violet-500/15" />
              <span className="font-display text-gradient text-6xl font-bold">{personal.initials}</span>
            </div>
            <div className="grid w-full grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white/[0.03] px-4 py-3.5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/[0.04]"
                >
                  <Counter value={s.value} className="font-display text-gradient block text-2xl font-bold" />
                  <div className="mt-1 text-[11px] text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading tag="About Me" title="Crafting apps that" gradientWord="matter" />

          <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-muted">
            <Reveal delay={0.06}>
              <p>{summary}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                Currently building enterprise-grade systems at{' '}
                <strong className="font-semibold text-ink">BNB Cognira</strong>, after
                shipping production Flutter apps at{' '}
                <strong className="font-semibold text-ink">Sarabhai Information Technology</strong>{' '}
                for security-sensitive operational domains.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                I don't just build apps — I build systems that are{' '}
                <strong className="font-semibold text-ink">resilient, secure, and production-ready</strong>.
              </p>
            </Reveal>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {highlights.map((h) => (
              <motion.span
                key={h}
                variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.4 }}
                className="rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
              >
                {h}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

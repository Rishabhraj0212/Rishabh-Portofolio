import { motion } from 'framer-motion';
import { skillGroups, skillTags } from '../data/resume';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SkillBar from './SkillBar';

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeading
            tag="Skills"
            title="My"
            gradientWord="tech stack"
            subtitle="Technologies I use daily to ship secure, production-ready mobile and web applications."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.08} className="rounded-2xl border border-border bg-white/[0.03] p-6 transition-colors hover:border-cyan-300/20">
              <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {group.title}
              </h3>
              <div className="space-y-4">
                {group.skills.map((s, si) => (
                  <SkillBar key={s.name} {...s} delay={gi * 0.1 + si * 0.08} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.035 }}
          className="mt-10 flex flex-wrap justify-center gap-2.5"
        >
          {skillTags.map((tag) => (
            <motion.span
              key={tag}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35 }}
              className="rounded-full border border-border bg-white/[0.03] px-4 py-1.5 text-[13px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-cyan-200 hover:shadow-[0_4px_20px_-4px_rgba(34,211,238,0.25)]"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

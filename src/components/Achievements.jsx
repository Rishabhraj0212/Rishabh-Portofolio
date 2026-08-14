import { certifications, achievements } from '../data/resume';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Achievements() {
  const items = [
    ...certifications.map((c) => ({ ...c, kind: 'Certification', sub: c.issuer })),
    ...achievements.map((a) => ({ ...a, kind: 'Achievement', sub: a.detail, name: a.title })),
  ];

  return (
    <section id="achievements" className="relative px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeading tag="Recognition" title="Certifications &" gradientWord="achievements" />
        </div>

        <div className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal
              key={it.name}
              delay={i * 0.08}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white/[0.03] p-6 transition-colors hover:border-cyan-300/25"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl transition-all duration-500 group-hover:bg-cyan-400/10" />
              <div className="relative">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-xl">
                  {it.icon}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
                  {it.kind}
                </span>
                <h3 className="font-display mt-1.5 text-[15px] font-bold leading-snug text-ink">{it.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{it.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Reveal from './Reveal';

export default function SectionHeading({ tag, title, gradientWord, subtitle, center = false }) {
  return (
    <div className={center ? 'mx-auto max-w-xl text-center' : 'max-w-xl'}>
      <Reveal>
        <span className="inline-block rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
          {tag}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-4 text-[clamp(1.9rem,4.5vw,2.75rem)] font-bold leading-tight tracking-tight text-ink">
          {title} {gradientWord && <span className="text-gradient">{gradientWord}</span>}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.14}>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

import { skillTags } from '../data/resume';

export default function Marquee() {
  const items = [...skillTags, ...skillTags];

  return (
    <div className="relative overflow-hidden border-y border-border py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-bg to-transparent" />
      <div className="animate-marquee flex w-max gap-10 hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="flex shrink-0 items-center gap-2 text-sm font-medium text-faint">
            <span className="h-1 w-1 rounded-full bg-cyan-300/60" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

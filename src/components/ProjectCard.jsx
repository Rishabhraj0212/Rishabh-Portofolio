import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const badgeStyles = {
  conf: 'bg-amber-400/10 text-amber-300 border-amber-300/20',
  demo: 'bg-cyan-400/10 text-cyan-300 border-cyan-300/20',
  personal: 'bg-emerald-400/10 text-emerald-300 border-emerald-300/20',
};

const iconBg = {
  blue: 'bg-cyan-400/10',
  purple: 'bg-violet-400/10',
  green: 'bg-emerald-400/10',
  amber: 'bg-amber-400/10',
};

export default function ProjectCard({ project, delay }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 220, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px / rect.width - 0.5);
    y.set(py / rect.height - 0.5);
    ref.current.style.setProperty('--mx', `${px}px`);
    ref.current.style.setProperty('--my', `${py}px`);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const openLink = () => {
    if (project.link) window.open(project.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={project.link ? openLink : undefined}
      onKeyDown={
        project.link
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLink();
              }
            }
          : undefined
      }
      role={project.link ? 'link' : undefined}
      tabIndex={project.link ? 0 : undefined}
      className={`group relative flex h-full flex-col rounded-2xl border border-border bg-white/[0.03] p-7 transition-colors duration-300 hover:border-cyan-300/25 ${
        project.link ? 'cursor-pointer' : ''
      }`}
      data-cursor-hover
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.06), transparent 60%)',
        }}
      />

      <div className="mb-5 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${iconBg[project.color]}`}>
          {project.icon}
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${badgeStyles[project.badgeType]}`}>
          {project.badge}
        </span>
      </div>

      <h3 className="font-display text-lg font-bold text-ink">{project.title}</h3>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{project.desc}</p>

      <ul className="mt-4 space-y-2">
        {project.features.map((f) => (
          <li key={f} className="flex gap-2 text-[13px] leading-relaxed text-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="rounded-md border border-border bg-white/[0.02] px-2 py-0.5 text-[10.5px] font-medium text-faint">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="text-[12px] font-medium text-cyan-200/80">{project.metric}</span>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[12px] font-semibold text-cyan-300 hover:text-cyan-200"
          >
            {project.linkLabel ?? 'View →'}
          </a>
        ) : (
          <span className="text-[12px] font-medium text-faint">{project.noLinkLabel ?? 'Private'}</span>
        )}
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';

export default function SkillBar({ name, pct, delay = 0 }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[13.5px] font-medium text-ink">{name}</span>
        <span className="text-xs font-semibold text-cyan-300">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
        />
      </div>
    </div>
  );
}

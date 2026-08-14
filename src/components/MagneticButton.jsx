import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ as: Tag = 'a', className = '', children, ...props }) {
  const ref = useRef(null);
  const Motion = motion[Tag] ?? motion.a;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <Motion
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      data-cursor-hover
      {...props}
    >
      {children}
    </Motion>
  );
}

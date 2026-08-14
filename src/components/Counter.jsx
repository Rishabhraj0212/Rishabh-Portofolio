import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

export default function Counter({ value, className }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : null;
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const suffix = match ? match[2] : '';

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(target === null ? value : (0).toFixed(decimals));

  useEffect(() => {
    if (!inView || target === null) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, target, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

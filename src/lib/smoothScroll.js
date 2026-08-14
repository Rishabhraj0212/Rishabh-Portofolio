let lenisInstance = null;

export function setLenisInstance(instance) {
  lenisInstance = instance;
}

export function scrollToSection(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 3) });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

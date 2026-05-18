import type { Variants } from 'framer-motion';

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_CINE: [number, number, number, number] = [0.83, 0, 0.17, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_EXPO } },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.0, ease: EASE_EXPO } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_EXPO } },
};

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

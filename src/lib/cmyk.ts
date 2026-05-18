import type { DeviceKey } from '@/state/useUIStore';

export const CMYK = {
  cyan: '#2db4d8',
  magenta: '#e6296b',
  yellow: '#f0b020',
  key: '#0a0a0c',
  paper: '#f5f0e3',
} as const;

export const deviceColor: Record<DeviceKey, string> = {
  printer: CMYK.cyan,
  press: CMYK.magenta,
  laminator: CMYK.yellow,
};

export const deviceGlow: Record<DeviceKey, string> = {
  printer: 'shadow-glow-c',
  press: 'shadow-glow-m',
  laminator: 'shadow-glow-y',
};

export function glowFor(c: 'c' | 'm' | 'y'): string {
  return c === 'c' ? 'shadow-glow-c' : c === 'm' ? 'shadow-glow-m' : 'shadow-glow-y';
}

export function textGlowFor(c: 'c' | 'm' | 'y'): string {
  return c === 'c' ? 'text-glow-c' : c === 'm' ? 'text-glow-m' : 'text-glow-y';
}

export function hexFor(c: 'c' | 'm' | 'y' | 'k'): string {
  return c === 'c' ? CMYK.cyan : c === 'm' ? CMYK.magenta : c === 'y' ? CMYK.yellow : CMYK.key;
}

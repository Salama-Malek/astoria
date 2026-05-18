import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EASE_EXPO, EASE_CINE, prefersReducedMotion } from '@/lib/motion';
import { useT } from '@/lib/i18n';
import Wordmark from './Wordmark';

export default function Loader() {
  const [done, setDone] = useState(false);
  const t = useT();

  useEffect(() => {
    const totalMs = prefersReducedMotion() ? 600 : 2600;
    const id = setTimeout(() => setDone(true), totalMs);
    document.body.classList.add('overflow-hidden');
    return () => {
      clearTimeout(id);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] bg-void flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE_EXPO } }}
        >
          <div className="relative w-[min(420px,80vw)] flex flex-col items-center">
            {/* Paper sheet sliding out */}
            <motion.div
              className="relative w-[220px] h-[300px] bg-paper rounded-[2px] origin-top"
              initial={{ y: -260, scaleY: 0.2, opacity: 0 }}
              animate={{ y: 0, scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE_CINE, delay: 0.15 }}
              style={{ boxShadow: '0 8px 40px rgba(245,240,227,0.08)' }}
            >
              {/* CMYK registration lines */}
              {(['#2db4d8', '#e6296b', '#f0b020', '#0a0a0c'] as const).map((c, i) => (
                <motion.div
                  key={c}
                  className="absolute h-[3px] left-[14%] right-[14%]"
                  style={{
                    top: `${28 + i * 22}%`,
                    background: c,
                    boxShadow: c === '#0a0a0c' ? 'none' : `0 0 16px ${c}`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.9 + i * 0.18 }}
                />
              ))}
              <motion.div
                className="absolute inset-x-0 bottom-6 text-center font-mono uppercase text-[9px] tracking-wider2 text-void/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 }}
              >
                C · M · Y · K
              </motion.div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: 1.95 }}
            >
              <Wordmark size={28} />
            </motion.div>
            <motion.p
              className="mono-label mt-3 text-paper-mute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.15 }}
            >
              {t.loader.sub}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

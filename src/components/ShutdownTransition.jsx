import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ShutdownTransition Component
 * 4-Phase Cinematic Shutdown to Cold Boot:
 * Phase 1 (0ms - 800ms): Rogue AI Matrix Glitch + Cyber Skull / Demon Glyph
 * Phase 2 (800ms - 1350ms): 4-Sided Diamond / Center Iris CRT Collapse
 * Phase 3 (1350ms - 3200ms): Pure Suspenseful Void (2s dead silent blackout)
 * Phase 4 (3200ms+): onComplete callback triggers Cold Boot
 */
export default function ShutdownTransition({ onComplete }) {
  const [phase, setPhase] = useState('GLITCH'); // 'GLITCH' | 'COLLAPSE' | 'VOID'

  useEffect(() => {
    // Phase 1 -> Phase 2 (Diamond Collapse)
    const t1 = setTimeout(() => {
      setPhase('COLLAPSE');
    }, 850);

    // Phase 2 -> Phase 3 (Suspenseful 2s Void)
    const t2 = setTimeout(() => {
      setPhase('VOID');
    }, 1450);

    // Phase 3 -> Complete (Cold Boot Prompt Awakens)
    const t3 = setTimeout(() => {
      onComplete?.();
    }, 3250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden bg-black">
      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 1: ROGUE AI GLITCH & MATRIX CYBER SKULL
          ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'GLITCH' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/90">
          {/* CRT Screen Tear Slices */}
          <div className="absolute inset-0 pointer-events-none animate-screen-tear opacity-85 z-10" />

          {/* Matrix Binary Rain Streams */}
          <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden flex justify-around text-xs font-mono text-emerald-400 select-none">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                className="writing-mode-vertical"
                initial={{ y: -100 }}
                animate={{ y: [0, 800] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5 + (i % 5) * 0.3,
                  ease: 'linear',
                  delay: (i % 7) * 0.15,
                }}
              >
                010110010101001010110101001010110101001010110101
              </motion.div>
            ))}
          </div>

          {/* Rogue AI Cyber Skull Glyph */}
          <motion.div
            className="relative z-20 flex flex-col items-center justify-center space-y-4"
            animate={{
              x: [0, -6, 5, -3, 6, -2, 0],
              y: [0, 3, -4, 2, -3, 1, 0],
              filter: [
                'drop-shadow(0 0 15px rgba(255,0,80,0.8))',
                'drop-shadow(-8px 0 0 rgba(0,243,255,0.9)) drop-shadow(8px 0 0 rgba(255,0,80,0.9))',
                'drop-shadow(6px 0 0 rgba(0,243,255,0.9)) drop-shadow(-6px 0 0 rgba(255,0,80,0.9))',
                'drop-shadow(0 0 20px rgba(255,0,80,0.8))',
              ],
            }}
            transition={{ repeat: Infinity, duration: 0.18, ease: 'linear' }}
          >
            {/* High-Tech Vector Cyber Skull */}
            <svg
              width="130"
              height="130"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-28 h-28 sm:w-36 sm:h-36"
            >
              {/* Outer Cranium */}
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 15.65 3.96 18.84 6.89 20.61L7 22H17L17.11 20.61C20.04 18.84 22 15.65 22 12C22 6.48 17.52 2 12 2Z"
                fill="#050508"
                stroke="#ff0055"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />

              {/* Eye Sockets with Glowing Demon Pupils */}
              <path
                d="M6.5 11C6.5 9.62 7.62 8.5 9 8.5C10.38 8.5 11.5 9.62 11.5 11C11.5 12.38 10.38 13.5 9 13.5C7.62 13.5 6.5 12.38 6.5 11Z"
                fill="#ff0055"
                className="animate-pulse"
              />
              <path
                d="M12.5 11C12.5 9.62 13.62 8.5 15 8.5C16.38 8.5 17.5 9.62 17.5 11C17.5 12.38 16.38 13.5 15 13.5C13.62 13.5 12.5 12.38 12.5 11Z"
                fill="#00f3ff"
                className="animate-pulse"
              />

              {/* Inverted Triangular Nasal Cavity */}
              <polygon points="12,14 10.5,17 13.5,17" fill="#ff0055" />

              {/* Tech Jaw / Mandible Teeth Grate */}
              <path
                d="M8 19V21M10.5 19V21M13.5 19V21M16 19V21"
                stroke="#00f3ff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Rogue System Glitch Tag */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded bg-black/90 border border-red-500/60 font-mono text-[10px] sm:text-xs text-red-400 font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,0,80,0.6)]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>ROGUE_SYS_OVERRIDE // PURGING_HOST</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 2: 4-SIDED DIAMOND / IRIS CRT COLLAPSE
          ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'COLLAPSE' && (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          {/* Diamond mask collapsing from all 4 sides inward */}
          <motion.div
            className="w-full h-full bg-neutral-900 border-2 border-cyan-400/80 shadow-[0_0_60px_#00f3ff]"
            style={{
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
            initial={{ scale: 2.2, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center Phosphor Spark Pinch-Out */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,1),0_0_80px_#00f3ff]"
            initial={{ scale: 3, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.15, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 3: THE SUSPENSEFUL VOID (2s Dead Silence Blackout)
          ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'VOID' && (
        <div className="w-full h-full bg-black cursor-none" />
      )}
    </div>
  );
}

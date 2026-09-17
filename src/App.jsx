import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CleanPortfolio from './components/CleanPortfolio';
import OverclockSequence from './components/OverclockSequence';

/**
 * App Component — Dual-State Architecture
 *
 * Default: CleanPortfolio — hyper-clean, minimalist Vercel/Linear-style dark portfolio.
 *          Features a "temptation trigger" widget in the bottom-right corner.
 *
 * Overclocked: OverclockSequence — the full gamified cinematic sequence
 *              (Cold Boot → Flashlight → Ignition → Circuit Surge → Glitch → Reveal).
 *
 * Transition: Heavy CRT power-down animation tears the CleanPortfolio before
 *             mounting the OverclockSequence in its pitch-black Cold Boot state.
 */
export default function App() {
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [isPoweringDown, setIsPoweringDown] = useState(false);

  // Triggered by the Temptation Widget in CleanPortfolio
  const handleOverclock = useCallback(() => {
    // Play the power-down transition before switching
    setIsPoweringDown(true);
    // After the power-down tear animation completes, mount the overclock sequence
    setTimeout(() => {
      setIsPoweringDown(false);
      setIsOverclocked(true);
    }, 850); // duration of the screen-tear + black collapse
  }, []);

  // Triggered by the "RE-INITIALIZE SYSTEM" button in OverclockSequence
  const handleReturnToStable = useCallback(() => {
    setIsOverclocked(false);
  }, []);

  return (
    <div className="relative w-screen min-h-screen bg-[#09090b]">
      <AnimatePresence mode="wait">
        {!isOverclocked && !isPoweringDown && (
          <CleanPortfolio key="clean" onOverclock={handleOverclock} />
        )}

        {isOverclocked && (
          <OverclockSequence key="overclock" onReturnToStable={handleReturnToStable} />
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          POWER-DOWN TRANSITION
          Heavy CRT screen-tear + vertical collapse + blackout
          Plays when transitioning from CleanPortfolio → OverclockSequence
          ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isPoweringDown && (
          <>
            {/* Layer 1: CRT horizontal tear slices */}
            <motion.div
              className="fixed inset-0 z-[60] pointer-events-none animate-screen-tear"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />

            {/* Layer 2: Chromatic aberration RGB split overlay */}
            <motion.div
              className="fixed inset-0 z-[61] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.3, 0.9, 0.5, 0] }}
              transition={{ duration: 0.65, ease: 'linear' }}
              style={{
                filter: 'drop-shadow(4px 0 0 rgba(255,0,80,0.6)) drop-shadow(-4px 0 0 rgba(0,243,255,0.6))',
              }}
            />

            {/* Layer 3: CRT scanlines overlay */}
            <motion.div
              className="fixed inset-0 z-[62] pointer-events-none crt-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.3, 0.5, 0] }}
              transition={{ duration: 0.55 }}
            />

            {/* Layer 4: Amber/cyan voltage surge flash */}
            <motion.div
              className="fixed inset-0 z-[63] pointer-events-none"
              initial={{ opacity: 0, backgroundColor: 'rgba(255,183,3,0.15)' }}
              animate={{
                opacity: [0, 0.4, 0.1, 0.3, 0],
                backgroundColor: [
                  'rgba(255,183,3,0.15)',
                  'rgba(0,243,255,0.2)',
                  'rgba(255,183,3,0.1)',
                  'rgba(0,0,0,0)',
                ],
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Layer 5: Vertical CRT collapse — classic tube TV power-down */}
            <motion.div
              className="fixed inset-0 z-[64] pointer-events-none bg-black"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.45, duration: 0.35, ease: [0.85, 0, 0.15, 1] }}
              style={{ transformOrigin: 'center center' }}
            />

            {/* Layer 6: Brief phosphor afterglow line (CRT shutdown bar) */}
            <motion.div
              className="fixed left-0 right-0 top-1/2 -translate-y-1/2 z-[65] pointer-events-none h-[2px] bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]"
              initial={{ scaleX: 1, opacity: 1 }}
              animate={{ scaleX: 0, opacity: 0 }}
              transition={{ delay: 0.65, duration: 0.2, ease: 'easeIn' }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

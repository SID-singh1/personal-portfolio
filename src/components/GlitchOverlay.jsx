import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * GlitchOverlay Component
 * Handles State 4: The Glitch & Reveal
 * Triggers heavy screen-tear/CRT glitch effects followed by a blinding white flash.
 */
export default function GlitchOverlay({ onGlitchComplete }) {
  const [phase, setPhase] = useState('glitching'); // 'glitching' | 'flash' | 'done'

  useEffect(() => {
    // Heavy glitch lasts ~800ms
    const glitchTimer = setTimeout(() => {
      setPhase('flash');
    }, 750);

    // Flash runs and concludes, revealing portfolio after ~1300ms
    const completeTimer = setTimeout(() => {
      setPhase('done');
      if (onGlitchComplete) onGlitchComplete();
    }, 1350);

    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(completeTimer);
    };
  }, [onGlitchComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 1. CRT Scanlines and chromatic grid */}
      {phase === 'glitching' && (
        <>
          <div className="crt-overlay" />

          {/* Heavy Screen-Tear Slices */}
          <div className="absolute inset-0 animate-screen-tear opacity-90 bg-cyan-950/20 mix-blend-screen" />
          
          {/* Secondary RGB offset slice layer */}
          <div 
            className="absolute inset-0 animate-screen-tear opacity-80" 
            style={{ 
              animationDirection: 'reverse', 
              animationDuration: '0.14s',
              filter: 'invert(0.15) hue-rotate(90deg)'
            }} 
          />

          {/* Glitch Noise Bars */}
          <div className="absolute inset-0 flex flex-col justify-around pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full bg-cyan-400/40 border-y border-white/60 animate-pulse"
                style={{
                  height: `${(i % 3 + 1) * 8}px`,
                  transform: `translateX(${(i % 2 === 0 ? 1 : -1) * (i * 12 + 10)}px)`,
                  animationDuration: `${0.1 + (i % 3) * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Center Glitch Warning Label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-6 py-2 bg-black/90 border border-red-500 font-mono text-red-400 text-xs md:text-sm tracking-widest uppercase font-bold animate-ping">
              [ BUS OVERLOAD // DISCHARGING ENERGY ]
            </div>
          </div>
        </>
      )}

      {/* 2. Blinding White Flash */}
      {phase === 'flash' && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.9, 1, 0] }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </div>
  );
}

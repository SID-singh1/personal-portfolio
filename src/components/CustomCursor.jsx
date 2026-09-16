import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * CustomCursor Component
 * Replaces the default OS hand pointer with a high-tech cyberpunk reticle cursor.
 * Features:
 * - Default state: sleek cyan crosshair with subtle orbiting ticks.
 * - Target Lock state (when hovering over button/interactive elements):
 *   Reticle expands, four corner brackets clamp inward, spinning radar sweep,
 *   pulsing diamond core, and [ENGAGE] target lock readout.
 * - Click shockwave animation.
 */
export default function CustomCursor({ pointerPos, isHoveringTarget, isClicking }) {
  const [clickRipples, setClickRipples] = useState([]);

  // Smooth spring physics for fluid movement
  const springConfig = { damping: 30, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(pointerPos.x, springConfig);
  const cursorY = useSpring(pointerPos.y, springConfig);

  useEffect(() => {
    cursorX.set(pointerPos.x);
    cursorY.set(pointerPos.y);
  }, [pointerPos.x, pointerPos.y, cursorX, cursorY]);

  // Spawn visual shockwave on click
  useEffect(() => {
    if (isClicking && pointerPos.x > 0) {
      const id = Date.now();
      setClickRipples((prev) => [...prev.slice(-3), { id, x: pointerPos.x, y: pointerPos.y }]);
      const timer = setTimeout(() => {
        setClickRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isClicking, pointerPos.x, pointerPos.y]);

  if (pointerPos.x === -999 && pointerPos.y === -999) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Click Shockwaves */}
      {clickRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border border-cyan-300 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 10, height: 10, opacity: 1, borderWidth: 2 }}
          animate={{ width: 120, height: 120, opacity: 0, borderWidth: 0.5 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        />
      ))}

      {/* Main Reticle Container */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: cursorX,
          top: cursorY,
        }}
      >
        {/* State A: Hovering over Button (TARGET LOCKED / ARTISTIC RETICLE) */}
        {isHoveringTarget ? (
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Outer Spinning Radar Ring */}
            <motion.div
              className="w-14 h-14 rounded-full border border-dashed border-cyan-400/80 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.7)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              {/* Radar sweep indicator dot */}
              <span className="w-1.5 h-1.5 bg-white rounded-full absolute -top-1 shadow-[0_0_8px_#ffffff]" />
            </motion.div>

            {/* Pulsing Target Ring */}
            <motion.div
              className="absolute w-10 h-10 rounded-full border border-cyan-300/60"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* 4 Inward Clamping Target Brackets */}
            <motion.span
              className="absolute -top-3.5 -left-3.5 w-3 h-3 border-t-2 border-l-2 border-cyan-300 shadow-[0_0_6px_#00f3ff]"
              animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <motion.span
              className="absolute -top-3.5 -right-3.5 w-3 h-3 border-t-2 border-r-2 border-cyan-300 shadow-[0_0_6px_#00f3ff]"
              animate={{ x: [0, -2, 0], y: [0, 2, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <motion.span
              className="absolute -bottom-3.5 -left-3.5 w-3 h-3 border-b-2 border-l-2 border-cyan-300 shadow-[0_0_6px_#00f3ff]"
              animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <motion.span
              className="absolute -bottom-3.5 -right-3.5 w-3 h-3 border-b-2 border-r-2 border-cyan-300 shadow-[0_0_6px_#00f3ff]"
              animate={{ x: [0, -2, 0], y: [0, -2, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />

            {/* Glowing Diamond Center Core */}
            <motion.div
              className="w-2.5 h-2.5 bg-cyan-300 rotate-45 shadow-[0_0_12px_#00f3ff]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />

            {/* Futuristic Target Readout Tag */}
            <div className="absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap flex items-center space-x-1 px-1.5 py-0.5 bg-black/90 border border-cyan-400/80 rounded text-[9px] font-mono font-bold tracking-widest text-cyan-200 shadow-[0_0_10px_rgba(0,243,255,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>LOCK::ENGAGE</span>
            </div>
          </motion.div>
        ) : (
          /* State B: Normal Exploring Reticle */
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Outer Circular Reticle Ring */}
            <div
              className="w-8 h-8 rounded-full border border-cyan-400/60 flex items-center justify-center animate-spin"
              style={{ animationDuration: '9s' }}
            >
              <span className="w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_6px_#00f3ff]" />
            </div>

            {/* Crosshair Pips */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400/90 shadow-[0_0_4px_#00f3ff]" />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400/90 shadow-[0_0_4px_#00f3ff]" />
            <span className="absolute top-1/2 -left-2 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/90 shadow-[0_0_4px_#00f3ff]" />
            <span className="absolute top-1/2 -right-2 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/90 shadow-[0_0_4px_#00f3ff]" />

            {/* Center Aiming Dot */}
            <span className="w-1.5 h-1.5 bg-cyan-200 rounded-full shadow-[0_0_8px_#00f3ff]" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

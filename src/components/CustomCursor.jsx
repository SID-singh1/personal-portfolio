import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion';

/**
 * CustomCursor Component
 * Replaces the default OS hand pointer with a high-tech cyberpunk reticle cursor.
 * Features:
 * - Persistent rotation state: The 3 o'clock indicator pip rotates while hovering over the button,
 *   and when leaving, it retains its exact angle (e.g. 9 o'clock) and resumes from there upon return.
 * - Dynamic expansion from 32px exploration reticle to 56px tactical target-lock HUD.
 * - 4 clamping corner brackets and [LOCK::ENGAGE] readout.
 * - Click shockwave ripple animations.
 */
export default function CustomCursor({ pointerPos, isHoveringTarget, isClicking }) {
  const [clickRipples, setClickRipples] = useState([]);

  // Smooth spring physics for fluid cursor movement
  const springConfig = { damping: 30, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(pointerPos.x, springConfig);
  const cursorY = useSpring(pointerPos.y, springConfig);

  // Persistent rotation angle for the indicator pip
  // Retains its exact position when leaving the target and resumes from where it left off
  const rotation = useMotionValue(0);

  useEffect(() => {
    cursorX.set(pointerPos.x);
    cursorY.set(pointerPos.y);
  }, [pointerPos.x, pointerPos.y, cursorX, cursorY]);

  // Rotate only while hovering over target; freeze at current angle when leaving
  useAnimationFrame((time, delta) => {
    if (isHoveringTarget) {
      // delta in ms (~16.6ms at 60fps) -> 0.1 deg/ms is ~100 deg/sec
      const current = rotation.get();
      rotation.set((current + delta * 0.11) % 360);
    }
  });

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
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
        style={{
          left: cursorX,
          top: cursorY,
        }}
      >
        {/* Persistent Rotating Outer Ring (Retains exact rotation angle when leaving) */}
        <motion.div
          className="absolute rounded-full pointer-events-none flex items-center justify-center"
          style={{
            rotate: rotation,
          }}
          animate={{
            width: isHoveringTarget ? 56 : 32,
            height: isHoveringTarget ? 56 : 32,
            borderColor: isHoveringTarget ? 'rgba(0, 243, 255, 0.85)' : 'rgba(0, 243, 255, 0.55)',
            borderStyle: isHoveringTarget ? 'dashed' : 'solid',
            boxShadow: isHoveringTarget
              ? '0 0 16px rgba(0, 243, 255, 0.7), inset 0 0 8px rgba(0, 243, 255, 0.3)'
              : '0 0 6px rgba(0, 243, 255, 0.25)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        >
          {/* 
            Orbiting Satellite Pip:
            Positioned at 3 o'clock (right: 0, top: 50%) when rotation is 0°.
            Rotates with the ring, stays wherever it left off when unhovered,
            and resumes from there when hovered again!
          */}
          <motion.span
            className="absolute rounded-full shadow-[0_0_8px_#00f3ff]"
            style={{
              right: isHoveringTarget ? '-3.5px' : '-2.5px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            animate={{
              width: isHoveringTarget ? 6 : 4,
              height: isHoveringTarget ? 6 : 4,
              backgroundColor: isHoveringTarget ? '#ffffff' : '#00f3ff',
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        {/* Secondary Pulsing Inner Ring (Active during Target Lock) */}
        <AnimatePresence>
          {isHoveringTarget && (
            <motion.div
              className="absolute w-10 h-10 rounded-full border border-cyan-300/60 pointer-events-none"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {/* 4 Inward Clamping Target Brackets (Hovering over button) */}
        <AnimatePresence>
          {isHoveringTarget && (
            <>
              <motion.span
                className="absolute -top-3.5 -left-3.5 w-3 h-3 border-t-2 border-l-2 border-cyan-300 shadow-[0_0_6px_#00f3ff] pointer-events-none"
                initial={{ x: -6, y: -6, opacity: 0 }}
                animate={{ x: [0, 2, 0], y: [0, 2, 0], opacity: 1 }}
                exit={{ x: -6, y: -6, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <motion.span
                className="absolute -top-3.5 -right-3.5 w-3 h-3 border-t-2 border-r-2 border-cyan-300 shadow-[0_0_6px_#00f3ff] pointer-events-none"
                initial={{ x: 6, y: -6, opacity: 0 }}
                animate={{ x: [0, -2, 0], y: [0, 2, 0], opacity: 1 }}
                exit={{ x: 6, y: -6, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <motion.span
                className="absolute -bottom-3.5 -left-3.5 w-3 h-3 border-b-2 border-l-2 border-cyan-300 shadow-[0_0_6px_#00f3ff] pointer-events-none"
                initial={{ x: -6, y: 6, opacity: 0 }}
                animate={{ x: [0, 2, 0], y: [0, -2, 0], opacity: 1 }}
                exit={{ x: -6, y: 6, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <motion.span
                className="absolute -bottom-3.5 -right-3.5 w-3 h-3 border-b-2 border-r-2 border-cyan-300 shadow-[0_0_6px_#00f3ff] pointer-events-none"
                initial={{ x: 6, y: 6, opacity: 0 }}
                animate={{ x: [0, -2, 0], y: [0, -2, 0], opacity: 1 }}
                exit={{ x: 6, y: 6, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />

              {/* Tactical [LOCK::ENGAGE] Badge */}
              <motion.div
                className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap flex items-center space-x-1 px-1.5 py-0.5 bg-black/90 border border-cyan-400/80 rounded text-[9px] font-mono font-bold tracking-widest text-cyan-200 shadow-[0_0_10px_rgba(0,243,255,0.5)] pointer-events-none"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>LOCK::ENGAGE</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Center Aiming Core (Dot morphs to Diamond during Target Lock) */}
        <motion.div
          className="pointer-events-none bg-cyan-300 shadow-[0_0_10px_#00f3ff]"
          animate={{
            width: isHoveringTarget ? 8 : 3,
            height: isHoveringTarget ? 8 : 3,
            rotate: isHoveringTarget ? 45 : 0,
            borderRadius: isHoveringTarget ? 1 : 9999,
            scale: isHoveringTarget ? [1, 1.25, 1] : 1,
          }}
          transition={{
            scale: { duration: 0.6, repeat: isHoveringTarget ? Infinity : 0 },
            duration: 0.25,
          }}
        />

        {/* Subtle Crosshair Ticks (Top, Bottom, Left, Right) */}
        <motion.span
          className="absolute w-0.5 h-1.5 bg-cyan-400/80 shadow-[0_0_4px_#00f3ff] pointer-events-none"
          animate={{ top: isHoveringTarget ? -16 : -8 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        />
        <motion.span
          className="absolute w-0.5 h-1.5 bg-cyan-400/80 shadow-[0_0_4px_#00f3ff] pointer-events-none"
          animate={{ bottom: isHoveringTarget ? -16 : -8 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        />
        <motion.span
          className="absolute h-0.5 w-1.5 bg-cyan-400/80 shadow-[0_0_4px_#00f3ff] pointer-events-none"
          animate={{ left: isHoveringTarget ? -16 : -8 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        />
        <motion.span
          className="absolute h-0.5 w-1.5 bg-cyan-400/80 shadow-[0_0_4px_#00f3ff] pointer-events-none"
          animate={{ right: isHoveringTarget ? -16 : -8 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        />
      </motion.div>
    </div>
  );
}

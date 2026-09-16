import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * FlashlightOverlay
 * Provides the 150px radius spotlight effect revealing the background.
 * Uses smooth spring physics for responsive and buttery tracking.
 */
export default function FlashlightOverlay({ pointerPos, active }) {
  // Smooth spring tracking for mouse coordinates
  const smoothX = useSpring(pointerPos.x, { damping: 28, stiffness: 260 });
  const smoothY = useSpring(pointerPos.y, { damping: 28, stiffness: 260 });

  useEffect(() => {
    smoothX.set(pointerPos.x);
    smoothY.set(pointerPos.y);
  }, [pointerPos.x, pointerPos.y, smoothX, smoothY]);

  if (!active) return null;

  const hasMoved = pointerPos.x !== -999 && pointerPos.y !== -999;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* 
        Pitch black overlay with a radial mask punched out around the cursor 
        Circle radius: 150px. Center receives soft cyan illumination, edges fade into total black.
      */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: hasMoved
            ? `radial-gradient(circle 150px at ${pointerPos.x}px ${pointerPos.y}px, transparent 0%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.96) 92%, #000000 100%)`
            : '#000000',
        }}
      />

      {/* Subtle cyan illumination halo */}
      {hasMoved && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 150px at ${pointerPos.x}px ${pointerPos.y}px, rgba(0, 243, 255, 0.08) 0%, rgba(0, 243, 255, 0.03) 70%, transparent 100%)`,
          }}
        />
      )}

      {/* Cyber Reticle Cursor (replacing hidden default cursor) */}
      {hasMoved && (
        <motion.div
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-40"
          style={{
            left: pointerPos.x,
            top: pointerPos.y,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Outer aiming ring */}
          <div className="w-8 h-8 rounded-full border border-cyan-400/50 flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
            <span className="w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_6px_#00f3ff]" />
          </div>
          {/* Crosshair pips */}
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400/80" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400/80" />
          <span className="absolute top-1/2 -left-2 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/80" />
          <span className="absolute top-1/2 -right-2 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/80" />
        </motion.div>
      )}
    </div>
  );
}

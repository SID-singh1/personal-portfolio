import React, { useEffect } from 'react';
import { useSpring } from 'framer-motion';

/**
 * FlashlightOverlay
 * Provides the 150px radius spotlight effect revealing the background.
 * Uses smooth spring physics for responsive and buttery tracking.
 */
export default function FlashlightOverlay({ pointerPos, active }) {
  const smoothX = useSpring(pointerPos.x, { damping: 28, stiffness: 260 });
  const smoothY = useSpring(pointerPos.y, { damping: 28, stiffness: 260 });

  useEffect(() => {
    smoothX.set(pointerPos.x);
    smoothY.set(pointerPos.y);
  }, [pointerPos.x, pointerPos.y, smoothX, smoothY]);

  if (!active) return null;

  const hasMoved = pointerPos.x !== -999 && pointerPos.y !== -999;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden cursor-none">
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
    </div>
  );
}

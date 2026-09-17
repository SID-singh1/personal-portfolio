import React, { useEffect } from 'react';
import { useSpring } from 'framer-motion';

/**
 * FlashlightOverlay
 * Provides the 150px radius spotlight effect revealing the background.
 * Respects opticsEnabled: when false (Cold Boot), the mask is solid black with no spotlight.
 */
export default function FlashlightOverlay({ pointerPos, active, opticsEnabled = false }) {
  const smoothX = useSpring(pointerPos.x, { damping: 28, stiffness: 260 });
  const smoothY = useSpring(pointerPos.y, { damping: 28, stiffness: 260 });

  useEffect(() => {
    smoothX.set(pointerPos.x);
    smoothY.set(pointerPos.y);
  }, [pointerPos.x, pointerPos.y, smoothX, smoothY]);

  if (!active) return null;

  const hasMoved = pointerPos.x !== -999 && pointerPos.y !== -999;
  const showSpotlight = opticsEnabled && hasMoved;

  return (
    <div className={`absolute inset-0 pointer-events-none z-20 overflow-hidden ${opticsEnabled ? 'cursor-none' : ''}`}>
      {/* 
        Pitch black overlay:
        When opticsEnabled is true: radial mask punched out around cursor (150px radius).
        When opticsEnabled is false: solid pitch black with zero illumination.
      */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: showSpotlight
            ? `radial-gradient(circle 150px at ${pointerPos.x}px ${pointerPos.y}px, transparent 0%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.96) 92%, #000000 100%)`
            : '#000000',
        }}
      />

      {/* Subtle cyan illumination halo (only active when optics online) */}
      {showSpotlight && (
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

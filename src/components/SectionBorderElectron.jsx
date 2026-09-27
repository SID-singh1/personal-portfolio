import React, { useRef, useState, useEffect } from 'react';

/**
 * SectionBorderElectron
 * Renders 2 luminous, glowing electron light waves traveling continuously around the
 * container's rounded rectangular perimeter on opposite sides.
 * "not a literal dot. but like a moving glowing effect"
 *
 * @param {string} color - Hex or RGB accent color of the section.
 * @param {number} rx - Border radius of the container (default: 16).
 * @param {number} duration - Seconds per full perimeter loop (default: 14).
 * @param {string} className - Optional container styling classes.
 */
export default function SectionBorderElectron({
  color = '#00f3ff',
  rx = 16,
  duration = 14,
  className = '',
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;

    const updateSize = () => {
      setDimensions({
        w: parent.offsetWidth,
        h: parent.offsetHeight,
      });
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  if (dimensions.w === 0 || dimensions.h === 0) {
    return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
  }

  const { w, h } = dimensions;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-visible rounded-[inherit] ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        style={{ width: w, height: h }}
      >
        <defs>
          <filter id={`electron-glow-${w}-${h}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Outer Diffuse Glow Wave (Soft Aura - 2 packets on opposite ends) */}
        <rect
          x="1"
          y="1"
          width={Math.max(0, w - 2)}
          height={Math.max(0, h - 2)}
          rx={rx}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="10 40 10 40"
          className="animate-border-electron opacity-10 group-hover:opacity-90 transition-opacity duration-500"
          style={{
            animationDuration: `${duration}s`,
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />

        {/* 2. Intense Core Electron Wavepacket (Electric Beam - 2 packets on opposite ends) */}
        <rect
          x="1"
          y="1"
          width={Math.max(0, w - 2)}
          height={Math.max(0, h - 2)}
          rx={rx}
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="7 43 7 43"
          className="animate-border-electron opacity-20 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            animationDuration: `${duration}s`,
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        />
      </svg>
    </div>
  );
}

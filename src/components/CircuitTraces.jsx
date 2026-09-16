import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * CircuitTraces Component
 * Generates 12 glowing PCB traces shooting out from the central CPU to outside viewport edges.
 * Strictly adheres to 90° and 45° angles (no curves).
 * Uses Framer Motion's native <motion.path> pathLength animation.
 * Traces dynamically run completely off the edges of window.innerWidth and window.innerHeight.
 */
export default function CircuitTraces({ onComplete }) {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trigger State 4 (Glitch & Reveal) when electricity hits the screen boundaries (~1.45s)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1450);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const { traces, viaNodes } = useMemo(() => {
    const { width, height } = dimensions;
    const cx = width / 2;
    const cy = height / 2;
    const pad = 88; // Half-size of the CPU chip boundary

    // Off-screen boundaries to ensure lines completely exit viewport
    const leftBound = -80;
    const rightBound = width + 80;
    const topBound = -80;
    const bottomBound = height + 80;

    // 12 strict 90° / 45° PCB trace routes
    const paths = [
      // 1: Top-Left (North-West)
      [
        [cx - 50, cy - pad],
        [cx - 50, cy - pad - 70], // 90° vertical
        [cx - 50 - 100, cy - pad - 170], // 45° diagonal (dx: -100, dy: -100)
        [cx - 50 - 180, cy - pad - 170], // 90° horizontal
        [leftBound, cy - pad - 170], // 90° horizontal exit
      ],
      // 2: Top Center (North)
      [
        [cx, cy - pad],
        [cx, cy - pad - 90], // 90° vertical
        [cx + 70, cy - pad - 160], // 45° diagonal (dx: +70, dy: -70)
        [cx + 70, topBound], // 90° vertical exit
      ],
      // 3: Top-Right (North-East)
      [
        [cx + 50, cy - pad],
        [cx + 50, cy - pad - 50], // 90° vertical
        [cx + 50 + 120, cy - pad - 170], // 45° diagonal (dx: +120, dy: -120)
        [cx + 250, cy - pad - 170], // 90° horizontal
        [cx + 330, cy - pad - 250], // 45° diagonal (dx: +80, dy: -80)
        [cx + 330, topBound], // 90° vertical exit
      ],
      // 4: Right Top (East-North-East)
      [
        [cx + pad, cy - 45],
        [cx + pad + 70, cy - 45], // 90° horizontal
        [cx + pad + 150, cy - 125], // 45° diagonal (dx: +80, dy: -80)
        [rightBound, cy - 125], // 90° horizontal exit
      ],
      // 5: Right Center (East)
      [
        [cx + pad, cy],
        [cx + pad + 90, cy], // 90° horizontal
        [cx + pad + 140, cy + 50], // 45° diagonal (dx: +50, dy: +50)
        [cx + pad + 240, cy + 50], // 90° horizontal
        [rightBound, cy + 50], // 90° horizontal exit
      ],
      // 6: Right Bottom (East-South-East)
      [
        [cx + pad, cy + 45],
        [cx + pad + 60, cy + 45], // 90° horizontal
        [cx + pad + 140, cy + 125], // 45° diagonal (dx: +80, dy: +80)
        [cx + pad + 140, cy + 220], // 90° vertical
        [rightBound, cy + 220], // 90° horizontal exit
      ],
      // 7: Bottom-Right (South-East)
      [
        [cx + 50, cy + pad],
        [cx + 50, cy + pad + 60], // 90° vertical
        [cx + 50 + 110, cy + pad + 170], // 45° diagonal (dx: +110, dy: +110)
        [cx + 50 + 220, cy + pad + 170], // 90° horizontal
        [cx + 50 + 220, bottomBound], // 90° vertical exit
      ],
      // 8: Bottom Center (South)
      [
        [cx, cy + pad],
        [cx, cy + pad + 80], // 90° vertical
        [cx - 70, cy + pad + 150], // 45° diagonal (dx: -70, dy: +70)
        [cx - 70, bottomBound], // 90° vertical exit
      ],
      // 9: Bottom-Left (South-West)
      [
        [cx - 50, cy + pad],
        [cx - 50, cy + pad + 50], // 90° vertical
        [cx - 50 - 120, cy + pad + 170], // 45° diagonal (dx: -120, dy: +120)
        [cx - 240, cy + pad + 170], // 90° horizontal
        [cx - 320, cy + pad + 250], // 45° diagonal (dx: -80, dy: +80)
        [cx - 320, bottomBound], // 90° vertical exit
      ],
      // 10: Left Bottom (West-South-West)
      [
        [cx - pad, cy + 45],
        [cx - pad - 60, cy + 45], // 90° horizontal
        [cx - pad - 140, cy + 125], // 45° diagonal (dx: -80, dy: +80)
        [leftBound, cy + 125], // 90° horizontal exit
      ],
      // 11: Left Center (West)
      [
        [cx - pad, cy],
        [cx - pad - 90, cy], // 90° horizontal
        [cx - pad - 140, cy - 50], // 45° diagonal (dx: -50, dy: -50)
        [cx - pad - 240, cy - 50], // 90° horizontal
        [leftBound, cy - 50], // 90° horizontal exit
      ],
      // 12: Left Top (West-North-West)
      [
        [cx - pad, cy - 45],
        [cx - pad - 60, cy - 45], // 90° horizontal
        [cx - pad - 140, cy - 125], // 45° diagonal (dx: -80, dy: -80)
        [cx - pad - 140, cy - 220], // 90° vertical
        [leftBound, cy - 220], // 90° horizontal exit
      ],
    ];

    // Build SVG d-path strings and collect PCB via nodes (junction pads)
    const traceDefs = [];
    const vias = [];

    paths.forEach((pts, pathIdx) => {
      let d = `M ${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        d += ` L ${pts[i][0]} ${pts[i][1]}`;
        // Add PCB via pad at interior corner junctions (skip starting pin and final offscreen bound)
        if (i < pts.length - 1) {
          vias.push({
            id: `via-${pathIdx}-${i}`,
            x: pts[i][0],
            y: pts[i][1],
            delay: 0.15 + (i / pts.length) * 0.9,
          });
        }
      }
      traceDefs.push({
        id: `trace-${pathIdx}`,
        d,
        delay: 0.05 + (pathIdx % 4) * 0.06,
      });
    });

    return { traces: traceDefs, viaNodes: vias };
  }, [dimensions]);

  return (
    <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 243, 255, 0.8))' }}
      >
        <defs>
          {/* Linear gradient along traces for electric charge feel */}
          <linearGradient id="electricGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="1" />
          </linearGradient>
          <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Underlying blurred neon glow layer */}
        {traces.map((trace) => (
          <motion.path
            key={`glow-${trace.id}`}
            d={trace.d}
            fill="none"
            stroke="#00f3ff"
            strokeWidth="7"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeOpacity="0.4"
            filter="url(#glowBlur)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.35,
              delay: trace.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* 2. Sharp high-intensity electric core layer */}
        {traces.map((trace) => (
          <motion.path
            key={`core-${trace.id}`}
            d={trace.d}
            fill="none"
            stroke="url(#electricGlow)"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.35,
              delay: trace.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* 3. PCB Via Ring Nodes at turning junctions */}
        {viaNodes.map((via) => (
          <motion.g
            key={via.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: via.delay, duration: 0.2 }}
          >
            {/* Outer via solder collar */}
            <circle
              cx={via.x}
              cy={via.y}
              r="4.5"
              fill="none"
              stroke="#00f3ff"
              strokeWidth="1.5"
              className="drop-shadow-[0_0_6px_#00f3ff]"
            />
            {/* Center via drill hole */}
            <circle cx={via.x} cy={via.y} r="1.8" fill="#ffffff" />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

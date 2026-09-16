import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * CircuitTraces Component
 * Generates 20 complex, asymmetrical PCB traces shooting out from the central CPU to outside viewport edges.
 * Strictly adheres to 90° and 45° angles (no curves).
 * Animation lasts ~2.4 seconds (1 second longer for dramatic electrical propagation).
 * Uses Framer Motion's native <motion.path> pathLength animation.
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

  // Trigger State 4 (Glitch & Reveal) after extended surge (~2.45s)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2450);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const { traces, viaNodes } = useMemo(() => {
    const { width, height } = dimensions;
    const cx = width / 2;
    const cy = height / 2;
    const pad = 88; // Half-size of the CPU chip boundary

    // Off-screen boundaries to ensure lines completely exit viewport
    const leftBound = -90;
    const rightBound = width + 90;
    const topBound = -90;
    const bottomBound = height + 90;

    // 20 rich, asymmetrical 90° and 45° PCB trace pathways
    const paths = [
      // 1: Top Far Left (North-West bus)
      [
        [cx - 65, cy - pad],
        [cx - 65, cy - pad - 50],
        [cx - 65 - 120, cy - pad - 170], // 45° (dx: -120, dy: -120)
        [cx - 65 - 280, cy - pad - 170], // 90° horiz
        [cx - 65 - 360, cy - pad - 250], // 45° (dx: -80, dy: -80)
        [leftBound, cy - pad - 250], // 90° exit
      ],
      // 2: Top Mid Left
      [
        [cx - 40, cy - pad],
        [cx - 40, cy - pad - 110],
        [cx - 40 - 90, cy - pad - 200], // 45° (dx: -90, dy: -90)
        [cx - 40 - 90, topBound], // 90° exit
      ],
      // 3: Top Inner Left (North)
      [
        [cx - 15, cy - pad],
        [cx - 15, cy - pad - 75],
        [cx - 15 + 60, cy - pad - 135], // 45° (dx: +60, dy: -60)
        [cx - 15 + 60, cy - pad - 210],
        [cx - 15 + 10, cy - pad - 260], // 45° (dx: -50, dy: -50)
        [cx - 15 + 10, topBound], // 90° exit
      ],
      // 4: Top Inner Right (North)
      [
        [cx + 15, cy - pad],
        [cx + 15, cy - pad - 95],
        [cx + 15 + 85, cy - pad - 180], // 45° (dx: +85, dy: -85)
        [cx + 15 + 85, topBound], // 90° exit
      ],
      // 5: Top Mid Right
      [
        [cx + 40, cy - pad],
        [cx + 40, cy - pad - 60],
        [cx + 40 + 110, cy - pad - 170], // 45° (dx: +110, dy: -110)
        [cx + 40 + 260, cy - pad - 170], // 90° horiz
        [cx + 40 + 340, cy - pad - 250], // 45° (dx: +80, dy: -80)
        [cx + 40 + 340, topBound], // 90° exit
      ],
      // 6: Top Far Right (North-East bus)
      [
        [cx + 65, cy - pad],
        [cx + 65, cy - pad - 40],
        [cx + 65 + 140, cy - pad - 180], // 45° (dx: +140, dy: -140)
        [cx + 65 + 320, cy - pad - 180], // 90° horiz
        [rightBound, cy - pad - 180], // 90° exit
      ],

      // 7: Right Top
      [
        [cx + pad, cy - 50],
        [cx + pad + 85, cy - 50],
        [cx + pad + 165, cy - 130], // 45° (dx: +80, dy: -80)
        [rightBound, cy - 130], // 90° exit
      ],
      // 8: Right Mid-Upper
      [
        [cx + pad, cy - 25],
        [cx + pad + 120, cy - 25],
        [cx + pad + 180, cy + 35], // 45° (dx: +60, dy: +60)
        [cx + pad + 270, cy + 35], // 90° horiz
        [cx + pad + 330, cy - 25], // 45° (dx: +60, dy: -60)
        [rightBound, cy - 25], // 90° exit
      ],
      // 9: Right Center
      [
        [cx + pad, cy],
        [cx + pad + 70, cy],
        [cx + pad + 130, cy + 60], // 45° (dx: +60, dy: +60)
        [cx + pad + 240, cy + 60], // 90° horiz
        [rightBound, cy + 60], // 90° exit
      ],
      // 10: Right Mid-Lower
      [
        [cx + pad, cy + 25],
        [cx + pad + 100, cy + 25],
        [cx + pad + 180, cy + 105], // 45° (dx: +80, dy: +80)
        [cx + pad + 180, cy + 210], // 90° vert
        [rightBound, cy + 210], // 90° exit
      ],
      // 11: Right Bottom
      [
        [cx + pad, cy + 50],
        [cx + pad + 55, cy + 50],
        [cx + pad + 145, cy + 140], // 45° (dx: +90, dy: +90)
        [cx + pad + 145, cy + 260], // 90° vert
        [cx + pad + 225, cy + 340], // 45° (dx: +80, dy: +80)
        [cx + pad + 225, bottomBound], // 90° exit
      ],

      // 12: Bottom Far Right (South-East)
      [
        [cx + 60, cy + pad],
        [cx + 60, cy + pad + 60],
        [cx + 60 + 130, cy + pad + 190], // 45° (dx: +130, dy: +130)
        [cx + 60 + 280, cy + pad + 190], // 90° horiz
        [rightBound, cy + pad + 190], // 90° exit
      ],
      // 13: Bottom Mid Right
      [
        [cx + 30, cy + pad],
        [cx + 30, cy + pad + 110],
        [cx + 30 + 90, cy + pad + 200], // 45° (dx: +90, dy: +90)
        [cx + 30 + 90, bottomBound], // 90° exit
      ],
      // 14: Bottom Center
      [
        [cx, cy + pad],
        [cx, cy + pad + 80],
        [cx - 65, cy + pad + 145], // 45° (dx: -65, dy: +65)
        [cx - 65, cy + pad + 230], // 90° vert
        [cx - 15, cy + pad + 280], // 45° (dx: +50, dy: +50)
        [cx - 15, bottomBound], // 90° exit
      ],
      // 15: Bottom Mid Left
      [
        [cx - 30, cy + pad],
        [cx - 30, cy + pad + 75],
        [cx - 30 - 105, cy + pad + 180], // 45° (dx: -105, dy: +105)
        [cx - 30 - 105, bottomBound], // 90° exit
      ],
      // 16: Bottom Far Left (South-West)
      [
        [cx - 60, cy + pad],
        [cx - 60, cy + pad + 50],
        [cx - 60 - 140, cy + pad + 190], // 45° (dx: -140, dy: +140)
        [cx - 60 - 270, cy + pad + 190], // 90° horiz
        [cx - 60 - 350, cy + pad + 270], // 45° (dx: -80, dy: +80)
        [cx - 60 - 350, bottomBound], // 90° exit
      ],

      // 17: Left Bottom
      [
        [cx - pad, cy + 45],
        [cx - pad - 70, cy + 45],
        [cx - pad - 160, cy + 135], // 45° (dx: -90, dy: +90)
        [leftBound, cy + 135], // 90° exit
      ],
      // 18: Left Mid-Lower
      [
        [cx - pad, cy + 20],
        [cx - pad - 120, cy + 20],
        [cx - pad - 180, cy - 40], // 45° (dx: -60, dy: -60)
        [cx - pad - 260, cy - 40], // 90° horiz
        [leftBound, cy - 40], // 90° exit
      ],
      // 19: Left Center
      [
        [cx - pad, cy - 10],
        [cx - pad - 80, cy - 10],
        [cx - pad - 140, cy - 70], // 45° (dx: -60, dy: -60)
        [cx - pad - 240, cy - 70], // 90° horiz
        [leftBound, cy - 70], // 90° exit
      ],
      // 20: Left Top
      [
        [cx - pad, cy - 45],
        [cx - pad - 60, cy - 45],
        [cx - pad - 150, cy - 135], // 45° (dx: -90, dy: -90)
        [cx - pad - 150, cy - 240], // 90° vert
        [leftBound, cy - 240], // 90° exit
      ],
    ];

    // Build SVG d-path strings and collect PCB via nodes
    const traceDefs = [];
    const vias = [];

    paths.forEach((pts, pathIdx) => {
      let d = `M ${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        d += ` L ${pts[i][0]} ${pts[i][1]}`;
        // Add PCB via pad at interior corner junctions
        if (i < pts.length - 1) {
          vias.push({
            id: `via-${pathIdx}-${i}`,
            x: pts[i][0],
            y: pts[i][1],
            delay: 0.2 + (i / pts.length) * 1.5,
          });
        }
      }
      traceDefs.push({
        id: `trace-${pathIdx}`,
        d,
        delay: 0.04 + (pathIdx % 6) * 0.08,
      });
    });

    return { traces: traceDefs, viaNodes: vias };
  }, [dimensions]);

  return (
    <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ filter: 'drop-shadow(0 0 10px rgba(0, 243, 255, 0.85))' }}
      >
        <defs>
          {/* Electric energy gradient */}
          <linearGradient id="electricGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="1" />
          </linearGradient>
          <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Underlying blurred neon bloom layer */}
        {traces.map((trace) => (
          <motion.path
            key={`glow-${trace.id}`}
            d={trace.d}
            fill="none"
            stroke="#00f3ff"
            strokeWidth="7.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeOpacity="0.45"
            filter="url(#glowBlur)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.3, // Extended duration (~1 second longer)
              delay: trace.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* 2. Crisp high-intensity electric core layer */}
        {traces.map((trace) => (
          <motion.path
            key={`core-${trace.id}`}
            d={trace.d}
            fill="none"
            stroke="url(#electricGlow)"
            strokeWidth="2.8"
            strokeLinecap="square"
            strokeLinejoin="miter"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.3, // Extended duration (~1 second longer)
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
            transition={{ delay: via.delay, duration: 0.25 }}
          >
            <circle
              cx={via.x}
              cy={via.y}
              r="4.5"
              fill="none"
              stroke="#00f3ff"
              strokeWidth="1.6"
              className="drop-shadow-[0_0_8px_#00f3ff]"
            />
            <circle cx={via.x} cy={via.y} r="1.8" fill="#ffffff" />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

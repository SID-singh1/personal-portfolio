import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 10 Predetermined Octilinear PCB Paths (normalized to 1000 x 1000 viewport units)
 * Origin: Bottom-Right (~940, 940) near the Temptation Trigger widget
 * Destinations: Distributed gracefully across the top-left and left-side zones
 * Geometry: STRICT 90° and 45° angles only. Solder vias at key junctions.
 */
const SIGNAL_PATHS = [
  // 0: Perimeter Rail (sweeps along bottom margin, steps 45°, sweeps up left rail into header)
  {
    id: 'perimeter-rail',
    d: 'M 940,940 L 260,940 L 190,870 L 190,320 L 130,260 L 130,95',
    vias: [
      { x: 940, y: 940 },
      { x: 260, y: 940 },
      { x: 190, y: 870 },
      { x: 190, y: 320 },
      { x: 130, y: 260 },
      { x: 130, y: 95 },
    ],
  },
  // 1: Core Highway (diagonal 45° step, traverses center, doglegs into top-left)
  {
    id: 'core-highway',
    d: 'M 940,940 L 860,860 L 590,860 L 470,740 L 470,410 L 300,240 L 140,240 L 95,195 L 95,90',
    vias: [
      { x: 940, y: 940 },
      { x: 860, y: 860 },
      { x: 590, y: 860 },
      { x: 470, y: 740 },
      { x: 470, y: 410 },
      { x: 300, y: 240 },
      { x: 140, y: 240 },
      { x: 95, y: 195 },
      { x: 95, y: 90 },
    ],
  },
  // 2: Orthogonal Staircase (90° horizontal/vertical architectural steps)
  {
    id: 'orthogonal-staircase',
    d: 'M 940,940 L 940,780 L 730,780 L 730,560 L 510,560 L 510,340 L 290,340 L 290,140 L 110,140',
    vias: [
      { x: 940, y: 940 },
      { x: 940, y: 780 },
      { x: 730, y: 780 },
      { x: 730, y: 560 },
      { x: 510, y: 560 },
      { x: 510, y: 340 },
      { x: 290, y: 340 },
      { x: 290, y: 140 },
      { x: 110, y: 140 },
    ],
  },
  // 3: High Trench Rail (ascends right margin, turns 90° across ceiling, descends 45° to top-left)
  {
    id: 'high-trench',
    d: 'M 940,940 L 940,250 L 880,190 L 330,190 L 230,290 L 150,290 L 150,90',
    vias: [
      { x: 940, y: 940 },
      { x: 940, y: 250 },
      { x: 880, y: 190 },
      { x: 330, y: 190 },
      { x: 230, y: 290 },
      { x: 150, y: 290 },
      { x: 150, y: 90 },
    ],
  },
  // 4: Octilinear Serpent (complex 45° alternating doglegs across the viewport)
  {
    id: 'octilinear-serpent',
    d: 'M 940,940 L 820,820 L 820,670 L 670,520 L 450,520 L 350,420 L 350,220 L 230,100 L 95,100',
    vias: [
      { x: 940, y: 940 },
      { x: 820, y: 820 },
      { x: 820, y: 670 },
      { x: 670, y: 520 },
      { x: 450, y: 520 },
      { x: 350, y: 420 },
      { x: 350, y: 220 },
      { x: 230, y: 100 },
      { x: 95, y: 100 },
    ],
  },
  // 5: Status Bus Injection (targets the live status pill area)
  {
    id: 'status-bus',
    d: 'M 940,940 L 400,940 L 310,850 L 310,380 L 250,320 L 250,140 L 180,140',
    vias: [
      { x: 940, y: 940 },
      { x: 400, y: 940 },
      { x: 310, y: 850 },
      { x: 310, y: 380 },
      { x: 250, y: 320 },
      { x: 250, y: 140 },
      { x: 180, y: 140 },
    ],
  },
  // 6: The Diagonal Express (bold 45° climbing traverse through center)
  {
    id: 'diagonal-express',
    d: 'M 940,940 L 500,500 L 500,300 L 360,160 L 160,160 L 110,110',
    vias: [
      { x: 940, y: 940 },
      { x: 500, y: 500 },
      { x: 500, y: 300 },
      { x: 360, y: 160 },
      { x: 160, y: 160 },
      { x: 110, y: 110 },
    ],
  },
  // 7: Mid-Stratum Ladder (right climb, 45° dogleg through center, lands at left margin)
  {
    id: 'mid-stratum-ladder',
    d: 'M 940,940 L 940,620 L 820,500 L 420,500 L 280,360 L 280,180 L 210,110 L 80,110',
    vias: [
      { x: 940, y: 940 },
      { x: 940, y: 620 },
      { x: 820, y: 500 },
      { x: 420, y: 500 },
      { x: 280, y: 360 },
      { x: 280, y: 180 },
      { x: 210, y: 110 },
      { x: 80, y: 110 },
    ],
  },
  // 8: Deep Floor Trench (sweeps low along bottom, hugs outer left spine)
  {
    id: 'deep-floor-trench',
    d: 'M 940,940 L 880,880 L 180,880 L 180,600 L 120,540 L 120,180 L 70,130 L 70,75',
    vias: [
      { x: 940, y: 940 },
      { x: 880, y: 880 },
      { x: 180, y: 880 },
      { x: 180, y: 600 },
      { x: 120, y: 540 },
      { x: 120, y: 180 },
      { x: 70, y: 130 },
      { x: 70, y: 75 },
    ],
  },
  // 9: Quantum Upper Bypass (ascends right side, cuts through upper third, steps into top nav)
  {
    id: 'quantum-upper-bypass',
    d: 'M 940,940 L 940,480 L 680,480 L 560,360 L 320,360 L 320,200 L 220,100 L 140,100',
    vias: [
      { x: 940, y: 940 },
      { x: 940, y: 480 },
      { x: 680, y: 480 },
      { x: 560, y: 360 },
      { x: 320, y: 360 },
      { x: 320, y: 200 },
      { x: 220, y: 100 },
      { x: 140, y: 100 },
    ],
  },
];

export default function SignalEmitter() {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [signalKey, setSignalKey] = useState(0);
  const lastIndexRef = useRef(0);

  // Pick randomly out of the 10 paths (ensuring no back-to-back repeats)
  useEffect(() => {
    const triggerSignal = () => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * SIGNAL_PATHS.length);
      } while (nextIndex === lastIndexRef.current && SIGNAL_PATHS.length > 1);

      lastIndexRef.current = nextIndex;
      setActivePathIndex(nextIndex);
      setSignalKey((k) => k + 1);
    };

    // Initial signal 3.5s after mount to catch quick scanners
    const initialTimer = setTimeout(() => {
      triggerSignal();
    }, 3500);

    // Randomized interval around 10 seconds (~9.5s to 11s)
    let intervalTimer;
    const scheduleNext = () => {
      const delay = 9500 + Math.random() * 1500;
      intervalTimer = setTimeout(() => {
        triggerSignal();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(intervalTimer);
    };
  }, []);

  const activePath = SIGNAL_PATHS[activePathIndex];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Fullscreen responsive SVG layer for PCB circuit signals */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{ filter: 'drop-shadow(0 0 6px rgba(0,243,255,0.35))' }}
      >
        <defs>
          {/* Subtle electric cyan glow filter */}
          <filter id="circuit-signal-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Electric energy gradient along path */}
          <linearGradient id="signalGradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffb703" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#00f3ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <AnimatePresence mode="wait">
          <g key={signalKey}>
            {/* Background dormant trace track (very faint guide) */}
            <path
              d={activePath.d}
              fill="none"
              stroke="rgba(255,255,255,0.018)"
              strokeWidth="1.2"
              strokeLinecap="square"
            />

            {/* Glowing Phosphor Trace that draws out and softly dissipates */}
            <motion.path
              d={activePath.d}
              fill="none"
              stroke="url(#signalGradient)"
              strokeWidth="1.8"
              strokeLinecap="round"
              filter="url(#circuit-signal-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 0.7, 0.4, 0],
              }}
              transition={{
                pathLength: { duration: 2.2, ease: [0.25, 0.1, 0.25, 1] },
                opacity: { duration: 3.2, times: [0, 0.2, 0.7, 1], ease: 'easeOut' },
              }}
            />

            {/* High-intensity electric core spark line */}
            <motion.path
              d={activePath.d}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 0.85, 0],
              }}
              transition={{
                pathLength: { duration: 2.2, ease: [0.25, 0.1, 0.25, 1] },
                opacity: { duration: 2.5, times: [0, 0.3, 1], ease: 'easeOut' },
              }}
            />

            {/* Solder Vias along the active route that pulse as the electrical packet passes */}
            {activePath.vias.map((via, idx) => {
              const fraction = idx / (activePath.vias.length - 1);
              const delay = fraction * 2.0;

              return (
                <g key={`via-${idx}`}>
                  {/* Via outer ring */}
                  <motion.circle
                    cx={via.x}
                    cy={via.y}
                    r="4"
                    fill="none"
                    stroke="rgba(0,243,255,0.5)"
                    strokeWidth="1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.35, 1],
                      opacity: [0, 0.75, 0.1, 0],
                    }}
                    transition={{
                      delay,
                      duration: 1.1,
                      ease: 'easeOut',
                    }}
                  />
                  {/* Via center micro-node */}
                  <motion.circle
                    cx={via.x}
                    cy={via.y}
                    r="1.8"
                    fill="#00f3ff"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      delay,
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                  />
                </g>
              );
            })}
          </g>
        </AnimatePresence>
      </svg>
    </div>
  );
}

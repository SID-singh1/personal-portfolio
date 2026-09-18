import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 5 Predetermined Octilinear PCB Paths (normalized to 1000 x 1000 viewport units)
 * Origin: Bottom-Right (~940, 940) near the Temptation Trigger widget
 * Destination: Top-Left (~90-130, 80-120) near header / status indicator
 * Geometry: STRICT 90° and 45° angles only. Solder vias at key junctions.
 */
const SIGNAL_PATHS = [
  // Path 1: Perimeter Rail (runs along bottom, steps 45°, sweeps up left rail into header)
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
    endPoint: { x: '13%', y: '9.5%' },
    message: '[SYS_SIG: 0x01] // OVERCLOCK_READY',
  },
  // Path 2: Core Highway (diagonal 45° step, traverses center, doglegs into top-left)
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
    endPoint: { x: '9.5%', y: '9%' },
    message: 'PACKET_RX: SIGNAL_ACTIVE // [EASTER_EGG_ONLINE]',
  },
  // Path 3: Orthogonal Staircase (90° horizontal/vertical architectural steps)
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
    endPoint: { x: '11%', y: '14%' },
    message: 'SYS_NOTE: YOU ARE AMAZING // RECRUITER_PASS',
  },
  // Path 4: High Trench (ascends right margin, turns 90° across ceiling, descends 45° to top-left)
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
    endPoint: { x: '15%', y: '9%' },
    message: 'ANOMALY DETECTED IN SECTOR BR // INSPECT WIDGET',
  },
  // Path 5: Octilinear Serpent (complex 45° alternating doglegs and dense solder matrix)
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
    endPoint: { x: '9.5%', y: '10%' },
    message: '[TELEMETRY: OVERCLOCK PROTOCOL UNLOCKED]',
  },
];

export default function SignalEmitter() {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [signalKey, setSignalKey] = useState(0);
  const [showWhisper, setShowWhisper] = useState(false);

  // Cycle through 5 predetermined paths every 10 seconds
  useEffect(() => {
    const triggerSignal = () => {
      setActivePathIndex((prev) => (prev + 1) % SIGNAL_PATHS.length);
      setSignalKey((k) => k + 1);
      setShowWhisper(false);

      // Whisper packet appears as the pulse arrives at the top-left (~2.2s after fire)
      const whisperTimer = setTimeout(() => {
        setShowWhisper(true);
      }, 2200);

      // Hide whisper after 2.8s display
      const hideTimer = setTimeout(() => {
        setShowWhisper(false);
      }, 5000);

      return () => {
        clearTimeout(whisperTimer);
        clearTimeout(hideTimer);
      };
    };

    // Initial signal after 3.5s of page load to entice fast scanners
    const initialTimer = setTimeout(() => {
      triggerSignal();
    }, 3500);

    // Then interval every 10.5 seconds
    const interval = setInterval(() => {
      triggerSignal();
    }, 10500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
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
        style={{ filter: 'drop-shadow(0 0 6px rgba(0,243,255,0.4))' }}
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

          {/* Linear gradient along path */}
          <linearGradient id="signalGradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffb703" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#00f3ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <AnimatePresence mode="wait">
          <g key={signalKey}>
            {/* Background dim dormant trace track (very faint guide) */}
            <path
              d={activePath.d}
              fill="none"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="1.2"
              strokeLinecap="square"
            />

            {/* Glowing Phosphor Trace that draws out and fades */}
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
                opacity: [0, 0.75, 0.45, 0],
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
                opacity: [0, 0.9, 0],
              }}
              transition={{
                pathLength: { duration: 2.2, ease: [0.25, 0.1, 0.25, 1] },
                opacity: { duration: 2.6, times: [0, 0.3, 1], ease: 'easeOut' },
              }}
            />

            {/* Solder Vias along the active route that flash as signal passes */}
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
                    stroke="rgba(0,243,255,0.6)"
                    strokeWidth="1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.4, 1],
                      opacity: [0, 0.8, 0.15, 0],
                    }}
                    transition={{
                      delay,
                      duration: 1.2,
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
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      delay,
                      duration: 0.9,
                      ease: 'easeOut',
                    }}
                  />
                </g>
              );
            })}
          </g>
        </AnimatePresence>
      </svg>

      {/* Arrival Whisper Transmission (Appears near the top-left destination point) */}
      <AnimatePresence>
        {showWhisper && (
          <motion.div
            className="fixed top-20 left-6 md:left-20 z-30 pointer-events-none flex items-center space-x-2 px-3 py-1.5 rounded border border-cyan-500/25 bg-[#09090b]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,243,255,0.15)]"
            initial={{ opacity: 0, x: -10, y: -4, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -6, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Pulsing cyan packet node */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>

            {/* Monospace telemetry message */}
            <span className="text-[11px] font-mono text-cyan-300 tracking-wider font-medium">
              {activePath.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

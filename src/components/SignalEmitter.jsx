import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 10 Predetermined Octilinear PCB Paths that route FLUSH to the physical viewport margins.
 * Origin: Dynamically measured from the Temptation Trigger widget's live viewport position.
 * Terminus: Docks directly into the physical screen edges (x = 0 or y = 0) with edge connector pads:
 *   0: Left margin at y=40 (flush left edge next to branding)
 *   1: Top margin at x=180 (flush top edge above status badges)
 *   2: Top margin at x=320 (flush top edge above telemetry)
 *   3: Top margin at x=500 (flush top edge at center ceiling)
 *   4: Left margin at y=115 (flush left edge adjacent to status pill)
 *   5: Left margin at y=185 (flush left edge adjacent to hero headline)
 *   6: Left margin at y=310 (flush left edge adjacent to bio lead)
 *   7: Left margin at y=480 (flush left edge adjacent to action buttons)
 *   8: Left margin at y=640 (flush left edge adjacent to system bus)
 *   9: Top margin at x=80 (flush top edge near extreme top-left corner)
 *
 * Strict Octilinear Geometry: 90° and 45° angles only.
 */
function getSignalPaths(originX, originY) {
  const ox = originX || 935;
  const oy = originY || 940;

  return [
    // 0: Flush to left edge at y=40
    {
      id: 'margin-left-40',
      d: `M ${ox},${oy} L 260,${oy} L 190,${oy - 70} L 190,260 L 120,190 L 120,70 L 90,40 L 0,40`,
      endPad: { x: 0, y: 40, orientation: 'horizontal' },
      vias: [
        { x: ox, y: oy },
        { x: 260, y: oy },
        { x: 190, y: oy - 70 },
        { x: 190, y: 260 },
        { x: 120, y: 190 },
        { x: 120, y: 70 },
        { x: 90, y: 40 },
      ],
    },
    // 1: Flush to top edge at x=180
    {
      id: 'margin-top-180',
      d: `M ${ox},${oy} L 380,${oy} L 290,${oy - 90} L 290,380 L 230,320 L 230,50 L 180,0`,
      endPad: { x: 180, y: 0, orientation: 'vertical' },
      vias: [
        { x: ox, y: oy },
        { x: 380, y: oy },
        { x: 290, y: oy - 90 },
        { x: 290, y: 380 },
        { x: 230, y: 320 },
        { x: 230, y: 50 },
      ],
    },
    // 2: Flush to top edge at x=320
    {
      id: 'margin-top-320',
      d: `M ${ox},${oy} L ${ox - 120},${oy - 120} L ${ox - 120},560 L 620,380 L 420,380 L 350,310 L 350,30 L 320,0`,
      endPad: { x: 320, y: 0, orientation: 'vertical' },
      vias: [
        { x: ox, y: oy },
        { x: ox - 120, y: oy - 120 },
        { x: ox - 120, y: 560 },
        { x: 620, y: 380 },
        { x: 420, y: 380 },
        { x: 350, y: 310 },
        { x: 350, y: 30 },
      ],
    },
    // 3: Flush to top edge at x=500
    {
      id: 'margin-top-500',
      d: `M ${ox},${oy} L ${ox},640 L ${ox - 140},500 L 560,500 L 560,60 L 500,0`,
      endPad: { x: 500, y: 0, orientation: 'vertical' },
      vias: [
        { x: ox, y: oy },
        { x: ox, y: 640 },
        { x: ox - 140, y: 500 },
        { x: 560, y: 500 },
        { x: 560, y: 60 },
      ],
    },
    // 4: Flush to left edge at y=115
    {
      id: 'margin-left-115',
      d: `M ${ox},${oy} L 520,${Math.max(200, oy - (ox - 520))} L 520,340 L 380,200 L 160,200 L 75,115 L 0,115`,
      endPad: { x: 0, y: 115, orientation: 'horizontal' },
      vias: [
        { x: ox, y: oy },
        { x: 520, y: Math.max(200, oy - (ox - 520)) },
        { x: 520, y: 340 },
        { x: 380, y: 200 },
        { x: 160, y: 200 },
        { x: 75, y: 115 },
      ],
    },
    // 5: Flush to left edge at y=185
    {
      id: 'margin-left-185',
      d: `M ${ox},${oy} L 560,${Math.max(200, oy - (ox - 560))} L 440,${Math.max(200, oy - (ox - 560))} L 280,280 L 185,185 L 0,185`,
      endPad: { x: 0, y: 185, orientation: 'horizontal' },
      vias: [
        { x: ox, y: oy },
        { x: 560, y: Math.max(200, oy - (ox - 560)) },
        { x: 440, y: Math.max(200, oy - (ox - 560)) },
        { x: 280, y: 280 },
        { x: 185, y: 185 },
      ],
    },
    // 6: Flush to left edge at y=310
    {
      id: 'margin-left-310',
      d: `M ${ox},${oy} L 160,${oy} L 90,${oy - 70} L 90,400 L 0,310`,
      endPad: { x: 0, y: 310, orientation: 'horizontal' },
      vias: [
        { x: ox, y: oy },
        { x: 160, y: oy },
        { x: 90, y: oy - 70 },
        { x: 90, y: 400 },
      ],
    },
    // 7: Flush to left edge at y=480
    {
      id: 'margin-left-480',
      d: `M ${ox},${oy} L ${ox},720 L 650,720 L 500,570 L 280,570 L 190,480 L 0,480`,
      endPad: { x: 0, y: 480, orientation: 'horizontal' },
      vias: [
        { x: ox, y: oy },
        { x: ox, y: 720 },
        { x: 650, y: 720 },
        { x: 500, y: 570 },
        { x: 280, y: 570 },
        { x: 190, y: 480 },
      ],
    },
    // 8: Flush to left edge at y=640
    {
      id: 'margin-left-640',
      d: `M ${ox},${oy} L ${ox - 80},${oy - 80} L 240,${oy - 80} L 120,760 L 0,640`,
      endPad: { x: 0, y: 640, orientation: 'horizontal' },
      vias: [
        { x: ox, y: oy },
        { x: ox - 80, y: oy - 80 },
        { x: 240, y: oy - 80 },
        { x: 120, y: 760 },
      ],
    },
    // 9: Flush to top edge at x=80
    {
      id: 'margin-top-80',
      d: `M ${ox},${oy} L 200,${oy} L 130,${oy - 70} L 130,130 L 80,80 L 80,0`,
      endPad: { x: 80, y: 0, orientation: 'vertical' },
      vias: [
        { x: ox, y: oy },
        { x: 200, y: oy },
        { x: 130, y: oy - 70 },
        { x: 130, y: 130 },
        { x: 80, y: 80 },
      ],
    },
  ];
}

export default function SignalEmitter() {
  const [origin, setOrigin] = useState({ x: 935, y: 940 });
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [signalKey, setSignalKey] = useState(0);
  const lastIndexRef = useRef(0);

  // Measure widget's live viewport position
  useEffect(() => {
    const updateOrigin = () => {
      const el = document.getElementById('overclock-temptation-widget');
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = ((rect.left + rect.width / 2) / window.innerWidth) * 1000;
        const y = ((rect.top + rect.height / 2) / window.innerHeight) * 1000;
        setOrigin({ x: Math.round(x), y: Math.round(y) });
      }
    };

    updateOrigin();
    window.addEventListener('resize', updateOrigin);
    return () => window.removeEventListener('resize', updateOrigin);
  }, []);

  const signalPaths = useMemo(
    () => getSignalPaths(origin.x, origin.y),
    [origin.x, origin.y]
  );

  // Timing: Fire one immediately at mount (500ms), then discrete 7.5s to 12.5s intervals (step 0.5s)
  useEffect(() => {
    const triggerSignal = () => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * signalPaths.length);
      } while (nextIndex === lastIndexRef.current && signalPaths.length > 1);

      lastIndexRef.current = nextIndex;
      setActivePathIndex(nextIndex);
      setSignalKey((k) => k + 1);
    };

    // Immediate initial fire on page load (500ms delay for DOM stabilization)
    const initialTimer = setTimeout(() => {
      triggerSignal();
    }, 500);

    // Subsequent pulses: 7.5s to 12.5s with discrete 0.5s steps
    let intervalTimer;
    const scheduleNext = () => {
      // Possible step counts: 0 to 10 (each is 0.5s -> 0.0s to 5.0s added to 7.5s)
      const step = Math.floor(Math.random() * 11);
      const delayMs = (7.5 + step * 0.5) * 1000;

      intervalTimer = setTimeout(() => {
        triggerSignal();
        scheduleNext();
      }, delayMs);
    };

    // Begin schedule loop after initial burst
    const loopTimer = setTimeout(() => {
      scheduleNext();
    }, 1200);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(loopTimer);
      clearTimeout(intervalTimer);
    };
  }, [signalPaths.length]);

  const activePath = signalPaths[activePathIndex] || signalPaths[0];

  // S-Curve Velocity profile:
  // Starts slow [0.78, 0], accelerates into violent surge, decelerates [0.22, 1] into perimeter
  const surgeEase = [0.78, 0, 0.22, 1];
  const travelDuration = 1.75;
  const tailDelay = 0.32;

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
            <stop offset="0%" stopColor="#ffb703" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#00f3ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <AnimatePresence mode="wait">
          <g key={signalKey}>
            {/* Background dormant trace track (faint structural guide) */}
            <path
              d={activePath.d}
              fill="none"
              stroke="rgba(255,255,255,0.015)"
              strokeWidth="1.2"
              strokeLinecap="square"
            />

            {/* Phosphor afterglow trail: fades out gracefully */}
            <motion.path
              d={activePath.d}
              fill="none"
              stroke="rgba(0,243,255,0.12)"
              strokeWidth="1.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 0.4, 0.2, 0],
              }}
              transition={{
                pathLength: { duration: travelDuration, ease: surgeEase },
                opacity: { duration: travelDuration + 1.0, times: [0, 0.3, 0.7, 1], ease: 'easeOut' },
              }}
            />

            {/* Traveling Electrical Surge Beam (Head surges, Tail chases and joins!) */}
            <motion.path
              d={activePath.d}
              fill="none"
              stroke="url(#signalGradient)"
              strokeWidth="2.0"
              strokeLinecap="round"
              filter="url(#circuit-signal-glow)"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                pathOffset: 1,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                pathLength: {
                  duration: travelDuration,
                  ease: surgeEase,
                },
                pathOffset: {
                  delay: tailDelay,
                  duration: travelDuration,
                  ease: surgeEase,
                },
                opacity: {
                  duration: travelDuration + tailDelay + 0.1,
                  times: [0, 0.08, 0.92, 1],
                  ease: 'linear',
                },
              }}
            />

            {/* High-intensity electric core filament */}
            <motion.path
              d={activePath.d}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.9"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                pathOffset: 1,
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                pathLength: {
                  duration: travelDuration,
                  ease: surgeEase,
                },
                pathOffset: {
                  delay: tailDelay,
                  duration: travelDuration,
                  ease: surgeEase,
                },
                opacity: {
                  duration: travelDuration + tailDelay + 0.05,
                  times: [0, 0.08, 0.92, 1],
                  ease: 'linear',
                },
              }}
            />

            {/* Solder Vias along route */}
            {activePath.vias.map((via, idx) => {
              const fraction = idx / (activePath.vias.length - 1);
              const viaDelay = Math.pow(fraction, 1.6) * travelDuration;

              return (
                <g key={`via-${idx}`}>
                  <motion.circle
                    cx={via.x}
                    cy={via.y}
                    r="3.5"
                    fill="none"
                    stroke="rgba(0,243,255,0.45)"
                    strokeWidth="1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.3, 1],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      delay: viaDelay,
                      duration: 0.7,
                      ease: 'easeOut',
                    }}
                  />
                  <motion.circle
                    cx={via.x}
                    cy={via.y}
                    r="1.6"
                    fill="#00f3ff"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      delay: viaDelay,
                      duration: 0.5,
                      ease: 'easeOut',
                    }}
                  />
                </g>
              );
            })}

            {/* Physical Edge Connector Contact Pad (lights up at perimeter) */}
            {activePath.endPad.orientation === 'horizontal' ? (
              // Edge finger at left border (x = 0)
              <motion.rect
                x="0"
                y={activePath.endPad.y - 4}
                width="8"
                height="8"
                fill="#00f3ff"
                filter="url(#circuit-signal-glow)"
                initial={{ opacity: 0, scaleX: 0.5 }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0.5, 1.4, 1],
                }}
                transition={{
                  delay: travelDuration - 0.1,
                  duration: 0.85,
                  ease: 'easeOut',
                }}
              />
            ) : (
              // Edge finger at top border (y = 0)
              <motion.rect
                x={activePath.endPad.x - 4}
                y="0"
                width="8"
                height="8"
                fill="#00f3ff"
                filter="url(#circuit-signal-glow)"
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0.5, 1.4, 1],
                }}
                transition={{
                  delay: travelDuration - 0.1,
                  duration: 0.85,
                  ease: 'easeOut',
                }}
              />
            )}
          </g>
        </AnimatePresence>
      </svg>
    </div>
  );
}

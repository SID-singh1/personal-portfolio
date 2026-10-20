import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * DistillationNet: a wide "teacher" network narrowing into a small "student".
 * One calm signal at a time glides through the layers on a steady rhythm,
 * softly lighting the nodes it passes; the student layer gently breathes.
 */
const LAYERS = [7, 6, 5, 4, 3];
const W = 340;
const H = 230;
const PAD_X = 16;
const GAP_Y = 30;
const HOP = 0.5; // seconds per layer
const CYCLE = 3400; // ms between signals

const nodes = LAYERS.map((count, li) => {
  const x = PAD_X + (li * (W - PAD_X * 2)) / (LAYERS.length - 1);
  const top = H / 2 - ((count - 1) * GAP_Y) / 2;
  return Array.from({ length: count }, (_, ni) => ({ x, y: top + ni * GAP_Y }));
});

const edges = [];
for (let li = 0; li < LAYERS.length - 1; li++) {
  nodes[li].forEach((a) => nodes[li + 1].forEach((b) => edges.push({ a, b })));
}

// Smooth-ish paths: each hop stays near the previous node's relative height.
function nextPath(prevStart) {
  let rel = (prevStart + 0.35 + Math.random() * 0.3) % 1;
  return nodes.map((layer) => {
    rel = Math.min(0.999, Math.max(0, rel + (Math.random() - 0.5) * 0.35));
    return layer[Math.floor(rel * layer.length)];
  });
}

export default function DistillationNet({ className = '' }) {
  const reduce = useReducedMotion();
  const [signal, setSignal] = useState(() => ({ id: 0, path: nextPath(0.2), start: 0.2 }));

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setSignal((s) => {
        const start = (s.start + 0.37) % 1;
        return { id: s.id + 1, path: nextPath(start), start };
      });
    }, CYCLE);
    return () => clearInterval(t);
  }, [reduce]);

  const { id, path } = signal;
  const travel = HOP * (path.length - 1);
  const times = path.map((_, i) => i / (path.length - 1));
  const d = path.map((n, i) => `${i ? 'L' : 'M'}${n.x},${n.y}`).join(' ');
  const student = nodes[nodes.length - 1];

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="dn-trail" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="dn-dot">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {edges.map((e, i) => (
          <line key={i} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} stroke="white" strokeOpacity="0.045" />
        ))}

        <AnimatePresence>
          {!reduce && (
            <motion.g key={id} initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
              {/* Trail that draws behind the dot */}
              <motion.path
                d={d}
                fill="none"
                stroke="url(#dn-trail)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: travel, ease: 'linear' }}
              />
              {/* Nodes it passes ease up, then settle */}
              {path.map((n, li) => (
                <motion.circle
                  key={li}
                  cx={n.x}
                  cy={n.y}
                  r="5.5"
                  fill={li === path.length - 1 ? '#34d399' : '#38bdf8'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.55, 0.15] }}
                  transition={{ delay: li * HOP, duration: 1.4, ease: 'easeInOut' }}
                />
              ))}
              {/* The signal */}
              <motion.circle
                r="7"
                fill="url(#dn-dot)"
                initial={{ cx: path[0].x, cy: path[0].y, opacity: 0 }}
                animate={{
                  cx: path.map((n) => n.x),
                  cy: path.map((n) => n.y),
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{ duration: travel, ease: 'linear', times }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {nodes.slice(0, -1).flat().map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="3" fill="#0c0c0f" stroke="white" strokeOpacity="0.22" />
        ))}

        {/* Student layer: the result, gently breathing */}
        {student.map((n, i) => (
          <motion.circle
            key={`s${i}`}
            cx={n.x}
            cy={n.y}
            r="4"
            fill="#0c0c0f"
            stroke="#34d399"
            initial={{ strokeOpacity: 0.5 }}
            animate={reduce ? undefined : { strokeOpacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </svg>

      <div className="mt-3 text-center font-mono text-[11px] leading-relaxed">
        <div className="text-neutral-500">
          teacher 95.1% <span className="text-neutral-600">→</span> <span className="text-emerald-400/90">student 97.9%</span>
        </div>
        <div className="text-neutral-600">distilled + INT8 · 2.9 MB</div>
      </div>
    </div>
  );
}

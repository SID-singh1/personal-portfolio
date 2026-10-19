import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * DistillationNet — a wide "teacher" network narrowing into a small "student".
 * Signals propagate left → right along random paths, lighting nodes as they pass.
 * Nods to the Samsung work: knowledge distillation into a 2.9 MB model.
 */
const LAYERS = [7, 7, 5, 4, 3];
const W = 340;
const H = 250;
const PAD_X = 20;
const PAD_Y = 22;
const STEP = 0.22; // seconds per layer hop

const nodes = LAYERS.map((count, li) => {
  const x = PAD_X + (li * (W - PAD_X * 2)) / (LAYERS.length - 1);
  const gap = (H - PAD_Y * 2) / 7;
  const top = H / 2 - ((count - 1) * gap) / 2;
  return Array.from({ length: count }, (_, ni) => ({ x, y: top + ni * gap }));
});

const edges = [];
for (let li = 0; li < LAYERS.length - 1; li++) {
  nodes[li].forEach((a) => nodes[li + 1].forEach((b) => edges.push({ a, b, li })));
}

const randomPath = () => nodes.map((layer) => layer[Math.floor(Math.random() * layer.length)]);

export default function DistillationNet({ className = '' }) {
  const reduce = useReducedMotion();
  const [pulses, setPulses] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const spawn = () => {
      const id = idRef.current++;
      setPulses((p) => [...p.slice(-5), { id, path: randomPath() }]);
      setTimeout(() => setPulses((p) => p.filter((x) => x.id !== id)), 2600);
    };
    spawn();
    const t = setInterval(spawn, 750);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="dn-edge" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="dn-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static wiring */}
        {edges.map((e, i) => (
          <line key={i} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} stroke="white" strokeOpacity="0.06" strokeWidth="1" />
        ))}

        {/* Signals */}
        <AnimatePresence>
          {pulses.map(({ id, path }) => (
            <g key={id} filter="url(#dn-glow)">
              {path.slice(0, -1).map((a, li) => {
                const b = path[li + 1];
                return (
                  <motion.line
                    key={li}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="url(#dn-edge)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.9, 0.9, 0] }}
                    transition={{ delay: li * STEP, duration: STEP * 3, ease: 'easeOut' }}
                  />
                );
              })}
              {path.map((n, li) => (
                <motion.circle
                  key={`n${li}`}
                  cx={n.x}
                  cy={n.y}
                  r="4"
                  fill={li === path.length - 1 ? '#34d399' : '#38bdf8'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: li * STEP, duration: STEP * 3 }}
                />
              ))}
            </g>
          ))}
        </AnimatePresence>

        {/* Nodes */}
        {nodes.flat().map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="3" fill="#0c0c0f" stroke="white" strokeOpacity="0.25" />
        ))}
      </svg>

      <p className="mt-3 text-center whitespace-nowrap font-mono text-[11px] text-neutral-500">
        teacher 95.1% <span className="text-neutral-600">→ distill + INT8 →</span>{' '}
        <span className="text-emerald-400/90">student 97.9% · 2.9 MB</span>
      </p>
    </div>
  );
}

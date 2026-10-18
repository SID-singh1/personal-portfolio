import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Entrance-only reveal: content fades in once and then stays put.
 * (No exit fade, so skimming / scrolling back never shows half-faded text.)
 */
export function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Comp>
  );
}

/** One header per section: index, title, optional one-line kicker. */
export function SectionHeader({ index, title, kicker, accent = '#22d3ee' }) {
  return (
    <Reveal className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs font-semibold tracking-widest" style={{ color: accent }}>
          {index}
        </span>
        <span className="h-px flex-1 max-w-16" style={{ background: `${accent}66` }} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">{title}</h2>
      {kicker && <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">{kicker}</p>}
    </Reveal>
  );
}

export function Tag({ children }) {
  return (
    <span className="text-xs font-mono text-neutral-300 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
      {children}
    </span>
  );
}

export function Metric({ value, label, note }) {
  return (
    <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02]">
      <div className="text-lg sm:text-xl font-semibold font-mono text-white tracking-tight">{value}</div>
      <div className="text-xs text-neutral-400 mt-0.5">{label}</div>
      {note && <div className="text-[11px] text-neutral-500 mt-0.5">{note}</div>}
    </div>
  );
}

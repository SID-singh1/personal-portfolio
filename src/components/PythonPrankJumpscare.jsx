import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart } from 'lucide-react';

/**
 * PythonPrankJumpscare Component — v2 Rewrite
 *
 * Choreography:
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ PHASE 1: DOT EXPLOSION (0ms – 220ms)                                 │
 * │   Scary snake starts as tiny dot at button origin, zooms to fill      │
 * │   the entire viewport. Aggressive snap easing.                        │
 * │                                                                       │
 * │ PHASE 2: SHIVER HOLD (220ms – 1400ms)                                │
 * │   Scary snake is full-screen. Rapid micro-tremors (±5px X, ±3px Y)   │
 * │   with subtle scale oscillation. Red vignette pulses. User is frozen. │
 * │                                                                       │
 * │ PHASE 3: CUTE SNAP (1400ms – ∞)                                      │
 * │   Hard instant cut — no fade. Cute baby python with cartoon bounce.   │
 * │   Speech bubble fades in. Gentle idle float animation.                │
 * │   Persists INDEFINITELY until user clicks anywhere or presses ESC.    │
 * │                                                                       │
 * │ PHASE 4: CLOSING (user-triggered)                                     │
 * │   Quick fade-out, then onComplete callback.                           │
 * └────────────────────────────────────────────────────────────────────────┘
 */
export default function PythonPrankJumpscare({
  triggerOrigin = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  onComplete,
  scaryImageSrc = '/pictures/python_scary_hd.png',
  cuteImageSrc = '/pictures/python_cute_hd.png',
}) {
  // Phase: 'LUNGE' | 'SHIVER' | 'CUTE' | 'CLOSING'
  const [phase, setPhase] = useState('LUNGE');
  const [shudderOffset, setShudderOffset] = useState({ x: 0, y: 0, scale: 1 });
  const audioCtxRef = useRef(null);
  const shiverIntervalRef = useRef(null);
  const isClosingRef = useRef(false);

  // ─── Synthesized SFX (Web Audio API — zero external dependencies) ───

  const playScareAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      const now = ctx.currentTime;

      // 1. Deep sub-bass chest impact (65Hz → 28Hz sawtooth)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.4);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);

      // 2. High-speed hiss (swept band-pass noise)
      const bufferSize = ctx.sampleRate * 0.4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.frequency.exponentialRampToValueAtTime(500, now + 0.35);
      filter.Q.setValueAtTime(3, now);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.45);
    } catch {
      // Audio policies silently fall back
    }
  }, []);

  const playCuteAudio = useCallback(() => {
    try {
      const ctx =
        audioCtxRef.current ||
        new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;

      // Innocent cartoon "pop!" chime (C5 → G5)
      const chime = ctx.createOscillator();
      const gain = ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(523.25, now);
      chime.frequency.exponentialRampToValueAtTime(783.99, now + 0.14);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      chime.connect(gain);
      gain.connect(ctx.destination);
      chime.start(now);
      chime.stop(now + 0.3);
    } catch {
      // Audio policies silently fall back
    }
  }, []);

  // ─── Main Choreography Sequencer ───

  useEffect(() => {
    // 0ms: Play strike audio immediately
    playScareAudio();

    // 220ms: Lunge complete → start SHIVER phase
    const shiverStartTimer = setTimeout(() => {
      setPhase('SHIVER');

      // Micro-tremor loop: rapid random offsets every 50ms
      shiverIntervalRef.current = setInterval(() => {
        setShudderOffset({
          x: (Math.random() - 0.5) * 10, // ±5px
          y: (Math.random() - 0.5) * 6, // ±3px
          scale: 1 + (Math.random() - 0.5) * 0.06, // 0.97 – 1.03
        });
      }, 50);
    }, 220);

    // 1400ms: Hard cut to cute
    const cuteTimer = setTimeout(() => {
      // Stop shivering
      if (shiverIntervalRef.current) {
        clearInterval(shiverIntervalRef.current);
        shiverIntervalRef.current = null;
      }
      setShudderOffset({ x: 0, y: 0, scale: 1 });
      setPhase('CUTE');
      playCuteAudio();
    }, 1400);

    return () => {
      clearTimeout(shiverStartTimer);
      clearTimeout(cuteTimer);
      if (shiverIntervalRef.current) {
        clearInterval(shiverIntervalRef.current);
      }
    };
  }, [playScareAudio, playCuteAudio]);

  // ─── Dismiss Handlers (only active during CUTE phase) ───

  const handleDismiss = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setPhase('CLOSING');
    setTimeout(() => {
      onComplete?.();
    }, 250);
  }, [onComplete]);

  // ESC key listener
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && phase === 'CUTE') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, handleDismiss]);

  // Click listener — only dismiss when clicking during CUTE phase
  const handleOverlayClick = useCallback(() => {
    if (phase === 'CUTE') {
      handleDismiss();
    }
  }, [phase, handleDismiss]);

  // ─── Layout calculations ───

  const screenCenter = {
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
  };

  return (
    <div
      id="python-prank-overlay"
      onClick={handleOverlayClick}
      onMouseMove={(e) => e.stopPropagation()}
      onPointerMove={(e) => e.stopPropagation()}
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[120] select-none flex items-center justify-center overflow-hidden"
      style={{
        cursor: phase === 'CUTE' ? 'pointer' : 'default',
        // Block everything underneath
        pointerEvents: 'all',
      }}
    >
      {/* Full-screen black backdrop */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'CLOSING' ? 1 : 0.96 }}
        transition={{ duration: phase === 'CLOSING' ? 0.25 : 0.08 }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          PHASE 1 & 2: THE DOT EXPLOSION + SHIVER
          Starts as tiny point at button coords, explodes to fill screen.
          Then shivers in place with micro-tremors.
          ═══════════════════════════════════════════════════════════════ */}
      {(phase === 'LUNGE' || phase === 'SHIVER') && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform:
              phase === 'SHIVER'
                ? `translate3d(${shudderOffset.x}px, ${shudderOffset.y}px, 0) scale(${shudderOffset.scale})`
                : undefined,
          }}
        >
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial={{
              scale: 0.03,
              x: triggerOrigin.x - screenCenter.x,
              y: triggerOrigin.y - screenCenter.y,
              opacity: 0.6,
            }}
            animate={{
              scale: [0.03, 1.15, 1.02],
              x: 0,
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.22,
              ease: [0.16, 1, 0.3, 1], // Explosive snap outward
            }}
          >
            {/* Scary Python Image */}
            <img
              src={scaryImageSrc}
              alt=""
              className="w-full h-full object-contain max-h-screen drop-shadow-[0_0_80px_rgba(255,0,0,0.9)] filter contrast-125 brightness-110"
              draggable={false}
            />
          </motion.div>

          {/* Red vignette overlay — pulsing during shiver */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(180,0,0,0.5) 80%, rgba(100,0,0,0.85) 100%)',
            }}
            initial={{ opacity: 0.7 }}
            animate={{
              opacity:
                phase === 'SHIVER' ? [0.7, 0.3, 0.8, 0.4, 0.7] : 0.7,
            }}
            transition={{
              duration: 0.8,
              repeat: phase === 'SHIVER' ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />

          {/* Red flash on initial impact */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-red-600/30 mix-blend-color-dodge"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Warning text flash */}
          <motion.div
            className="absolute top-8 inset-x-0 flex justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1] }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/80 text-red-400 font-mono text-xs tracking-widest uppercase animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)]">
              ⚠ FATAL RUNTIME EXCEPTION :: UNTAMED PYTHON ⚠
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PHASE 3: CUTE BABY PYTHON — PERSISTS UNTIL DISMISSED
          Hard instant cut, cartoon bounce, idle float, speech bubble.
          Click anywhere or ESC to dismiss.
          ═══════════════════════════════════════════════════════════════ */}
      {phase === 'CUTE' && (
        <motion.div
          className="relative z-10 max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center p-4"
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: [0.85, 1.08, 1.0], opacity: 1 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {/* Comic shockwave ring */}
          <div className="absolute w-72 h-72 rounded-full border-2 border-emerald-400/40 animate-ping pointer-events-none" />

          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.25 }}
            className="mb-4 relative px-5 py-2.5 rounded-2xl bg-neutral-900/95 border border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.35)] text-center flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="font-mono text-sm font-bold text-emerald-300">
              sssup? :3 Did you say something?
            </span>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
            {/* Bubble tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-900/95 border-r border-b border-emerald-500/50 rotate-45" />
          </motion.div>

          {/* Adorable Baby Python with gentle idle float */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.25)] bg-black/60"
          >
            <img
              src={cuteImageSrc}
              alt="Cute Baby Python"
              className="max-h-[60vh] w-auto object-contain rounded-xl"
              draggable={false}
            />
          </motion.div>

          {/* Status + Dismiss Hint */}
          <div className="mt-4 text-center space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DIAGNOSTIC: THREAT PACIFIED // SYSTEM IS SAFE</span>
            </div>
            <p className="text-[11px] font-mono text-slate-500">
              [ Click anywhere or press ESC to continue ]
            </p>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PHASE 4: CLOSING FADE
          ═══════════════════════════════════════════════════════════════ */}
      {phase === 'CLOSING' && (
        <motion.div
          className="absolute inset-0 bg-black z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        />
      )}

      {/* Dismiss X button — only visible during CUTE phase */}
      {phase === 'CUTE' && (
        <motion.button
          onClick={handleDismiss}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/60 hover:bg-neutral-800 border border-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
          title="Dismiss (ESC)"
        >
          <X className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}

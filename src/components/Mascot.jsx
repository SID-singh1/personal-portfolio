import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { avatar, mascotQuestions } from '../data/avatar';
import { person } from '../data/profile';
import { sendTelemetry } from '../utils/telemetry';

/**
 * Mascot: "little me".
 *  idle → peek (head + eyes poke up from the bottom-right, eyes follow the cursor)
 *       → ask (rises diagonally, asks one question) → [feedback] → react (happy / sad face)
 *       → leave (happy: little hop then slides away; sad: sinks slowly the way it came) → done
 *
 * Shows at most once per session, never in the first ~25s, never on touch / small screens.
 * Exit intent (cursor heading for the tab bar) skips the peek and asks straight away.
 */

const SIZE = 150;
const MIN_TIME_MS = 25000;
const EXIT_INTENT_MIN_MS = 8000;
const PEEK_TIMEOUT_MS = 14000;
const PLACEHOLDER_EYES = [
  { x: 39, y: 46 },
  { x: 61, y: 46 },
];

const store = {
  get: (s, k) => {
    try {
      return s.getItem(k);
    } catch {
      return null;
    }
  },
  set: (s, k, v) => {
    try {
      s.setItem(k, v);
    } catch {
      /* storage blocked: mascot just won't remember */
    }
  },
};

function pickQuestion() {
  const ctx = { visitedUltra: store.get(sessionStorage, 'visited_ultra') === '1' };
  const contextual = mascotQuestions.find((q) => q.when && q.when(ctx));
  if (contextual) return contextual;
  const pool = mascotQuestions.filter((q) => !q.when);
  // Rotates across visits; the counter advances only when the mascot is actually shown.
  const n = parseInt(store.get(localStorage, 'mascot_q_index') || '0', 10);
  return pool[n % pool.length];
}

/** Cursor position, rAF-throttled, only while `active`. */
function usePointer(active) {
  const [pos, setPos] = useState(null);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, [active]);
  return pos;
}

/** Pupil offset (in % of face width) for an eye at (ex, ey)% inside `rect`. */
function pupilOffset(rect, eye, pointer) {
  if (!rect || !pointer) return { x: 0, y: 0 };
  const cx = rect.left + (rect.width * eye.x) / 100;
  const cy = rect.top + (rect.height * eye.y) / 100;
  const dx = pointer.x - cx;
  const dy = pointer.y - cy;
  const dist = Math.hypot(dx, dy) || 1;
  const k = (avatar.pupilTravel * Math.min(1, dist / 220)) / dist;
  return { x: dx * k, y: dy * k };
}

/* ── Placeholder face (used until real images are added) ─────────────── */
function PlaceholderFace({ mood, offsets }) {
  const open = mood !== 'happy';
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      <path d="M16 100 Q19 77 50 75 Q81 77 84 100 Z" fill="#0e7490" />
      <path d="M40 76 L50 86 L60 76" fill="none" stroke="#67e8f9" strokeWidth="1.5" />
      <ellipse cx="50" cy="46" rx="27" ry="30" fill="#c99a74" />
      <ellipse cx="23.5" cy="49" rx="3.5" ry="5.5" fill="#b8865f" />
      <ellipse cx="76.5" cy="49" rx="3.5" ry="5.5" fill="#b8865f" />
      <path d="M22 44 Q19 13 50 12 Q81 13 78 44 Q74 27 54 24 Q40 30 30 27 Q24 32 22 44 Z" fill="#1c1714" />

      {/* brows */}
      {mood === 'sad' ? (
        <>
          <path d="M33 35 L44 32" stroke="#1c1714" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M56 32 L67 35" stroke="#1c1714" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M33 35 Q39 31 45 34" fill="none" stroke="#1c1714" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M55 34 Q61 31 67 35" fill="none" stroke="#1c1714" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}

      {/* eyes */}
      {open ? (
        PLACEHOLDER_EYES.map((e, i) => (
          <g key={i}>
            <ellipse cx={e.x} cy={e.y} rx="6.2" ry="6.6" fill="#fff" />
            <circle cx={e.x + offsets[i].x} cy={e.y + offsets[i].y + (mood === 'sad' ? 1.5 : 0)} r="3" fill="#111" />
            <circle cx={e.x + offsets[i].x + 1} cy={e.y + offsets[i].y - 1} r="0.9" fill="#fff" />
          </g>
        ))
      ) : (
        <>
          <path d="M33 47 Q39 40 45 47" fill="none" stroke="#1c1714" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M55 47 Q61 40 67 47" fill="none" stroke="#1c1714" strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cx="32" cy="57" rx="4" ry="2.2" fill="#f87171" opacity="0.35" />
          <ellipse cx="68" cy="57" rx="4" ry="2.2" fill="#f87171" opacity="0.35" />
        </>
      )}

      {/* mouth */}
      {mood === 'happy' && <path d="M39 60 Q50 74 61 60 Z" fill="#3b1d1d" stroke="#3b1d1d" strokeLinejoin="round" />}
      {mood === 'sad' && <path d="M42 67 Q50 60 58 67" fill="none" stroke="#3b1d1d" strokeWidth="2.2" strokeLinecap="round" />}
      {mood === 'neutral' && <path d="M43 63 Q50 67 57 63" fill="none" stroke="#3b1d1d" strokeWidth="2.2" strokeLinecap="round" />}

      {/* tears */}
      {mood === 'sad' &&
        PLACEHOLDER_EYES.map((e, i) => (
          <motion.path
            key={i}
            d={`M${e.x} ${e.y + 7} q-2 4 0 6 q2 -2 0 -6`}
            fill="#60a5fa"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, 10, 14], opacity: [0, 1, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.45, ease: 'easeIn' }}
          />
        ))}
    </svg>
  );
}

/* ── Image face (your PNGs) with code-drawn pupils ───────────────────── */
function ImageFace({ variant, mood, offsets }) {
  const key = variant === 'peek' ? 'peek' : mood;
  const src = avatar.images[key] || avatar.images.neutral;
  const eyes = avatar.eyes[key];
  return (
    <div className="relative w-full">
      <img src={src} alt="" draggable="false" className="block w-full h-auto select-none" />
      {eyes &&
        eyes.map((e, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-neutral-950"
            style={{
              width: `${avatar.pupilSize}%`,
              aspectRatio: '1',
              left: `${e.x + offsets[i].x}%`,
              top: `calc(${e.y}% + ${offsets[i].y}cqw)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
    </div>
  );
}

export default function Mascot({ onActiveChange }) {
  const reduce = useReducedMotion();
  const [state, setState] = useState('idle'); // idle | peek | ask | feedback | react | leave | done
  const [mood, setMood] = useState('neutral');
  const [reply, setReply] = useState('');
  const [feedback, setFeedback] = useState('');
  const [leaveMood, setLeaveMood] = useState('neutral');
  const question = useMemo(pickQuestion, []);
  const faceRef = useRef(null);
  const loadedAt = useRef(Date.now());
  const peekCount = useRef(0);

  const visible = state !== 'idle' && state !== 'done';
  const pointer = usePointer(visible);

  useEffect(() => onActiveChange?.(visible), [visible, onActiveChange]);

  // Testing switch: ?mascot=peek or ?mascot=ask shows it right away, ignoring session/dismiss memory.
  const forced = useMemo(() => new URLSearchParams(window.location.search).get('mascot'), []);

  // Eligibility: desktop pointer, wide screen, not dismissed, not already shown this session.
  const eligible = useMemo(() => {
    if (typeof window === 'undefined') return false;
    if (!window.matchMedia('(pointer: fine) and (min-width: 640px)').matches) return false;
    if (forced) return true;
    if (store.get(localStorage, 'mascot_dismissed') === '1') return false;
    if (store.get(sessionStorage, 'mascot_done') === '1') return false;
    return true;
  }, []);

  const stateRef = useRef(state);
  stateRef.current = state;
  const lastPeekAt = useRef(0);

  const show = useCallback(
    (next, trigger) => {
      const cur = stateRef.current;
      // From idle anything goes; a peek can be upgraded straight to the question.
      if (!(cur === 'idle' || (cur === 'peek' && next === 'ask'))) return;
      sendTelemetry('MASCOT_SHOWN', { trigger, question: question.id });
      if (cur === 'idle' && !question.when) {
        const n = parseInt(store.get(localStorage, 'mascot_q_index') || '0', 10);
        store.set(localStorage, 'mascot_q_index', String(n + 1));
      }
      setState(next);
    },
    [question.id]
  );

  useEffect(() => {
    if (!forced) return;
    const t = setTimeout(() => show(forced === 'ask' ? 'ask' : 'peek', 'forced'), 900);
    return () => clearTimeout(t);
  }, [forced, show]);

  // Trigger 1: engaged reader (25s+ on page and scrolled into the work sections).
  useEffect(() => {
    if (!eligible) return;
    const t = setInterval(() => {
      const exp = document.getElementById('experience');
      const engaged = exp && window.scrollY + window.innerHeight * 0.5 > exp.offsetTop;
      const cooledDown = Date.now() - lastPeekAt.current > 45000;
      if (stateRef.current === 'idle' && Date.now() - loadedAt.current > MIN_TIME_MS && engaged && cooledDown && peekCount.current < 2) {
        peekCount.current += 1;
        lastPeekAt.current = Date.now();
        show('peek', 'engaged');
      }
    }, 1000);
    return () => clearInterval(t);
  }, [eligible, show]);

  // Trigger 2: exit intent.
  useEffect(() => {
    if (!eligible) return;
    const onOut = (e) => {
      if (!e.relatedTarget && e.clientY <= 0 && Date.now() - loadedAt.current > EXIT_INTENT_MIN_MS) {
        show('ask', 'exit-intent');
      }
    };
    document.addEventListener('mouseout', onOut);
    return () => document.removeEventListener('mouseout', onOut);
  }, [eligible, show]);

  // An ignored peek ducks back down; it may peek once more later.
  useEffect(() => {
    if (state !== 'peek') return;
    const t = setTimeout(() => setState('idle'), PEEK_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [state]);

  const finish = useCallback(() => {
    store.set(sessionStorage, 'mascot_done', '1');
    setState('done');
  }, []);

  const leave = useCallback((m) => {
    setLeaveMood(m);
    setState('leave');
  }, []);

  const react = useCallback(
    (m, text) => {
      setMood(m);
      setReply(text);
      setState('react');
      setTimeout(() => leave(m), 2600);
    },
    [leave]
  );

  const answer = (a) => {
    sendTelemetry('MASCOT_ANSWER', { question: question.id, answer: a.label });
    if (a.action === 'copyEmail') navigator.clipboard?.writeText(person.email);
    if (a.action === 'feedback') {
      setMood('sad');
      setReply(a.reply);
      setState('feedback');
      return;
    }
    react(a.mood, a.reply);
  };

  const sendFeedback = () => {
    const text = feedback.trim().slice(0, 300);
    if (text) sendTelemetry('MASCOT_FEEDBACK', { question: question.id, text });
    react('sad', reply);
  };

  const dismiss = (forever) => {
    sendTelemetry('MASCOT_DISMISS', { forever, state });
    if (forever) store.set(localStorage, 'mascot_dismissed', '1');
    setMood('neutral');
    leave('neutral');
  };

  // Pupils
  const rect = faceRef.current?.getBoundingClientRect();
  const eyeSet = avatar.useImages ? avatar.eyes[state === 'peek' ? 'peek' : 'neutral'] || [] : PLACEHOLDER_EYES;
  const offsets = (eyeSet.length ? eyeSet : PLACEHOLDER_EYES).map((e) => pupilOffset(rect, e, pointer));

  // Motion: enters/exits diagonally from the bottom-right corner.
  const OFF = { x: 90, y: SIZE + 60, rotate: 0 };
  const targets = {
    peek: { x: 0, y: avatar.useImages ? 0 : SIZE * 0.55, rotate: -9 },
    ask: { x: 0, y: 0, rotate: 0 },
    feedback: { x: 0, y: 0, rotate: 0 },
    react:
      mood === 'happy' && !reduce
        ? { x: 0, y: [0, -14, 0, -8, 0], rotate: [0, -4, 4, 0, 0] }
        : { x: 0, y: 0, rotate: 0 },
    leave:
      leaveMood === 'happy' && !reduce
        ? { x: [0, 0, OFF.x], y: [0, -22, OFF.y], rotate: 0 }
        : OFF,
  };
  const transitions = {
    peek: { type: 'spring', stiffness: 120, damping: 16 },
    ask: { duration: reduce ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] },
    feedback: { duration: 0.2 },
    react: { duration: 0.9 },
    leave:
      leaveMood === 'happy'
        ? { duration: 1.1, times: [0, 0.3, 1], ease: 'easeInOut' }
        : { duration: reduce ? 0.3 : leaveMood === 'sad' ? 2 : 1, ease: 'easeIn' },
  };

  const bubbleOpen = state === 'ask' || state === 'feedback' || state === 'react';
  const faceMood = state === 'react' || state === 'feedback' ? mood : state === 'leave' ? leaveMood : 'neutral';

  if (!eligible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mascot"
          className="fixed bottom-0 right-6 sm:right-10 z-[55]"
          style={{ width: SIZE }}
          initial={OFF}
          animate={targets[state] || OFF}
          exit={OFF}
          transition={transitions[state]}
          onAnimationComplete={() => state === 'leave' && finish()}
        >
          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            {bubbleOpen && (
              <motion.div
                key={state === 'react' ? 'reply' : state}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.25, delay: state === 'ask' ? 0.6 : 0 }}
                className="absolute bottom-[118px] right-[118px] w-72 rounded-2xl rounded-br-sm border border-white/15 bg-[#121216] p-4 shadow-2xl text-sm text-neutral-100"
              >
                {state === 'ask' && (
                  <>
                    <button
                      onClick={() => dismiss(false)}
                      className="absolute top-2 right-2 p-1 text-neutral-500 hover:text-white cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <p className="pr-5 leading-relaxed">{question.question}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {question.answers.map((a) => (
                        <button
                          key={a.label}
                          onClick={() => answer(a)}
                          className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] hover:border-cyan-400/50 text-[13px] cursor-pointer transition-colors"
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => dismiss(true)}
                      className="mt-3 text-[11px] text-neutral-500 hover:text-neutral-300 underline underline-offset-2 cursor-pointer"
                    >
                      Don't show me again
                    </button>
                  </>
                )}

                {state === 'feedback' && (
                  <>
                    <p className="leading-relaxed">Oof. What's missing? (anonymous, totally fine to be blunt)</p>
                    <textarea
                      autoFocus
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      maxLength={300}
                      rows={3}
                      className="mt-2 w-full resize-none rounded-lg bg-black/40 border border-white/15 p-2 text-[13px] outline-none focus:border-cyan-400/60"
                      placeholder="e.g. needs more backend depth…"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <button onClick={() => react('sad', reply)} className="px-3 py-1.5 text-[13px] text-neutral-400 hover:text-white cursor-pointer">
                        Skip
                      </button>
                      <button
                        onClick={sendFeedback}
                        className="px-3 py-1.5 rounded-lg bg-white text-neutral-950 text-[13px] font-semibold hover:bg-neutral-200 cursor-pointer"
                      >
                        Send
                      </button>
                    </div>
                  </>
                )}

                {state === 'react' && <p className="leading-relaxed">{reply}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          {/* "psst" hint while peeking */}
          <AnimatePresence>
            {state === 'peek' && (
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -left-16 top-[62%] text-xs font-mono text-cyan-300/90 pointer-events-none"
              >
                psst…
              </motion.span>
            )}
          </AnimatePresence>

          {/* The face */}
          <button
            ref={faceRef}
            onClick={() => state === 'peek' && setState('ask')}
            className={`block w-full ${state === 'peek' ? 'cursor-pointer' : 'cursor-default'}`}
            style={{ containerType: 'inline-size' }}
            aria-label={state === 'peek' ? 'Say hi to Siddhant' : 'Siddhant'}
            tabIndex={state === 'peek' ? 0 : -1}
          >
            {avatar.useImages ? (
              <ImageFace variant={state === 'peek' ? 'peek' : 'full'} mood={faceMood} offsets={offsets} />
            ) : (
              <div style={{ width: SIZE, height: SIZE }}>
                <PlaceholderFace mood={faceMood} offsets={offsets} />
              </div>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

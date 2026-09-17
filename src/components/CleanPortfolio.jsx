import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowUpRight, Zap } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   Framer Motion Variants for staggered scroll reveals
   ═══════════════════════════════════════════════════════════════ */
const sectionVariants = {
  hidden: { y: 60, opacity: 0, filter: 'blur(10px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', bounce: 0.2, duration: 0.8 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const staggerChild = {
  hidden: { y: 40, opacity: 0, filter: 'blur(6px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', bounce: 0.15, duration: 0.7 },
  },
};

/* ═══════════════════════════════════════════════════════════════
   ProjectCard — with mouse-tracking glass glare
   ═══════════════════════════════════════════════════════════════ */
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleCardMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePos({ x, y });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={staggerChild}
      onMouseMove={handleCardMouseMove}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="group relative p-6 rounded-xl border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.015] hover:bg-white/[0.025] transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Mouse-tracking glass glare overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
        style={{
          opacity: isCardHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.06) 0%, rgba(0,243,255,0.03) 40%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-2">
          <h4 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
            {project.title}
          </h4>
          <p className="text-sm text-white/35 max-w-md">{project.description}</p>
          <div className="flex items-center space-x-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-white/25 font-mono px-2 py-0.5 rounded bg-white/[0.04]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-white/20 font-mono">{project.year}</span>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Project data
   ═══════════════════════════════════════════════════════════════ */
const projects = [
  {
    title: 'Quantum Compute Kernel',
    description: 'High-throughput parallel matrix engine for low-latency browser workloads',
    tags: ['WebAssembly', 'Rust', 'WebGL'],
    year: '2026',
  },
  {
    title: 'Synapse Circuit Router',
    description: 'Procedural Manhattan & octilinear routing engine for automated schematics',
    tags: ['TypeScript', 'SVG', 'Algorithms'],
    year: '2025',
  },
  {
    title: 'Aura Shader Environment',
    description: 'Photorealistic CRT simulation with scanline distortion and chromatic aberration',
    tags: ['GLSL', 'React', 'PostCSS'],
    year: '2025',
  },
];

const techStack = [
  'React', 'TypeScript', 'Rust', 'WebAssembly', 'Framer Motion',
  'Tailwind CSS', 'Node.js', 'WebGL', 'Vite',
];

/**
 * CleanPortfolio Component
 * Hyper-clean, minimalist dark portfolio with hackathon-tier scroll physics,
 * mouse-tracking glass glare on cards, and an amplified Temptation Trigger widget.
 *
 * @param {Function} onOverclock - Sets isOverclocked(true) in parent App.
 */
export default function CleanPortfolio({ onOverclock }) {
  const [widgetHovered, setWidgetHovered] = useState(false);
  const [glitchTwitch, setGlitchTwitch] = useState(false);
  const [sonarPing, setSonarPing] = useState(0); // incrementing key to retrigger sonar

  // ── Violent Twitch: every 8s, harsh 150ms X-axis snap ──
  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = 7500 + Math.random() * 1000; // ~8s
      return setTimeout(() => {
        if (!widgetHovered) {
          setGlitchTwitch(true);
          setTimeout(() => setGlitchTwitch(false), 150);
        }
        timerRef.current = scheduleGlitch();
      }, delay);
    };

    const timerRef = { current: scheduleGlitch() };
    return () => clearTimeout(timerRef.current);
  }, [widgetHovered]);

  // ── Sonar Pulse: every 4s, expanding ring ──
  useEffect(() => {
    const interval = setInterval(() => {
      setSonarPing((k) => k + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen w-full bg-[#09090b] text-neutral-100 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Faint top gradient wash */}
      <div className="fixed top-0 inset-x-0 h-80 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      {/* Navigation */}
      <nav className="sticky top-0 z-30 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-md bg-white/[0.08] border border-white/[0.08] flex items-center justify-center">
              <span className="text-xs font-bold text-white/70 font-mono">S</span>
            </div>
            <span className="text-sm font-medium text-white/90 tracking-tight">siddhant.dev</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-[13px] text-white/50 font-medium">
            <a href="#work" className="hover:text-white/90 transition-colors duration-200">Work</a>
            <a href="#about" className="hover:text-white/90 transition-colors duration-200">About</a>
            <a href="#contact" className="hover:text-white/90 transition-colors duration-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* ═══════════ MAIN CONTENT WITH SCROLL PHYSICS ═══════════ */}
      <main className="relative max-w-5xl mx-auto px-6 pt-24 pb-32">

        {/* ── Hero Section ── */}
        <motion.section
          className="space-y-8 mb-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Status line */}
          <div className="flex items-center space-x-2 text-[13px] text-white/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
            <span>Available for new projects</span>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white/95 leading-[1.1]">
              Creative Engineer
            </h1>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white/25 leading-[1.1]">
              Systems Architect
            </h2>
          </div>

          {/* Subtitle */}
          <p className="max-w-lg text-base text-white/40 leading-relaxed font-light">
            Building precise digital interfaces, GPU-accelerated graphics pipelines,
            and resilient interactive architectures with obsessive attention to craft.
          </p>

          {/* CTA */}
          <div className="pt-4 flex items-center space-x-4">
            <a
              href="#work"
              className="group inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              <span>View Work</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 text-sm text-white/60 font-medium rounded-lg border border-white/[0.08] hover:border-white/20 hover:text-white/80 transition-all"
            >
              Get in touch
            </a>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.06] mb-20" />

        {/* ── Selected Work Section ── */}
        <motion.section
          id="work"
          className="space-y-12 mb-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest">Selected Work</h3>
            <span className="text-xs text-white/20 font-mono">03 projects</span>
          </div>

          {/* Staggered project cards */}
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </motion.section>

        {/* ── Tech Stack Section ── */}
        <motion.section
          className="mb-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-8">Stack</h3>

          {/* Staggered tech pills */}
          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {techStack.map((tech) => (
              <motion.span
                key={tech}
                variants={staggerChild}
                className="text-[13px] text-white/35 font-mono px-3.5 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:text-white/50 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#09090b]">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-white/20 font-mono">
          <span>© 2026 siddhant</span>
          <span>system status: stable</span>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          THE TEMPTATION TRIGGER — Amplified
          • Sonar Pulse: expanding ring every 4s
          • Violent Twitch: harsh 150ms X-axis snap + red/cyan shadow
          • Hover: glowing expand + "[ OVERCLOCK SYSTEM ]"
          • Click: triggers isOverclocked(true)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-8 right-8 z-50">
        {/* Relative container for sonar pulse ring */}
        <div className="relative flex items-center justify-center">

          {/* Sonar Pulse Ring — expanding border that fades out */}
          <AnimatePresence>
            <motion.div
              key={sonarPing}
              className="absolute inset-0 rounded-full border border-cyan-500/30 pointer-events-none"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            />
          </AnimatePresence>

          <motion.button
            id="overclock-temptation-widget"
            onClick={onOverclock}
            onMouseEnter={() => setWidgetHovered(true)}
            onMouseLeave={() => setWidgetHovered(false)}
            className="relative flex items-center overflow-hidden rounded-full backdrop-blur-md cursor-pointer select-none outline-none focus:outline-none"
            animate={{
              // Violent twitch: harsh X-axis snap
              x: glitchTwitch ? [0, -8, 6, -4, 0] : 0,
              // Harsh red/cyan drop-shadow during twitch
              filter: glitchTwitch
                ? [
                    'drop-shadow(0 0 0px transparent)',
                    'drop-shadow(3px 0 0 rgba(255,0,80,0.9)) drop-shadow(-3px 0 0 rgba(0,243,255,0.9))',
                    'drop-shadow(-2px 0 0 rgba(255,0,80,0.7)) drop-shadow(2px 0 0 rgba(0,243,255,0.7))',
                    'drop-shadow(0 0 0px transparent)',
                  ]
                : 'drop-shadow(0 0 0px transparent)',
            }}
            transition={{
              x: { duration: 0.15, ease: 'linear' },
              filter: { duration: 0.15, ease: 'linear' },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background layer */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: widgetHovered
                  ? 'linear-gradient(135deg, rgba(0,243,255,0.12), rgba(255,183,3,0.08))'
                  : 'rgba(255,255,255,0.04)',
                borderColor: widgetHovered
                  ? 'rgba(0,243,255,0.5)'
                  : 'rgba(255,255,255,0.08)',
                boxShadow: widgetHovered
                  ? '0 0 30px rgba(0,243,255,0.25), 0 0 60px rgba(255,183,3,0.1), inset 0 0 20px rgba(0,243,255,0.1)'
                  : '0 0 0px transparent',
              }}
              style={{ borderWidth: 1, borderStyle: 'solid' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />

            {/* Glitch visual overlay during twitch — harsh red flash */}
            <AnimatePresence>
              {glitchTwitch && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,0,80,0.3), rgba(0,243,255,0.3))',
                    mixBlendMode: 'screen',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </AnimatePresence>

            {/* Content container */}
            <motion.div
              className="relative z-10 flex items-center space-x-2.5 font-mono text-[12px] tracking-wider"
              animate={{
                paddingLeft: widgetHovered ? 20 : 16,
                paddingRight: widgetHovered ? 20 : 16,
                paddingTop: widgetHovered ? 12 : 10,
                paddingBottom: widgetHovered ? 12 : 10,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Icon */}
              <motion.div
                animate={{
                  color: widgetHovered ? '#00f3ff' : 'rgba(255,255,255,0.3)',
                  rotate: widgetHovered ? 180 : 0,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {widgetHovered ? <Zap className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
              </motion.div>

              {/* Text content */}
              <AnimatePresence mode="wait">
                {widgetHovered ? (
                  <motion.span
                    key="overclock"
                    className="text-cyan-300 font-semibold whitespace-nowrap"
                    initial={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                  >
                    [ OVERCLOCK SYSTEM ]
                  </motion.span>
                ) : (
                  <motion.span
                    key="stable"
                    className="text-white/30 whitespace-nowrap flex items-center space-x-1.5"
                    initial={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Blinking terminal cursor */}
                    <motion.span
                      className="text-white/50 font-bold"
                      animate={{ opacity: [1, 1, 0, 0, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'linear', times: [0, 0.49, 0.5, 0.99, 1] }}
                    >
                      &gt; _
                    </motion.span>
                    <span>STATUS: STABLE</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

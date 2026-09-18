import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, Cpu, Activity } from 'lucide-react';
import SignalEmitter from './SignalEmitter';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

/**
 * CleanPortfolio Component
 * Hyper-clean, minimalist Vercel/Linear-inspired dark portfolio.
 * Features:
 * - SignalEmitter: 5 predetermined cycling octilinear PCB circuit pulses from widget to top-left every 10s
 * - Modular Hackathon-grade scroll sections with unique animations and physics
 * - Amplified Temptation Trigger widget with sonar pulse, violent twitch, and overclock hook
 */
export default function CleanPortfolio({ onOverclock }) {
  const [widgetHovered, setWidgetHovered] = useState(false);
  const [glitchTwitch, setGlitchTwitch] = useState(false);
  const [sonarPing, setSonarPing] = useState(0);

  // Violent Twitch: every 8s, harsh 150ms X-axis snap
  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = 7500 + Math.random() * 1000;
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

  // Sonar Pulse: every 4s, expanding ring
  useEffect(() => {
    const interval = setInterval(() => {
      setSonarPing((k) => k + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen w-full bg-[#09090b] text-neutral-100 overflow-y-auto selection:bg-cyan-500/30 selection:text-cyan-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Background Cyber-Grid Layer ── */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Faint Top Ambient Gradient ── */}
      <div className="fixed top-0 inset-x-0 h-96 bg-gradient-to-b from-cyan-500/[0.02] via-transparent to-transparent pointer-events-none" />

      {/* ── Signal Emitter: Cycles 5 predetermined PCB paths every 10s from widget to top-left ── */}
      <SignalEmitter />

      {/* ── Sticky Top Navigation Bar ── */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-md bg-white/[0.08] border border-white/[0.08] flex items-center justify-center">
              <span className="text-xs font-bold text-white/80 font-mono">S</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-white/90 tracking-tight">siddhant.dev</span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-cyan-400/80 px-1.5 py-0.5 rounded bg-cyan-500/[0.08] border border-cyan-500/20">
                v2.6
              </span>
            </div>
          </div>

          {/* Navigation Anchors */}
          <div className="hidden md:flex items-center space-x-7 text-[13px] text-white/50 font-medium">
            <a href="#about" className="hover:text-white/90 transition-colors duration-200">
              About
            </a>
            <a href="#skills" className="hover:text-white/90 transition-colors duration-200">
              Skills
            </a>
            <a href="#projects" className="hover:text-white/90 transition-colors duration-200">
              Projects
            </a>
            <a href="#experience" className="hover:text-white/90 transition-colors duration-200">
              Experience
            </a>
            <a href="#contact" className="hover:text-white/90 transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* ── Main Content Container ── */}
      <main className="relative max-w-5xl mx-auto px-6">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-[#09090b]/90 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 font-mono">
          <div className="flex items-center space-x-2">
            <span>© 2026 SIDDHANT</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>CORE STATUS: STABLE</span>
            </span>
            <span>•</span>
            <span>UPTIME: 99.98%</span>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          THE TEMPTATION TRIGGER (WIDGET) — Fixed Bottom-Right
          • Origin point for the SignalEmitter electrical pulses
          • Sonar Pulse: expanding cyan ring every 4s
          • Violent Twitch: harsh 150ms X-axis snap + red/cyan shadow every 8s
          • Hover: expansion to "[ OVERCLOCK SYSTEM ]"
          • Click: triggers onOverclock()
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative flex items-center justify-center">
          {/* Sonar Pulse Ring */}
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

            {/* Glitch visual overlay during twitch */}
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

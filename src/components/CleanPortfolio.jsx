import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, Download, Menu, X } from 'lucide-react';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';
import CustomCursor from './CustomCursor';
import { person, resumes } from '../data/profile';
import { sendTelemetry } from '../utils/telemetry';

const NAV = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/**
 * CleanPortfolio — the recruiter-first view.
 * Built for a 10–15 second skim: who, what, proof, resume, contact — all above the fold.
 * The Overclock widget (bottom-right) is the door to the Ultra experience.
 */
export default function CleanPortfolio({ onOverclock }) {
  const [widgetHovered, setWidgetHovered] = useState(false);
  const [glitchTwitch, setGlitchTwitch] = useState(false);
  const [sonarPing, setSonarPing] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Occasional twitch on the overclock widget (an invitation, not a distraction)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t;
    const schedule = () => {
      t = setTimeout(() => {
        if (!widgetHovered) {
          setGlitchTwitch(true);
          setTimeout(() => setGlitchTwitch(false), 150);
        }
        schedule();
      }, 7500 + Math.random() * 1000);
    };
    schedule();
    return () => clearTimeout(t);
  }, [widgetHovered]);

  useEffect(() => {
    const interval = setInterval(() => setSonarPing((k) => k + 1), 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 200;
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && el.offsetTop <= pos) {
          setActiveSection(NAV[i].id);
          return;
        }
      }
      setActiveSection('hero');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="relative min-h-screen w-full bg-[#09090b] text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <CustomCursor />

      {/* Subtle dot grid + top wash */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="fixed top-0 inset-x-0 h-96 bg-gradient-to-b from-cyan-500/[0.05] to-transparent pointer-events-none" />

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 cursor-pointer">
            <span className="w-7 h-7 rounded-md bg-white/[0.08] border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-white">
              S
            </span>
            <span className="text-sm font-medium text-white">{person.name}</span>
          </button>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative py-1 cursor-pointer transition-colors ${
                  activeSection === item.id ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span layoutId="navIndicator" className="absolute -bottom-0.5 left-0 right-0 h-px bg-cyan-400" />
                )}
              </button>
            ))}
            <a
              href={resumes[0].href}
              target="_blank"
              rel="noopener"
              onClick={() => sendTelemetry('RESUME_OPEN', { resume: resumes[0].id, from: 'nav' })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-neutral-950 font-semibold hover:bg-neutral-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Resume
            </a>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-neutral-300 cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden border-t border-white/[0.06] bg-[#09090b]"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="px-4 py-3 flex flex-col">
                {NAV.map((item) => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className="py-2.5 text-left text-neutral-200 cursor-pointer">
                    {item.label}
                  </button>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {resumes.map((r) => (
                    <a
                      key={r.id}
                      href={r.href}
                      target="_blank"
                      rel="noopener"
                      onClick={() => sendTelemetry('RESUME_OPEN', { resume: r.id, from: 'mobile-nav' })}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-md bg-white/[0.06] border border-white/10 text-sm text-white"
                    >
                      <Download className="w-3.5 h-3.5" /> {r.label.replace('Resume · ', '')}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <HeroSection />
        <div className="space-y-24 sm:space-y-28 pb-28">
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection />
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-mono">
          <span>© 2026 {person.name} · Bengaluru</span>
          <span>Built with React + Framer Motion · press the button in the corner if you're curious</span>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          THE TEMPTATION TRIGGER (WIDGET) — Fixed Bottom-Right
          • Ambient Corner Halo: breathing cyan aura behind button
          • Sonar Pulse: expanding cyan ring every 4s
          • Violent Twitch: harsh 150ms X-axis snap + red/cyan shadow every 8s
          • Hover: expansion to "[ OVERCLOCK SYSTEM ]"
          • Click: triggers onOverclock()
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden sm:block fixed bottom-8 right-8 z-50">
        <div className="relative flex items-center justify-center">
          {/* Ambient Corner Halo — subtle breathing radial aura */}
          <motion.div
            className="absolute -inset-6 rounded-full pointer-events-none"
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.12, 0.3, 0.12],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(circle, rgba(0, 243, 255, 0.25) 0%, transparent 70%)',
            }}
          />

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

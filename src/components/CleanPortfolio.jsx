import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap } from 'lucide-react';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import AchievementsSection from './sections/AchievementsSection';
import ContactSection from './sections/ContactSection';
import CustomCursor from './CustomCursor';

/**
 * CleanPortfolio Component
 * Hyper-clean, minimalist Vercel/Linear-inspired dark portfolio.
 * Features:
 * - Serene, distraction-free reading canvas (pure focus for recruiters)
 * - Scroll-linked entrance & exit fade physics (Apple-grade fluid dissolves)
 * - Subliminal circadian atmospheric ambient gradient wash & live system clock
 * - Micro-die architectural silicon watermark [ S · I · D ] at 2.8% opacity
 * - Amplified Temptation Trigger widget with corner breathing halo, sonar pulse, and violent twitch
 */
export default function CleanPortfolio({ onOverclock }) {
  const [widgetHovered, setWidgetHovered] = useState(false);
  const [glitchTwitch, setGlitchTwitch] = useState(false);
  const [sonarPing, setSonarPing] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [circadianCycle, setCircadianCycle] = useState({
    label: 'AVAILABLE FOR WORK',
    gradient: 'from-cyan-500/[0.03]',
  });

  // Live Local Time & Circadian Atmospheric Shift
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const simHourParam = urlParams?.get('simHour');
      const isSim = simHourParam !== null && simHourParam !== undefined && simHourParam !== '';
      const hours = isSim ? parseInt(simHourParam, 10) : now.getHours();

      const timeStr = isSim
        ? `${String(hours).padStart(2, '0')}:30:00`
        : now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });
      setCurrentTime(timeStr);

      // Circadian ambient wash based on user's hour (3% subtle wash, base dark canvas remains solid)
      if (hours >= 22 || hours < 5) {
        setCircadianCycle({
          label: 'NIGHTLY COMPILE // LOW-LATENCY',
          gradient: 'from-indigo-500/[0.035] via-purple-500/[0.01]',
        });
      } else if (hours >= 5 && hours < 12) {
        setCircadianCycle({
          label: 'DAWN CYCLES // SYSTEMS WARM',
          gradient: 'from-cyan-500/[0.035] via-sky-500/[0.01]',
        });
      } else if (hours >= 12 && hours < 18) {
        setCircadianCycle({
          label: 'PEAK LOAD // CONCURRENT WORKLOADS',
          gradient: 'from-white/[0.025] via-transparent',
        });
      } else {
        setCircadianCycle({
          label: 'DUSK RECURSION // ASYNC FLUSH',
          gradient: 'from-amber-500/[0.03] via-orange-500/[0.01]',
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  // In-Page Active Section Scroll Spy
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = ['about', 'skills', 'experience', 'projects', 'education', 'honors', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="relative min-h-screen w-full bg-[#09090b] text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Precision Cyber Reticle Custom Cursor ── */}
      <CustomCursor />
      {/* ── Background Cyber-Grid Layer ── */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Subliminal Circadian Top Ambient Gradient Wash ── */}
      <div
        className={`fixed top-0 inset-x-0 h-96 bg-gradient-to-b ${circadianCycle.gradient} to-transparent pointer-events-none transition-colors duration-1000`}
      />

      {/* ── Micro-Die Architectural Silicon Watermark [ S · I · D ] ── */}
      <div className="fixed top-24 right-8 md:right-28 pointer-events-none select-none z-0 opacity-[0.028] font-mono text-right">
        <div className="text-7xl md:text-9xl font-black tracking-widest leading-none text-white">
          SID
        </div>
        <div className="text-[11px] tracking-[0.35em] text-white pt-1">
          SILICON DIE // REV-04 // 64-BIT
        </div>
      </div>

      {/* ── Sticky Top Navigation Bar ── */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Version */}
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

          {/* Center: Live Clock & Circadian Status */}
          <div className="hidden lg:flex items-center space-x-2 text-[11px] font-mono text-white/40 px-3 py-1 rounded-full border border-white/[0.05] bg-white/[0.015]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-white/85 font-medium">{currentTime || '00:00:00'}</span>
            <span className="text-white/15">•</span>
            <span className="text-white/50">{circadianCycle.label}</span>
          </div>

          {/* Navigation Anchors with Smooth Scroll & Active Indicator */}
          <div className="hidden md:flex items-center space-x-5 text-[13px] font-medium">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'education', label: 'Education' },
              { id: 'honors', label: 'Honors & Certs' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors duration-200 cursor-pointer relative py-1 ${
                  activeSection === item.id
                    ? 'text-cyan-300 font-semibold'
                    : 'text-white/50 hover:text-white/90'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cyan-400 shadow-[0_0_8px_rgba(0,243,255,0.8)] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Main Content Container with Scroll Exit Physics ── */}
      <main className="relative max-w-5xl mx-auto px-6">
        <HeroSection />

        <div className="mb-36">
          <AboutSection />
        </div>

        <div className="mb-36">
          <SkillsSection />
        </div>

        <div className="mb-36">
          <ExperienceSection />
        </div>

        <div className="mb-36">
          <ProjectsSection />
        </div>

        <div className="mb-36">
          <EducationSection />
        </div>

        <div className="mb-36">
          <AchievementsSection />
        </div>

        <div className="mb-24">
          <ContactSection />
        </div>
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
          • Ambient Corner Halo: breathing cyan aura behind button
          • Sonar Pulse: expanding cyan ring every 4s
          • Violent Twitch: harsh 150ms X-axis snap + red/cyan shadow every 8s
          • Hover: expansion to "[ OVERCLOCK SYSTEM ]"
          • Click: triggers onOverclock()
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-8 right-8 z-50">
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

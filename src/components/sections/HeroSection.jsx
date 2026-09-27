import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Cpu,
  Activity,
  Download,
  ChevronDown,
  MapPin,
  Trophy,
  GraduationCap,
  Github,
  Linkedin,
  Code2,
  Mail,
  Phone,
  Check,
} from 'lucide-react';

const heroVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const heroRef = useRef(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Scroll exit decay: smoothly dissolves as user scrolls down past the hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [1, 0.9, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.9], [0, -45]);
  const heroScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.97]);

  const copyEmail = () => {
    navigator.clipboard.writeText('siddhant3103@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('+91-8747893867');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const smoothScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="hero"
      ref={heroRef}
      style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      className="relative min-h-[85vh] flex flex-col justify-center space-y-8 pt-8 pb-20 will-change-transform"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Telemetry status indicator (Clean, single high-signal pill) */}
      <motion.div variants={itemVariants} className="flex items-center">
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] text-[12px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>SYS_READY // OPEN TO SELECT ROLES</span>
        </div>
      </motion.div>

      {/* Main hero typography */}
      <div className="space-y-3">
        <motion.div variants={itemVariants} className="text-sm font-mono text-cyan-400/90 tracking-widest uppercase">
          [ SOFTWARE ENGINEER // SYSTEM ARCHITECT ]
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white/95 leading-[1.05]"
        >
          Siddhant Singh
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white/70 via-white/40 to-white/20 bg-clip-text text-transparent leading-[1.1]"
        >
          AI Systems & Backend Infrastructure
        </motion.h2>
      </div>

      {/* Subtitle / Philosophy */}
      <motion.p
        variants={itemVariants}
        className="max-w-2xl text-base sm:text-lg text-white/50 leading-relaxed font-light"
      >
        Engineering high-throughput distributed backends, agentic LLM workflows, and low-latency model optimizations.
        Bridging the gap between frontier AI inference (<span className="text-white/80 font-mono text-sm">Quantization, GGUF, llama.cpp</span>)
        and rock-solid backend infrastructure (<span className="text-white/80 font-mono text-sm">FastAPI, Redis, Qdrant, Distributed Systems</span>).
      </motion.p>

      {/* Quick Actions: High-Conversion Smooth Scrolling CTAs */}
      <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-3.5">
        <button
          onClick={() => smoothScrollTo('projects')}
          className="group relative inline-flex items-center space-x-2.5 px-6 py-3 bg-white text-neutral-950 text-sm font-semibold rounded-lg hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.12)] cursor-pointer"
        >
          <span>Explore Works & Systems</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <button
          onClick={() => smoothScrollTo('contact')}
          className="inline-flex items-center space-x-2 px-5 py-3 text-sm text-white/80 font-medium rounded-lg border border-white/[0.12] hover:border-cyan-400/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-200 cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Contact & Direct Channel</span>
        </button>
      </motion.div>

      {/* Social and Quick Copy Telemetry Bar */}
      <motion.div
        variants={itemVariants}
        className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-white/45"
      >
        <a
          href="https://github.com/SID-singh1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GITHUB</span>
          <ArrowUpRight className="w-3 h-3 text-white/20" />
        </a>

        <a
          href="https://www.linkedin.com/in/siddhant-singh-3283ab268/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
        >
          <Linkedin className="w-3.5 h-3.5" />
          <span>LINKEDIN</span>
          <ArrowUpRight className="w-3 h-3 text-white/20" />
        </a>

        <a
          href="https://leetcode.com/u/_SID_SINGH"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.03] text-amber-300/80 hover:text-amber-200 hover:border-amber-400/40 transition-all"
        >
          <Code2 className="w-3.5 h-3.5 text-amber-400" />
          <span>LEETCODE (KNIGHT · 1837)</span>
          <ArrowUpRight className="w-3 h-3 text-amber-400/30" />
        </a>

        <button
          onClick={copyEmail}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:text-white transition-all cursor-pointer"
          title="Copy email to clipboard"
        >
          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
          <span className={copiedEmail ? 'text-emerald-400' : ''}>
            {copiedEmail ? 'EMAIL COPIED' : 'siddhant3103@gmail.com'}
          </span>
        </button>

        <button
          onClick={copyPhone}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:text-white transition-all cursor-pointer"
          title="Copy phone to clipboard"
        >
          {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Phone className="w-3.5 h-3.5" />}
          <span className={copiedPhone ? 'text-emerald-400' : ''}>
            {copiedPhone ? 'PHONE COPIED' : '+91-8747893867'}
          </span>
        </button>
      </motion.div>

      {/* Scroll indicator prompt */}
      <motion.div
        variants={itemVariants}
        className="pt-8 flex items-center space-x-2 text-[12px] text-white/25 font-mono"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-cyan-400/60" />
        </motion.div>
        <span>SCROLL OR USE ANCHORS TO EXPLORE</span>
      </motion.div>
    </motion.section>
  );
}

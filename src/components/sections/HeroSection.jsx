import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Activity, Download, ChevronDown } from 'lucide-react';

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
  return (
    <motion.section
      className="relative min-h-[85vh] flex flex-col justify-center space-y-8 pt-8 pb-20"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Telemetry pill & status indicator */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] text-[12px] text-emerald-400/90 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>SYS_READY // OPEN TO OPPORTUNITIES</span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-[12px] text-white/40 font-mono">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span>LATENCY: 12ms</span>
        </div>

        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-[12px] text-white/40 font-mono">
          <Cpu className="w-3 h-3 text-amber-400" />
          <span>ARCH: WASM / SIMD / GPU</span>
        </div>
      </motion.div>

      {/* Main hero typography */}
      <div className="space-y-4">
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white/95 leading-[1.05]"
        >
          Creative Engineer
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-white/30 via-white/20 to-white/5 bg-clip-text text-transparent leading-[1.05]"
        >
          Systems Architect
        </motion.h2>
      </div>

      {/* Subtitle / Philosophy */}
      <motion.p
        variants={itemVariants}
        className="max-w-xl text-base sm:text-lg text-white/45 leading-relaxed font-light"
      >
        Bridging the boundary between deterministic low-level compute engines and
        visceral, high-fidelity digital interfaces. Specializing in WebAssembly, GPU compute,
        and bespoke interactive systems.
      </motion.p>

      {/* Quick Actions / CTA Buttons */}
      <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="group relative inline-flex items-center space-x-2.5 px-6 py-3 bg-white text-neutral-950 text-sm font-semibold rounded-lg hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
        >
          <span>Explore Works</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <a
          href="#experience"
          className="inline-flex items-center space-x-2 px-5 py-3 text-sm text-white/70 font-medium rounded-lg border border-white/[0.08] hover:border-white/25 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200"
        >
          <span>Timeline & Milestones</span>
        </a>

        <a
          href="#contact"
          className="inline-flex items-center space-x-2 px-5 py-3 text-sm text-white/50 hover:text-white/80 font-mono transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>spec_cv.pdf</span>
        </a>
      </motion.div>

      {/* Scroll indicator prompt */}
      <motion.div
        variants={itemVariants}
        className="pt-12 flex items-center space-x-2 text-[12px] text-white/20 font-mono"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-cyan-400/60" />
        </motion.div>
        <span>SCROLL TO INITIALIZE TELEMETRY</span>
      </motion.div>
    </motion.section>
  );
}

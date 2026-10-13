import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  ArrowLeft,
  Terminal,
  ShieldCheck,
  Cpu,
  Sparkles,
  Server,
  Trophy,
  Heart,
} from 'lucide-react';
import PythonPrankJumpscare from './PythonPrankJumpscare';
import { sendTelemetry } from '../utils/telemetry';

/**
 * PortfolioContent Component
 * The revealed main portfolio placeholder in State 5 (Ultra Mode).
 * Features:
 * - Sleek cyberpunk engineering landing page
 * - Dedicated "TECHNICAL RUNTIMES & CAPABILITIES" matrix
 * - Interactive Python skill card with one-time jumpscare easter egg prank
 * - Preloaded 4K HD images for zero-latency execution
 */
export default function PortfolioContent({ onReset, onReplaySequence }) {
  // ─── Prank State Management ───
  // Use a REF for the triggered guard — refs update synchronously,
  // preventing the race condition where rapid mouse re-entry during
  // the overlay mount could re-trigger before setState flushes.
  const [isPrankActive, setIsPrankActive] = useState(false);
  const [prankOrigin, setPrankOrigin] = useState({ x: 500, y: 400 });
  const prankTriggeredRef = useRef(
    typeof window !== 'undefined' && sessionStorage.getItem('python_prank_triggered') === 'true'
  );
  const [hasTriggeredPrank, setHasTriggeredPrank] = useState(prankTriggeredRef.current);

  // Preload HD images immediately on mount so jumpscare has zero latency
  useEffect(() => {
    const pScary = new Image();
    pScary.src = '/pictures/python_scary_hd.png';
    const pCute = new Image();
    pCute.src = '/pictures/python_cute_hd.png';
  }, []);

  // Primary Hover Trigger — one-time only per session, ref-guarded
  const handlePythonHover = useCallback((e) => {
    // Synchronous check — prevents double fire even if React batches state
    if (prankTriggeredRef.current) return;
    prankTriggeredRef.current = true; // Lock IMMEDIATELY

    const rect = e.currentTarget.getBoundingClientRect();
    setPrankOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setIsPrankActive(true);
    setHasTriggeredPrank(true);
    try {
      sessionStorage.setItem('python_prank_triggered', 'true');
    } catch {}
    sendTelemetry('PYTHON_PRANK_TRIGGERED', { trigger: 'hover_initial' });
  }, []);

  const projects = [
    {
      title: 'QUANTUM COMPUTE KERNEL',
      desc: 'High-throughput parallel matrix compute engine built for low-latency browser workloads.',
      tags: ['WebAssembly', 'Rust', 'WebGL', 'Framer Motion'],
      metric: '0.4ms latency',
      badge: 'PRODUCTION',
      color: 'border-cyan-500/40 text-cyan-400',
    },
    {
      title: 'SYNAPSE CIRCUIT ROUTER',
      desc: 'Procedural Manhattan & octilinear routing engine for automated schematic generation.',
      tags: ['TypeScript', 'SVG', 'Geometric Algorithms'],
      metric: '100% 45°/90°',
      badge: 'CORE ENGINE',
      color: 'border-emerald-500/40 text-emerald-400',
    },
    {
      title: 'AURA SHADER ENVIRONMENT',
      desc: 'Photorealistic CRT simulation, scanline distortion, and chromatic aberration pipeline.',
      tags: ['GLSL', 'PostCSS', 'Tailwind', 'React'],
      metric: '120 FPS',
      badge: 'STABLE',
      color: 'border-purple-500/40 text-purple-400',
    },
  ];

  return (
    <motion.div
      id="portfolio-main-content"
      className="fixed inset-0 h-full w-full bg-[#040711] text-slate-100 selection:bg-cyan-500 selection:text-black z-10 overflow-y-auto overflow-x-hidden select-text pointer-events-auto"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 pcb-grid-bg opacity-40 pointer-events-none fixed" />

      {/* Ambient Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none fixed" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none fixed" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/60 border-b border-cyan-900/40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyan-400/80 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,243,255,0.5)]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold tracking-wider text-cyan-200">
              SYS::SIDDHANT
            </div>
            <div className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CIRCUITS ONLINE // ULTRA MODE</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">

          {/* Re-run sequence button */}
          <button
            onClick={onReplaySequence || onReset}
            className="group flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 font-mono text-xs text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
            title="Replay sequence from State 1"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="tracking-wider uppercase text-[11px] hidden sm:inline-block">REPLAY</span>
          </button>

          {/* Return to Normal Portfolio Button */}
          <button
            id="return-to-normal-button"
            onClick={onReset}
            className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/60 hover:border-cyan-400 font-mono text-xs text-cyan-300 hover:text-white transition-all duration-200 shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] active:scale-95 cursor-pointer"
            title="Return to Clean Portfolio"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span className="tracking-wider uppercase font-semibold text-[11px]">RETURN TO NORMAL</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative max-w-6xl mx-auto px-6 pt-12 pb-24">
        
        {/* Terminal Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 mb-8 backdrop-blur-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>ALL 12 PCB ELECTRIC TRACES TERMINATED AT BOUNDARY</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-semibold">CRT GLITCH COMPLETE</span>
        </div>

        {/* Hero Header */}
        <section className="space-y-6 mb-16">
          <div className="space-y-2">
            <h2 className="text-xs md:text-sm font-mono tracking-widest text-cyan-400 uppercase">
              CREATIVE ENGINEER // SYSTEMS ARCHITECT
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-tight">
              ENGINEERING DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 drop-shadow-[0_0_25px_rgba(0,243,255,0.4)]">
                CIRCUITS & INTERFACES
              </span>
            </h1>
          </div>

          <p className="max-w-2xl text-slate-300 text-base md:text-lg font-light leading-relaxed">
            Crafting tactile web experiences, GPU-accelerated graphics pipelines, and resilient interactive architectures. 
            The system ignition is complete and all nodes are operating with zero packet loss.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onReset}
              className="px-6 py-3 bg-cyan-400 text-black font-mono font-bold text-sm rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.6)] hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.9)] transition-all cursor-pointer flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4 text-black" />
              <span>RETURN TO NORMAL PORTFOLIO</span>
            </button>
            <button
              onClick={onReplaySequence || onReset}
              className="px-6 py-3 bg-neutral-900 border border-neutral-700 hover:border-cyan-400 text-slate-200 font-mono text-sm rounded-lg transition-all flex items-center space-x-2 cursor-pointer hover:bg-neutral-800"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span>TEST SEQUENCE AGAIN</span>
            </button>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TECHNICAL CAPABILITIES & ACTIVE RUNTIMES (ULTRA VERSION)
            Features the flagship interactive Python Runtime node with the
            one-time jumpscare easter egg prank!
            ═══════════════════════════════════════════════════════════════════ */}
        <section id="ultra-capabilities" className="mb-16 space-y-6">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_rgba(0,243,255,0.2)]">
                CORE CAPABILITIES
              </span>
              <h2 className="text-base sm:text-lg font-mono text-white/90 uppercase tracking-wider">
                ACTIVE SYSTEM RUNTIMES
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400/70 hidden sm:inline-block">
              [ REAL-TIME KERNEL INSPECTION ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: PYTHON 3.12 FLAGSHIP (The Interactive Prank Box) */}
            <div className="group relative p-6 bg-[#080d1e]/80 border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl transition-all shadow-[0_0_25px_rgba(0,243,255,0.06)] flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                        Python 3.12 Core Engine
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">
                        Primary Computational & AI Runtime
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-400/40 text-amber-300 bg-amber-950/40 uppercase">
                    PRIMARY STACK
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  High-performance asynchronous architectures, metaprogramming, PyTorch model pipelines, and autonomous agent loops.
                </p>

                {/* Sub-features pills */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {['AsyncIO', 'PyTorch', 'FastAPI', 'LangGraph', 'Scientific Stack'].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── THE INTERACTIVE PYTHON BOX / ICON ── */}
              <div>
                {!hasTriggeredPrank ? (
                  <div
                    id="python-runtime-interactive-box"
                    onMouseEnter={handlePythonHover}
                    className="relative overflow-hidden flex items-center justify-between p-3.5 rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-amber-900/15 to-neutral-950/80 hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-50" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold text-amber-300 flex items-center space-x-2">
                          <span className="text-sm">🐍</span>
                          <span>PYTHON RUNTIME v3.12</span>
                        </div>
                        <div className="text-[10px] font-mono text-amber-200/50 mt-0.5">
                          Process active · PID 3847 · 0 faults
                        </div>
                      </div>
                    </div>

                    <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>RUNNING</span>
                    </span>
                  </div>
                ) : (
                  /* Pacified State after prank completed — clean, no re-trigger buttons */
                  <div
                    id="python-runtime-interactive-box-pacified"
                    className="relative overflow-hidden flex items-center justify-between p-3.5 rounded-lg border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 to-neutral-950/80 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">🐍</span>
                      <div>
                        <div className="font-mono text-xs font-bold text-emerald-300 flex items-center space-x-1.5">
                          <span>PYTHON RUNTIME :: PACIFIED</span>
                          <Heart className="w-3 h-3 text-pink-400 fill-pink-400 animate-pulse" />
                        </div>
                        <div className="text-[10px] font-mono text-emerald-400/60 mt-0.5">
                          Innocent baby snake is resting peacefully :3
                        </div>
                      </div>
                    </div>

                    <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-300/70 text-[10px] font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>TAMED</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: GENERATIVE AI & AGENTIC SYSTEMS */}
            <div className="group relative p-6 bg-[#080d1e]/80 border border-cyan-500/20 hover:border-cyan-400/50 rounded-xl transition-all shadow-[0_0_25px_rgba(0,243,255,0.04)] flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(0,243,255,0.25)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                        Generative AI & Agentic Systems
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">
                        Autonomous Multi-Actor Loops & Vector RAG
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-400/40 text-cyan-300 bg-cyan-950/40 uppercase">
                    PRODUCTION
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  Autonomous cyclic state machines with LangGraph, hybrid dense/sparse vector retrieval, prompt alignment via DSPy, and quantization runtimes (GGUF/llama.cpp).
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {['LangGraph', 'Qdrant RAG', 'Claude / Gemini', 'Quantization (INT4)', 'DSPy'].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950/70 border border-cyan-900/40 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                <span className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>AGENT PIPELINES: OPTIMIZED</span>
                </span>
                <span className="text-slate-400">&lt; 0.8s TTFT</span>
              </div>
            </div>

            {/* Card 3: DISTRIBUTED BACKEND & VECTOR DATASTORES */}
            <div className="group relative p-6 bg-[#080d1e]/80 border border-emerald-500/20 hover:border-emerald-400/50 rounded-xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.04)] flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                        Distributed Backend & Vector Search
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">
                        High-Concurrency APIs & Real-time Datastores
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-400/40 text-emerald-300 bg-emerald-950/40 uppercase">
                    HIGH LOAD
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  Schema-enforced microservices with FastAPI, Redis caching & pub/sub, Qdrant vector indexing, and connection-pooled SQLAlchemy architectures.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {['FastAPI', 'Redis Pub/Sub', 'Qdrant Vector DB', 'Docker', 'REST / Sockets'].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950/70 border border-emerald-900/40 flex items-center justify-between text-[11px] font-mono text-emerald-300">
                <span className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>VECTOR LATENCY</span>
                </span>
                <span className="text-slate-400">P99 &lt; 4.2ms</span>
              </div>
            </div>

            {/* Card 4: CORE CS & ALGORITHMIC PROBLEM SOLVING */}
            <div className="group relative p-6 bg-[#080d1e]/80 border border-amber-500/20 hover:border-amber-400/50 rounded-xl transition-all shadow-[0_0_25px_rgba(245,158,11,0.04)] flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                        Core CS & Algorithms
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">
                        LeetCode Knight (Rating 1837 · Top 6%)
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-400/40 text-amber-300 bg-amber-950/40 uppercase">
                    680+ SOLVED
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  Rigorous algorithmic discipline in C++ and Python: memory allocation, cache locality, graph algorithms, dynamic programming, and lock-free concurrency.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {['C++ & Java', 'Data Structures', 'Lock-Free Queues', 'OS Kernels', 'System Design'].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950/70 border border-amber-900/40 flex items-center justify-between text-[11px] font-mono text-amber-300">
                <span className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>GLOBAL STANDING</span>
                </span>
                <span className="text-slate-400">TOP 6% WORLDWIDE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Matrix */}
        <section className="mb-16">
          <div className="border border-cyan-900/40 rounded-lg p-6 bg-black/40 backdrop-blur-md">
            <div className="text-xs font-mono text-slate-400 mb-4 tracking-wider uppercase flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>INITIALIZED HARDWARE & SOFTWARE STACK</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: 'React 18+', role: 'UI Engine' },
                { name: 'Framer Motion', role: 'Dynamic Kinetics' },
                { name: 'Tailwind CSS', role: 'Design Tokens' },
                { name: 'Strict PCB SVG', role: 'Octilinear Math' },
                { name: 'Vite 6', role: 'HMR Bundler' },
                { name: 'Web Pointer API', role: 'Reticle Tracking' },
              ].map((tech) => (
                <div key={tech.name} className="p-3 bg-neutral-950/80 border border-neutral-800 rounded">
                  <div className="font-mono text-sm font-semibold text-cyan-300">{tech.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{tech.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Grid */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h2 className="text-xl font-display font-bold text-white tracking-wide">
              FEATURED ARTIFACTS
            </h2>
            <span className="text-xs font-mono text-cyan-400">STATUS: 03 DEPLOYED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.title}
                className="group relative p-6 bg-neutral-950/70 border border-neutral-800 hover:border-cyan-500/60 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,243,255,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${proj.color}`}>
                      {proj.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{proj.metric}</span>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {proj.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/80">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-neutral-900 text-slate-300 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-black/80 px-6 py-6 text-center text-xs font-mono text-slate-500">
        SYSTEM KERNEL V4.2 // ALL CIRCUITS FUNCTIONAL // PRODUCED WITH ANTIGRAVITY ENGINE
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          PYTHON JUMPSCARE PRANK MODAL
          ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isPrankActive && (
          <PythonPrankJumpscare
            triggerOrigin={prankOrigin}
            onComplete={() => setIsPrankActive(false)}
            scaryImageSrc="/pictures/python_scary_hd.png"
            cuteImageSrc="/pictures/python_cute_hd.png"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowLeft, Terminal, ShieldCheck, Cpu, Code2, Globe, Sparkles, ExternalLink, Github } from 'lucide-react';

/**
 * PortfolioContent Component
 * The revealed main portfolio placeholder in State 5.
 * Features a sleek cyberpunk engineering landing page with dedicated
 * Return to Normal and Re-initialize controls.
 */
export default function PortfolioContent({ onReset, onReplaySequence }) {
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
      className="relative min-h-screen w-full bg-[#040711] text-slate-100 selection:bg-cyan-500 selection:text-black z-10 overflow-y-auto"
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
              <span>CIRCUITS ONLINE</span>
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
    </motion.div>
  );
}

import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Cpu, Zap, Activity } from 'lucide-react';
import ScrollCard from '../ScrollCard';
import SectionBorderElectron from '../SectionBorderElectron';

const projects = [
  {
    id: 'quantum-kernel',
    title: 'Quantum Compute Kernel',
    subtitle: 'Parallel matrix engine & SIMD WebAssembly pipeline',
    description:
      'High-throughput mathematical compute engine designed for in-browser scientific modeling. Achieves near-native execution speed through direct memory allocations and WebAssembly SIMD optimizations.',
    metric: '4.8M ops/sec',
    metricLabel: 'Vector Throughput',
    tags: ['WebAssembly', 'Rust', 'WebGL2', 'SIMD'],
    year: '2026',
    status: 'PRODUCTION',
    github: 'https://github.com',
    demo: '#',
  },
  {
    id: 'synapse-router',
    title: 'Synapse Octilinear Circuit Router',
    subtitle: 'Procedural Manhattan & 45-degree PCB schematic routing engine',
    description:
      'Algorithmic graph routing system that computes minimum-distance geometric circuit paths with strict 90-degree and 45-degree bends. Powers real-time hardware EDA visualization tools.',
    metric: '< 1.2ms',
    metricLabel: 'Graph Convergence',
    tags: ['TypeScript', 'SVG Canvas', 'Graph Algorithms'],
    year: '2025',
    status: 'STABLE',
    github: 'https://github.com',
    demo: '#',
  },
  {
    id: 'aura-shaders',
    title: 'Aura CRT Simulation Environment',
    subtitle: 'Photorealistic phosphor decay & chromatic distortion shaders',
    description:
      'GPU fragment shader pipeline reproducing authentic cathode-ray tube rasterization, phosphor persistence, scanline jitter, and magnetic curvature distortion directly on HTML5 canvases.',
    metric: '120 FPS',
    metricLabel: 'GPU Frame Rate',
    tags: ['GLSL', 'React', 'Three.js', 'PostCSS'],
    year: '2025',
    status: 'ACTIVE',
    github: 'https://github.com',
    demo: '#',
  },
];

function InteractiveProjectCard({ project }) {
  const cardRef = useRef(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePos({ x, y });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-7 rounded-xl border border-emerald-500/20 bg-[#07140e]/85 backdrop-blur-xl hover:border-emerald-400/50 transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.06)]"
    >
      {/* Traveling Electron Perimeter Beam (Emerald Mint) */}
      <SectionBorderElectron color="#10b981" rx={12} duration={12} />

      {/* Mouse-tracking glass glare spotlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0.02) 35%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left info column */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-500/[0.08] border border-cyan-500/20">
              {project.status}
            </span>
            <span className="text-xs font-mono text-white/30">{project.year}</span>
          </div>

          <h4 className="text-2xl font-semibold text-white/95 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h4>

          <p className="text-xs font-mono text-white/40">{project.subtitle}</p>

          <p className="text-sm text-white/45 leading-relaxed font-light pt-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-white/40 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right metrics & action column */}
        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-white/[0.06] pt-4 md:pt-0 md:pl-8 space-y-4">
          {/* Benchmark metric card */}
          <div className="text-left md:text-right">
            <div className="text-2xl font-bold font-mono text-white/90 group-hover:text-cyan-300 transition-colors">
              {project.metric}
            </div>
            <div className="text-[11px] font-mono text-white/30">{project.metricLabel}</div>
          </div>

          {/* Action Links */}
          <div className="flex items-center space-x-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white hover:border-white/20 transition-all"
              aria-label="View Source Code"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={project.demo}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white/[0.06] hover:bg-white text-white/80 hover:text-neutral-950 text-xs font-medium transition-all"
            >
              <span>Live Spec</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <div id="projects" className="relative scroll-mt-24">
      {/* Oversized Faint Spatial Section Watermark */}
      <span className="absolute -top-10 -left-2 sm:-left-6 text-8xl sm:text-9xl font-black text-emerald-400/[0.04] select-none pointer-events-none font-mono">
        04
      </span>

      {/* Distinct Atmospheric Ambient Wash (Emerald / Production Green Glow) */}
      <div
        className="absolute -top-12 inset-x-0 h-96 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 0%, rgba(16, 185, 129, 0.14), rgba(6, 182, 212, 0.04) 55%, transparent 80%)',
        }}
      />

      {/* Section Header */}
      <ScrollCard exitThreshold={0.62} exitComplete={0.92} className="relative z-10 mb-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-500/20">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              SECTION 04
            </span>
            <h3 className="text-xs sm:text-sm font-mono text-white/70 uppercase tracking-widest">
              FEATURED PROJECTS // AI SYSTEMS & INFRASTRUCTURE
            </h3>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-emerald-400/80 bg-emerald-500/[0.06] px-2.5 py-0.5 rounded border border-emerald-500/20">
            [DEPLOYED SYSTEMS]
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
            Featured systems, computational engines, and graphics environments.
          </h2>
          <p className="text-sm text-white/40 max-w-xl">
            Architected for high throughput, predictable computational complexity, and tactile feedback.
          </p>
        </div>
      </ScrollCard>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <ScrollCard
            key={project.id}
            entranceThreshold={0.14}
            exitThreshold={0.70}
            exitComplete={0.94}
            yOffset={32}
          >
            <InteractiveProjectCard project={project} />
          </ScrollCard>
        ))}
      </div>
    </div>
  );
}

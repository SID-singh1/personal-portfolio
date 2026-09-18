import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, ShieldCheck, Sparkles, Cpu, Layers } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const codeTabs = [
  {
    id: 'profile.ts',
    label: 'profile.ts',
    icon: Code2,
    code: `interface SystemArchitect {
  name: "Siddhant";
  specialization: "High-Performance Systems & Interactive Shaders";
  corePillars: [
    "Sub-millisecond latency UI physics",
    "GPU-accelerated compute shaders (WebGL / WGSL)",
    "Distributed WebAssembly runtimes",
    "Obsessive typographical precision"
  ];
  currentFocus: "Next-generation generative canvas pipelines";
  availability: "Select engineering contracts & full-time leadership";
}`,
  },
  {
    id: 'manifesto.md',
    label: 'manifesto.md',
    icon: Terminal,
    code: `# Engineering Creed

1. Speed is not a feature; it is an invariant.
2. Software should feel tactile, alive, and weightless.
3. Every UI interaction is an opportunity for tactile micro-feedback.
4. Clean code under the hood; cinematic fidelity in the browser.
5. Never compromise on 60 FPS frame budgets.`,
  },
  {
    id: 'runtime.json',
    label: 'runtime.json',
    icon: Layers,
    code: `{
  "runtime": "Node.js / Bun / Browser Native",
  "concurrency": "Multi-threaded Worker Pools",
  "telemetry": {
    "fps_target": 120,
    "memory_footprint": "< 24MB",
    "bundle_overhead": "Zero unnecessary dependencies"
  },
  "status": "READY_FOR_DEPLOYMENT"
}`,
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.section
      id="about"
      className="mb-36 scroll-mt-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest">
            01 // ARCHITECTURAL DOSSIER
          </h3>
        </div>
        <span className="text-xs font-mono text-white/25">[INSPECTOR_ACTIVE]</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: narrative bio */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
            Crafting the invisible mechanics behind visceral user interfaces.
          </h2>

          <p className="text-sm text-white/40 leading-relaxed">
            I work at the intersection of systems architecture, graphic pipelines, and human-computer
            interaction. My design philosophy is rooted in precision: mathematical layouts, fluid
            physics simulations, and mechanical predictability.
          </p>

          <p className="text-sm text-white/40 leading-relaxed">
            Whether engineering distributed compute kernels in Rust or designing micro-interactions
            in modern React, every pixel and every thread is treated as an essential instrument.
          </p>

          {/* Micro Telemetry Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.015]">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>60+ FPS</span>
              </div>
              <p className="text-[11px] text-white/30">Target frame budget</p>
            </div>

            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.015]">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% TYPE-SAFE</span>
              </div>
              <p className="text-[11px] text-white/30">TypeScript & Rust</p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Code Terminal Window */}
        <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#0c0c0e]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Terminal Titlebar with tabs */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
            {/* Window control dots */}
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-1">
              {codeTabs.map((tab, idx) => {
                const Icon = tab.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-mono transition-all ${
                      isActive
                        ? 'bg-white/[0.08] text-white/90 border border-white/[0.08]'
                        : 'text-white/35 hover:text-white/60 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon className="w-3 h-3 text-cyan-400/80" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center text-[10px] text-white/25 font-mono">
              UTF-8
            </div>
          </div>

          {/* Terminal Code Viewer */}
          <div className="p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed overflow-x-auto text-white/80">
            <pre className="text-white/70">
              <code>
                {codeTabs[activeTab].code.split('\n').map((line, lIdx) => (
                  <div key={lIdx} className="flex">
                    <span className="select-none text-white/20 w-8 text-right pr-4 text-[11px]">
                      {lIdx + 1}
                    </span>
                    <span
                      className={
                        line.startsWith('#')
                          ? 'text-cyan-300 font-bold'
                          : line.includes('interface') || line.includes('const')
                          ? 'text-purple-400'
                          : line.includes('"')
                          ? 'text-emerald-300/90'
                          : line.includes(':')
                          ? 'text-sky-300'
                          : 'text-white/60'
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Status Bar */}
          <div className="px-4 py-1.5 bg-white/[0.015] border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-white/25">
            <span className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>LN {codeTabs[activeTab].code.split('\n').length}, COL 1</span>
            </span>
            <span>TS-SERVER: READY</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

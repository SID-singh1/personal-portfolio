import React, { useState } from 'react';
import { Cpu, Globe, Server, Terminal, Sparkles, Binary } from 'lucide-react';
import ScrollCard from '../ScrollCard';

const skillCategories = [
  {
    id: 'systems',
    title: 'Core Systems & Compute',
    icon: Cpu,
    accent: '#00f3ff',
    skills: [
      { name: 'Rust', level: 'Advanced', note: 'Memory safety & concurrency', tag: 'Native' },
      { name: 'WebAssembly (WASM)', level: 'High-Throughput', note: 'SIMD vectorization in browser', tag: 'Runtime' },
      { name: 'C / C++', level: 'Core', note: 'Data structures & low-level memory', tag: 'System' },
      { name: 'TypeScript', level: 'Strict Mode', note: 'Type-level metaprogramming', tag: 'Fullstack' },
    ],
  },
  {
    id: 'graphics',
    title: 'Graphics & Interface Physics',
    icon: Globe,
    accent: '#38bdf8',
    skills: [
      { name: 'React 19 / Next.js', level: 'Expert', note: 'Concurrent rendering & architecture', tag: 'UI' },
      { name: 'WebGL & GLSL', level: 'Fluid', note: 'Post-processing shaders & buffers', tag: 'Graphics' },
      { name: 'Framer Motion', level: 'Mastery', note: 'Spring physics & choreography', tag: 'Motion' },
      { name: 'Tailwind CSS', level: 'Architect', note: 'Custom design systems & tokens', tag: 'Styling' },
    ],
  },
  {
    id: 'infra',
    title: 'Architecture & Distributed Cloud',
    icon: Server,
    accent: '#ffb703',
    skills: [
      { name: 'Node.js / Bun', level: 'High-Load', note: 'Event loop tuning & streaming', tag: 'Backend' },
      { name: 'PostgreSQL & Redis', level: 'Optimized', note: 'Query optimization & pub/sub', tag: 'Data' },
      { name: 'Docker & Microservices', level: 'Isolated', note: 'Containerization & pipelines', tag: 'DevOps' },
      { name: 'REST & GraphQL APIs', level: 'Schema-Driven', note: 'Low-latency contracts', tag: 'Network' },
    ],
  },
];

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div id="skills" className="scroll-mt-24">
      {/* Section Header */}
      <ScrollCard exitThreshold={0.62} exitComplete={0.92} className="mb-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest">
              02 // SKILLS & EXPERTISE
            </h3>
          </div>
          <span className="text-xs font-mono text-white/30">[CORE COMPETENCIES]</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
            Engineered for mechanical resilience and zero-latency execution.
          </h2>
          <p className="text-sm text-white/40 max-w-xl">
            An interactive index of technical competencies spanning bare-metal systems,
            reactive browser runtimes, and real-time graphics engines.
          </p>
        </div>
      </ScrollCard>

      {/* 3-Column Categorized Capability Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category) => {
          const Icon = category.icon;

          return (
            <ScrollCard
              key={category.id}
              entranceThreshold={0.14}
              exitThreshold={0.72}
              exitComplete={0.95}
              yOffset={28}
            >
              <div className="h-full p-6 rounded-xl border border-white/[0.06] bg-[#0c0c0e]/60 backdrop-blur-sm space-y-6 hover:border-white/[0.12] transition-colors">
                {/* Category title and icon */}
                <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.04]">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.08]"
                    style={{ backgroundColor: `${category.accent}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: category.accent }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">{category.title}</h4>
                    <span className="text-[11px] font-mono text-white/30">NODE_GROUP // {category.id.toUpperCase()}</span>
                  </div>
                </div>

                {/* Skill list */}
                <div className="space-y-3">
                  {category.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;

                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-default ${
                          isHovered
                            ? 'border-cyan-400/40 bg-cyan-400/[0.04] shadow-[0_0_15px_rgba(0,243,255,0.08)]'
                            : 'border-white/[0.04] bg-white/[0.015] hover:border-white/[0.08]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white/90">{skill.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-white/40">
                            {skill.tag}
                          </span>
                        </div>
                        <p className="text-[12px] text-white/35 font-light">{skill.note}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollCard>
          );
        })}
      </div>
    </div>
  );
}

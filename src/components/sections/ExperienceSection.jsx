import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const experiences = [
  {
    role: 'Lead Systems Engineer & UI Architect',
    company: 'Synapse Core Labs',
    period: '2024 — PRESENT',
    location: 'Remote // San Francisco',
    highlights: [
      'Architected browser-native WebAssembly compute pipelines processing 4M+ matrix transformations/sec.',
      'Reduced initial render bundle size by 42% via tree-shaking, code splitting, and custom memory management.',
      'Mentored a team of 6 engineers across React, TypeScript, and GLSL shader optimization.',
    ],
    tech: ['Rust', 'WebAssembly', 'React', 'WebGL', 'TypeScript'],
  },
  {
    role: 'Creative Technologist // Senior Frontend Engineer',
    company: 'Aura Interactive',
    period: '2023 — 2024',
    location: 'Hybrid',
    highlights: [
      'Developed high-fidelity 3D and canvas micro-interactions for tier-1 developer tooling startups.',
      'Created bespoke Framer Motion animation engines supporting custom physics, springs, and gesture tracking.',
      'Collaborated directly with founders and design leads to turn conceptual wireframes into production code.',
    ],
    tech: ['React 18', 'Framer Motion', 'Tailwind CSS', 'Three.js', 'Node.js'],
  },
  {
    role: 'Software Engineer // Graphics & Algorithms',
    company: 'Vanguard Systems',
    period: '2021 — 2023',
    location: 'On-site',
    highlights: [
      'Built automated PCB schematic routing algorithms adhering to strict 90° and 45° geometric constraints.',
      'Implemented real-time telemetry streaming over WebSockets with sub-15ms client delivery.',
      'Contributed to core open-source graph visualization libraries.',
    ],
    tech: ['TypeScript', 'SVG', 'Algorithms', 'WebSockets', 'Python'],
  },
];

export default function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="mb-36 scroll-mt-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest">
            04 // CAREER & MILESTONES
          </h3>
        </div>
        <span className="text-xs font-mono text-white/25">[CHRONOLOGICAL_LOG]</span>
      </div>

      <div className="space-y-4 mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
          Proven history of engineering leadership and technical execution.
        </h2>
        <p className="text-sm text-white/40 max-w-xl">
          Track record of delivering production-grade platforms, high-performance UI systems,
          and robust developer tooling.
        </p>
      </div>

      {/* Timeline with vertical circuit wire */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/[0.08] space-y-12">
        {experiences.map((exp, idx) => (
          <div key={exp.company} className="relative group">
            {/* Glowing Solder Via Node on the timeline wire */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#09090b] bg-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.8)] group-hover:scale-125 transition-transform" />
            </div>

            {/* Content card */}
            <div className="p-6 rounded-xl border border-white/[0.06] bg-[#0c0c0e]/50 hover:border-white/[0.12] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white/90 group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h4>
                  <div className="text-sm font-mono text-white/50">{exp.company}</div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400/90 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/[0.05] self-start sm:self-auto">
                  <Calendar className="w-3 h-3" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 mt-4 text-sm text-white/45 font-light">
                {exp.highlights.map((item, hIdx) => (
                  <li key={hIdx} className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-cyan-400/70 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-5 mt-4 border-t border-white/[0.04]">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-white/30 px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

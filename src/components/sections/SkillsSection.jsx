import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Server,
  Binary,
  Trophy,
  Globe,
  Layers,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import ScrollCard from '../ScrollCard';
import SectionBorderElectron from '../SectionBorderElectron';

const skillCategories = [
  {
    id: 'genai',
    title: 'Generative AI & Agentic Systems',
    subtitle: 'Autonomous multi-actor loops & vector RAG pipelines',
    icon: Sparkles,
    accent: '#00f3ff',
    badge: 'HOTTEST 2026',
    skills: [
      { name: 'LLM Apps & Multi-Agent Systems', note: 'Production generative architectures', tag: 'Core AI' },
      { name: 'Retrieval-Augmented Gen (RAG)', note: 'Dense/sparse hybrid retrieval & rerankers', tag: 'RAG' },
      { name: 'LangChain & LangGraph', note: 'Cyclic state machines & agent graphs', tag: 'Orchestration' },
      { name: 'Claude API, Gemini & Llama', note: 'Frontier foundational model integration', tag: 'Models' },
      { name: 'Prompt Engineering & Evaluation', note: 'Structured outputs, DSPy, few-shot tuning', tag: 'Alignment' },
    ],
  },
  {
    id: 'optimization',
    title: 'Model Optimization & Edge Compute',
    subtitle: 'Sub-millisecond inference & memory reduction',
    icon: Cpu,
    accent: '#ffb703',
    badge: 'DEEP TECH',
    skills: [
      { name: 'Quantization (INT8 / INT4 / Mixed)', note: 'Weight & activation compression with zero accuracy drop', tag: 'Quant' },
      { name: 'llama.cpp & GGUF Runtimes', note: 'CPU/GPU edge inference without heavy runtimes', tag: 'Inference' },
      { name: 'Knowledge Distillation', note: 'Teacher-student model compression', tag: 'Training' },
      { name: 'ONNX Runtime', note: 'Cross-platform graph optimizations', tag: 'Engine' },
    ],
  },
  {
    id: 'backend',
    title: 'Distributed Backend & Vector Search',
    subtitle: 'High-concurrency APIs & real-time datastores',
    icon: Server,
    accent: '#10b981',
    badge: 'HIGH LOAD',
    skills: [
      { name: 'Python & FastAPI', note: 'Asynchronous, schema-enforced microservices', tag: 'Backend' },
      { name: 'Redis & Caching Layers', note: 'In-memory pub/sub, queues, rate-limiting', tag: 'Data' },
      { name: 'Qdrant Vector Database', note: 'High-scale ANN vector indexing & embeddings', tag: 'Vector DB' },
      { name: 'SQLAlchemy & Relational DBs', note: 'Optimized schema design & connection pooling', tag: 'ORM' },
      { name: 'Distributed Systems & REST APIs', note: 'Fault-tolerant distributed workflows', tag: 'Architecture' },
    ],
  },
  {
    id: 'mlops',
    title: 'MLOps, Cloud & Data Pipelines',
    subtitle: 'Reliable lifecycle automation & observability',
    icon: Binary,
    accent: '#a855f7',
    badge: 'PLATFORM',
    skills: [
      { name: 'Docker & Microservices', note: 'Containerized deployment & isolation', tag: 'Containers' },
      { name: 'MLflow & Experiment Tracking', note: 'Model versioning & metrics logging', tag: 'MLOps' },
      { name: 'Prometheus & Grafana', note: 'Real-time telemetry & latency monitoring', tag: 'Metrics' },
      { name: 'Airflow & dbt Data Pipelines', note: 'Automated DAG execution & transformations', tag: 'DataOps' },
      { name: 'GitHub Actions & AWS', note: 'Continuous integration, delivery & cloud services', tag: 'Cloud' },
    ],
  },
  {
    id: 'core_cs',
    title: 'Core CS & Algorithmic Problem Solving',
    subtitle: 'Mathematical precision & structural complexity',
    icon: Trophy,
    accent: '#f59e0b',
    badge: '680+ SOLVED',
    skills: [
      { name: 'Data Structures & Algorithms', note: '680+ LeetCode problems solved with top-tier efficiency', tag: 'LeetCode' },
      { name: 'System Design & Scalability', note: 'Microservices, cache invalidation, load balancing', tag: 'Systems' },
      { name: 'Concurrency & Multi-Threading', note: 'Race condition prevention & lock-free queues', tag: 'Compute' },
      { name: 'Computer Architecture & OS Kernels', note: 'Memory hierarchy, paging, I/O bottlenecks', tag: 'Foundations' },
    ],
  },
  {
    id: 'languages_ui',
    title: 'Languages & Reactive Interfaces',
    subtitle: 'Multi-paradigm polyglot & modern frontend',
    icon: Globe,
    accent: '#38bdf8',
    badge: 'FULL-SPECTRUM',
    skills: [
      { name: 'Python (Expert)', note: 'Metaprogramming, asyncio, typing, scientific stack', tag: 'Language' },
      { name: 'C++ & Java (Core)', note: 'OOP, low-level memory, systems programming', tag: 'Language' },
      { name: 'JavaScript & TypeScript', note: 'Strict typing, event loops, modern runtimes', tag: 'Language' },
      { name: 'React & Interactive Web', note: 'Framer Motion, Tailwind CSS, component systems', tag: 'Frontend' },
      { name: 'Socket.IO & Real-time Web', note: 'Bi-directional WebSocket streaming', tag: 'Sockets' },
    ],
  },
];

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'ALL CAPABILITIES', count: skillCategories.length },
    { id: 'genai', label: 'GENAI & AGENTS', count: 1 },
    { id: 'optimization', label: 'OPTIMIZATION', count: 1 },
    { id: 'backend', label: 'BACKEND & VECTOR', count: 1 },
    { id: 'mlops', label: 'MLOPS & CLOUD', count: 1 },
    { id: 'core_cs', label: 'CORE CS (680+ LC)', count: 1 },
    { id: 'languages_ui', label: 'LANGUAGES & UI', count: 1 },
  ];

  const visibleCategories =
    activeFilter === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeFilter);

  return (
    <div id="skills" className="relative scroll-mt-24">
      {/* Distinct Atmospheric Ambient Wash (Indigo / Cyber Violet Aura) */}
      <div
        className="absolute -top-12 inset-x-0 h-96 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 0%, rgba(129, 140, 248, 0.14), rgba(139, 92, 246, 0.04) 55%, transparent 80%)',
        }}
      />

      {/* Section Header */}
      <ScrollCard exitThreshold={0.62} exitComplete={0.92} className="relative z-10 mb-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest">
              02 // SKILLS & TECHNICAL ARSENAL
            </h3>
          </div>
          <span className="text-xs font-mono text-white/30">[AI • SYSTEMS • INFRA]</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
            Engineered for scalable agentic intelligence and low-latency systems.
          </h2>
          <p className="text-sm text-white/40 max-w-2xl leading-relaxed">
            A comprehensive, battle-tested stack spanning generative agent workflows, quantized model inference, distributed backends, and institutional algorithmic problem solving.
          </p>
        </div>
      </ScrollCard>

      {/* Interactive Domain Filter Navigation Bar */}
      <ScrollCard
        entranceThreshold={0.12}
        exitThreshold={0.72}
        exitComplete={0.95}
        yOffset={20}
        className="mb-8"
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-cyan-400/50 bg-cyan-400/[0.1] text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.15)] font-semibold'
                    : 'border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/80 hover:border-white/20'
                }`}
              >
                <span>{tab.label}</span>
                {tab.id === 'all' && (
                  <span className="text-[10px] text-white/30 px-1.5 py-0.2 rounded bg-white/[0.06]">
                    {skillCategories.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </ScrollCard>

      {/* Categorized Capability Matrix (2 Columns on tablet/desktop for rich readability) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleCategories.map((category) => {
          const Icon = category.icon;

          return (
            <ScrollCard
              key={category.id}
              entranceThreshold={0.14}
              exitThreshold={0.72}
              exitComplete={0.95}
              yOffset={28}
            >
              <div className="group relative overflow-hidden h-full p-6 sm:p-7 rounded-xl border border-indigo-500/20 bg-[#0a0b16]/85 backdrop-blur-xl space-y-6 hover:border-indigo-400/40 transition-all shadow-[0_0_30px_rgba(129,140,248,0.06)]">
                {/* Traveling Electron Perimeter Beam (Category Accent Color) */}
                <SectionBorderElectron color={category.accent || '#818cf8'} rx={12} duration={14} />

                {/* Category title and icon */}
                <div className="flex items-start justify-between pb-4 border-b border-white/[0.05]">
                  <div className="flex items-center space-x-3.5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/[0.08] shrink-0"
                      style={{ backgroundColor: `${category.accent}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.accent }} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white/95">{category.title}</h4>
                      <p className="text-xs text-white/40 mt-0.5">{category.subtitle}</p>
                    </div>
                  </div>

                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded border self-start shrink-0"
                    style={{
                      borderColor: `${category.accent}40`,
                      color: category.accent,
                      backgroundColor: `${category.accent}10`,
                    }}
                  >
                    {category.badge}
                  </span>
                </div>

                {/* Skill list */}
                <div className="space-y-2.5">
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
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-medium text-white/90 flex items-center space-x-1.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: category.accent }}
                            />
                            <span>{skill.name}</span>
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/45 border border-white/[0.04] shrink-0">
                            {skill.tag}
                          </span>
                        </div>
                        <p className="text-[12px] text-white/35 font-light pl-3">{skill.note}</p>
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

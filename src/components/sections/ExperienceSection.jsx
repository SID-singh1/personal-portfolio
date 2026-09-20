import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Cpu,
  Zap,
  Layers,
  Sparkles,
  CheckCircle2,
  Smartphone,
  Gauge,
  Database,
  Search,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import ScrollCard from '../ScrollCard';

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState('all');

  const telemetryMetrics = [
    {
      label: 'Avg On-Device Latency',
      value: '~4.35ms',
      subtext: 'NNAPI / NPU hardware accelerated (~50ms CPU fallback)',
      badge: 'REAL-TIME EDGE',
      color: 'cyan',
    },
    {
      label: 'Model Footprint',
      value: '~2.87MB',
      subtext: 'INT8 quantized MobileNetV2 (fits in budget cache)',
      badge: '97.2% COMPRESSION',
      color: 'emerald',
    },
    {
      label: 'Clean Test Accuracy',
      value: '97.87%',
      subtext: 'Student beat Teacher (95.09% EfficientNetB4)',
      badge: '+2.78% OVER TEACHER',
      color: 'purple',
    },
    {
      label: 'Deployment Architecture',
      value: '100% Offline',
      subtext: 'Zero cloud latency, zero API costs, total device privacy',
      badge: 'AIR-GAPPED EDGE',
      color: 'amber',
    },
  ];

  const milestones = [
    {
      id: 'distillation',
      category: 'compression',
      title: 'Knowledge Distillation & Model Compression',
      headline: 'Distilled EfficientNetB4 Teacher → MobileNetV2 Student (Beating Teacher at 2.87MB)',
      description:
        'Architected knowledge distillation pipeline for 10-class document image classification targeting budget and mid-range Android devices. The compact MobileNetV2 student achieved higher clean test accuracy than the massive EfficientNetB4 teacher (97.87% vs 95.09%) at an ultra-compact ~2.87MB INT8 footprint with ~4.35ms inference latency.',
      metrics: ['97.87% Student Acc', '95.09% Teacher Acc', '2.87MB Model Size', '4.35ms Latency'],
      tags: ['EfficientNetB4', 'MobileNetV2', 'Knowledge Distillation', 'TFLite INT8'],
    },
    {
      id: 'qad',
      category: 'quantization',
      title: 'Quantization Collapse Diagnosis & QAD',
      headline: 'Diagnosed PTQ Collapse (F1 0.74) and Switched to Quantization-Aware Distillation',
      description:
        'Identified severe distribution skew in INT8 Post-Training Quantization (PTQ) where F1 collapsed to 0.74 due to sensitive weight channels. Designed a Quantization-Aware Distillation (QAD) workflow that trained the student directly within quantized constraints, outperforming PTQ on both the clean test set (97.87% vs 96.56%) and harsh real-world phone captures (84.10% vs 78.87%).',
      metrics: ['F1: 0.74 → 0.98', '84.10% Real-World Phone Acc', 'QAD > PTQ by +5.23%'],
      tags: ['Quantization Collapse', 'QAD', 'PTQ Analysis', 'Precision Calibration'],
    },
    {
      id: 'domain-shift',
      category: 'data',
      title: 'Domain-Shift Harvester & Data Pipeline',
      headline: '4-Tier Error Harvester & 2-Stage Data Curation (Weak-Class Recall: 2.78% → 69.44%)',
      description:
        'Closed the catastrophic domain-shift gap between clean scanned documents and mobile camera captures via a custom 4-tier error-analysis harvester and targeted dataset expansion (819 → 1,619 images). Lifted weak-class recall from 2.78% to 54.29% under PTQ and 8.33% to 69.44% under QAD. Engineered a 2-stage cleaning pipeline using perceptual hashing (pHash) deduplication and CLIP zero-shot semantic triage.',
      metrics: ['Recall: 2.78% → 69.44%', '819 → 1,619 Data Push', 'pHash Dedup', 'CLIP Zero-Shot'],
      tags: ['Error Harvester', 'Domain Adaptation', 'pHash', 'CLIP Triage', 'Data Engineering'],
    },
    {
      id: 'systems-android',
      category: 'systems',
      title: 'Systems Profiling & Production Android App',
      headline: 'Root-Caused 100ms NNAPI Stall & Shipped 100% Offline Multi-Threaded Edge App',
      description:
        'Conducted low-level hardware tracing: traced a 100ms+ on-device latency bottleneck to NNAPI delegate non-engagement (driver fallback to CPU) and root-caused a "book-attractor" bias to teacher decision boundary geometry. Engineered and shipped a production Android app running 100% on-device with zero server reliance: real-time camera inference, auto-sorting into local class folders, and gallery classification via multithreaded NPU execution.',
      metrics: ['4.35ms NPU Ingestion', '50ms CPU Fallback', '100% Serverless', 'Real-Time Auto-Sort'],
      tags: ['Android Studio', 'NNAPI / NPU', 'Java/Kotlin', 'Multithreading', 'Hardware Profiling'],
    },
  ];

  const filteredMilestones =
    activeTab === 'all'
      ? milestones
      : milestones.filter((m) => m.category === activeTab);

  return (
    <div id="experience" className="relative scroll-mt-24">
      {/* Subtle Atmospheric Ambient Wash (Samsung R&D Electric Blue / Cyan Glow) */}
      <div
        className="absolute -top-12 inset-x-0 h-96 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14, 165, 233, 0.08), rgba(6, 182, 212, 0.02) 50%, transparent 80%)',
        }}
      />

      {/* Section Header */}
      <ScrollCard exitThreshold={0.62} exitComplete={0.92} className="relative z-10 mb-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
            <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest">
              03 // RESEARCH & SYSTEMS EXPERIENCE
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400/60 bg-cyan-500/[0.06] px-2.5 py-0.5 rounded border border-cyan-500/20">
            [PRODUCTION EDGE AI]
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
            High-throughput edge intelligence & systems-level ML compression.
          </h2>
          <p className="text-sm text-white/40 max-w-2xl leading-relaxed">
            Full-lifecycle engineering: from mathematical knowledge distillation and quantization-aware training to low-level hardware delegate profiling (NNAPI/NPU) and production on-device shipping.
          </p>
        </div>
      </ScrollCard>

      {/* ── Main Experience Showcase Card (Samsung R&D) ── */}
      <ScrollCard
        entranceThreshold={0.14}
        exitThreshold={0.72}
        exitComplete={0.95}
        yOffset={24}
        className="relative z-10 mb-10"
      >
        <div className="relative rounded-2xl border border-sky-500/20 bg-[#0c0c0e]/90 backdrop-blur-md p-6 sm:p-8 overflow-hidden shadow-[0_0_50px_rgba(14,165,233,0.04)]">
          {/* Subtle top-edge accent line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Role & Company Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/[0.06]">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-500/25 tracking-wider">
                  RESEARCH INTERNSHIP
                </span>
                <span className="text-xs font-mono text-emerald-400/90 bg-emerald-500/[0.08] px-2.5 py-1 rounded border border-emerald-500/20 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>COMPLETED & SHIPPED</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-1">
                AI/ML Research Intern
              </h3>

              <div className="text-base sm:text-lg text-sky-200/90 font-medium flex items-center space-x-2">
                <span>Samsung R&D Institute India (SRI-B)</span>
                <span className="text-white/20">•</span>
                <span className="text-white/50 text-sm font-mono">Bangalore, India</span>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end space-y-1.5 shrink-0">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 px-3.5 py-1.5 rounded-lg bg-cyan-500/[0.08] border border-cyan-500/20">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>January 2026 – August 2026</span>
              </div>
              <span className="text-[11px] font-mono text-white/40">
                End-to-End Edge ML & Android Engineering
              </span>
            </div>
          </div>

          {/* Project Abstract Banner */}
          <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start space-x-3.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Smartphone className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                System Objective & Scope
              </div>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                Engineered a <strong className="text-white font-medium">100% offline, on-device document image classifier and native Android application</strong> from scratch: spanning raw data curation, knowledge distillation, INT8 quantization-aware optimization, hardware NPU delegation, and production deployment on budget/mid-range Android smartphones.
              </p>
            </div>
          </div>

          {/* ── 4 Key Telemetry Metric Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
            {telemetryMetrics.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.015] hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                      item.color === 'cyan'
                        ? 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20'
                        : item.color === 'emerald'
                        ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20'
                        : item.color === 'purple'
                        ? 'text-purple-300 bg-purple-500/10 border-purple-500/20'
                        : 'text-amber-300 bg-amber-500/10 border-amber-500/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <div className="text-2xl font-bold font-mono text-white tracking-tight mb-1">
                  {item.value}
                </div>
                <p className="text-[11px] text-white/40 font-light leading-snug">
                  {item.subtext}
                </p>
              </div>
            ))}
          </div>

          {/* ── Technical Pillar Tabs / Filter Bar ── */}
          <div className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-white/[0.05]">
              <div className="text-xs font-mono text-white/50 uppercase tracking-wider flex items-center space-x-2">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deep Architectural Breakdown</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Milestones' },
                  { id: 'compression', label: 'Distillation' },
                  { id: 'quantization', label: 'QAD & Quantization' },
                  { id: 'data', label: 'Data & Harvester' },
                  { id: 'systems', label: 'Systems & Android' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,243,255,0.2)]'
                        : 'bg-white/[0.02] text-white/40 border border-white/[0.05] hover:text-white/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Filtered Milestones Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredMilestones.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-white/[0.14] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-500/[0.08] border border-cyan-500/20 uppercase tracking-wider">
                        {m.title}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white/95 leading-snug">
                      {m.headline}
                    </h4>

                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      {m.description}
                    </p>
                  </div>

                  {/* Benchmark highlights pill strip */}
                  <div className="space-y-3 pt-3 border-t border-white/[0.04]">
                    <div className="flex flex-wrap gap-1.5">
                      {m.metrics.map((met, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono text-emerald-300/90 bg-emerald-500/[0.08] px-2 py-0.5 rounded border border-emerald-500/20"
                        >
                          {met}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-white/35 px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.04]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Tech Stack Summary Strip ── */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-white/40">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Stack & Tooling:</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                'TensorFlow / Keras',
                'TFLite',
                'NNAPI / NPU',
                'Android',
                'EfficientNetB4',
                'MobileNetV2',
                'Knowledge Distillation',
                'PTQ / QAD',
                'CLIP',
                'pHash',
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-white/70 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollCard>
    </div>
  );
}

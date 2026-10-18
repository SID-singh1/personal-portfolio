import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowLeft, Terminal, ShieldCheck, Cpu, Download, Github, Linkedin, Mail } from 'lucide-react';
import { person, resumes, experience, projects, skillGroups, achievements, education } from '../data/profile';

const ACCENTS = [
  'border-cyan-500/40 text-cyan-400',
  'border-emerald-500/40 text-emerald-400',
  'border-purple-500/40 text-purple-400',
  'border-amber-500/40 text-amber-400',
];

/**
 * PortfolioContent — the Ultra-mode reveal (State 5).
 * Same real content as the Clean view (src/data/profile.js), in full cyberpunk skin.
 */
export default function PortfolioContent({ onReset, onReplaySequence }) {
  const job = experience[0];

  return (
    <motion.div
      id="portfolio-main-content"
      className="relative min-h-screen w-full bg-[#040711] text-slate-100 selection:bg-cyan-500 selection:text-black z-10 overflow-y-auto"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 pcb-grid-bg opacity-40 pointer-events-none fixed" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none fixed" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none fixed" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/60 border-b border-cyan-900/40 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyan-400/80 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,243,255,0.5)]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold tracking-wider text-cyan-200">SYS::SIDDHANT</div>
            <div className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CIRCUITS ONLINE</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 mr-0 sm:mr-48">
          <button
            onClick={onReplaySequence || onReset}
            className="group flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 font-mono text-xs text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
            title="Replay sequence"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="tracking-wider uppercase text-[11px] hidden sm:inline-block">REPLAY</span>
          </button>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-24">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 mb-8 backdrop-blur-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>OVERCLOCK COMPLETE</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-semibold">{person.availability.toUpperCase()}</span>
        </div>

        {/* Hero */}
        <section className="space-y-6 mb-16">
          <div className="space-y-2">
            <h2 className="text-xs md:text-sm font-mono tracking-widest text-cyan-400 uppercase">
              {person.role} // {person.location}
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-tight">
              {person.name.toUpperCase()} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 drop-shadow-[0_0_25px_rgba(0,243,255,0.4)]">
                SMALL MODELS. FAST SYSTEMS.
              </span>
            </h1>
          </div>

          <p className="max-w-2xl text-slate-300 text-base md:text-lg font-light leading-relaxed">{person.tagline}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            {resumes.map((r, i) => (
              <a
                key={r.id}
                href={r.href}
                target="_blank"
                rel="noopener"
                className={
                  i === 0
                    ? 'px-5 py-3 bg-cyan-400 text-black font-mono font-bold text-sm rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.6)] hover:bg-cyan-300 transition-all flex items-center space-x-2'
                    : 'px-5 py-3 bg-neutral-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 font-mono text-sm rounded-lg transition-all flex items-center space-x-2'
                }
              >
                <Download className="w-4 h-4" />
                <span>{r.label.toUpperCase()}</span>
              </a>
            ))}
            <button
              onClick={onReset}
              className="px-5 py-3 bg-neutral-900 border border-neutral-700 hover:border-cyan-400 text-slate-200 font-mono text-sm rounded-lg transition-all flex items-center space-x-2 cursor-pointer hover:bg-neutral-800"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>RETURN TO NORMAL</span>
            </button>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <div className="border border-cyan-500/40 rounded-lg p-6 bg-black/50 backdrop-blur-md shadow-[0_0_30px_rgba(0,243,255,0.08)]">
            <div className="text-xs font-mono text-slate-400 mb-3 tracking-wider uppercase flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>EXPERIENCE.LOG</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
              <h3 className="font-display text-xl text-white">{job.title.toUpperCase()}</h3>
              <span className="font-mono text-xs text-cyan-300">{job.period}</span>
            </div>
            <p className="font-mono text-sm text-cyan-200/80">{job.org}</p>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-3xl">{job.summary}</p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {job.metrics.map((m) => (
                <div key={m.label} className="p-3 bg-neutral-950/80 border border-neutral-800 rounded">
                  <div className="font-mono text-lg font-semibold text-cyan-300">{m.value}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="space-y-6 mb-16">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h2 className="text-xl font-display font-bold text-white tracking-wide">DEPLOYED ARTIFACTS</h2>
            <span className="text-xs font-mono text-cyan-400">COUNT: {String(projects.length).padStart(2, '0')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, i) => (
              <div
                key={proj.id}
                className="group relative p-6 bg-neutral-950/70 border border-neutral-800 hover:border-cyan-500/60 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,243,255,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${ACCENTS[i % ACCENTS.length]}`}>
                      {proj.status.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {proj.metrics[0].value} {proj.metrics[0].label}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {proj.name.toUpperCase()}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{proj.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/80">
                  {proj.stack.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono bg-neutral-900 text-slate-300 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stack matrix */}
        <section className="mb-16">
          <div className="border border-cyan-900/40 rounded-lg p-6 bg-black/40 backdrop-blur-md">
            <div className="text-xs font-mono text-slate-400 mb-4 tracking-wider uppercase flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>INITIALIZED STACK</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillGroups.map((g) => (
                <div key={g.title} className="p-3 bg-neutral-950/80 border border-neutral-800 rounded">
                  <div className="font-mono text-xs font-semibold text-cyan-300 uppercase mb-2">{g.title}</div>
                  <div className="text-xs text-slate-300 font-mono leading-relaxed">{g.items.join(' · ')}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Honors + contact */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-amber-500/30 rounded-lg p-6 bg-black/40">
            <div className="text-xs font-mono text-amber-300 mb-3 uppercase tracking-wider">ACHIEVEMENTS</div>
            <ul className="space-y-2 font-mono text-sm">
              <li className="text-slate-200">
                {education.grade} <span className="text-slate-500">· {education.degree}, VIT</span>
              </li>
              {achievements.map((a) => (
                <li key={a.title} className="text-slate-200">
                  {a.title} <span className="text-slate-500">· {a.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-purple-500/30 rounded-lg p-6 bg-black/40">
            <div className="text-xs font-mono text-purple-300 mb-3 uppercase tracking-wider">OPEN CHANNEL</div>
            <div className="flex flex-col gap-2 font-mono text-sm">
              <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-slate-200 hover:text-cyan-300">
                <Mail className="w-4 h-4" /> {person.email}
              </a>
              <a href={person.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-200 hover:text-cyan-300">
                <Github className="w-4 h-4" /> github.com/SID-singh1
              </a>
              <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-200 hover:text-cyan-300">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 bg-black/80 px-6 py-6 text-center text-xs font-mono text-slate-500">
        SYSTEM KERNEL // ALL CIRCUITS FUNCTIONAL // PRESS ESC TO RETURN TO NORMAL
      </footer>
    </motion.div>
  );
}

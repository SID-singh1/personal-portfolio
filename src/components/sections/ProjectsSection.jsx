import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { projects, person } from '../../data/profile';
import { Reveal, SectionHeader, Tag } from '../ui';

const statusStyle = {
  Deployed: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/[0.06]',
  Completed: 'text-sky-300 border-sky-500/30 bg-sky-500/[0.06]',
  'Pre-launch': 'text-amber-300 border-amber-500/30 bg-amber-500/[0.06]',
  'In progress': 'text-amber-300 border-amber-500/30 bg-amber-500/[0.06]',
};

function ProjectCard({ p }) {
  const primary = p.links.demo || p.links.github;
  return (
    <article className="group h-full flex flex-col rounded-xl border border-white/10 bg-[#0c0c0f] p-5 sm:p-6 hover:border-emerald-400/40 transition-colors">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono text-emerald-300/90">{p.kind}</span>
        <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${statusStyle[p.status] || 'text-neutral-300 border-white/10'}`}>
          {p.status}
        </span>
      </div>

      <h3 className="mt-2 text-xl font-semibold text-white">{p.name}</h3>
      <p className="mt-1.5 text-sm text-neutral-300 leading-relaxed">{p.tagline}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {p.metrics.map((m) => (
          <div key={m.label} className="rounded-md bg-white/[0.03] border border-white/[0.06] px-2 py-2">
            <div className="text-sm sm:text-base font-semibold font-mono text-white">{m.value}</div>
            <div className="text-[11px] text-neutral-400 leading-snug">{m.label}</div>
          </div>
        ))}
      </div>

      <ul className="mt-4 space-y-2 flex-1">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm text-neutral-400 leading-relaxed">
            <span className="mt-2 w-1 h-1 shrink-0 rounded-full bg-emerald-400" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      {primary && (
        <div className="mt-5 flex items-center gap-3 text-sm">
          {p.links.github && (
            <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white">
              <Github className="w-4 h-4" /> Code
            </a>
          )}
          {p.links.demo && (
            <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white">
              Live <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24">
      <SectionHeader
        index="02"
        title="Projects"
        kicker="Production GenAI, distributed systems, and LLM quantization, each with numbers I can defend."
        accent="#34d399"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.06} className="h-full">
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-5 text-sm text-neutral-500">
        More on{' '}
        <a href={person.links.github} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white underline underline-offset-4">
          GitHub
        </a>
        . Code walkthroughs available on request.
      </Reveal>
    </section>
  );
}

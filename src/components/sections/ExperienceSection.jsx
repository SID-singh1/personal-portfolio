import React from 'react';
import { Building2 } from 'lucide-react';
import { experience } from '../../data/profile';
import { Reveal, SectionHeader, Tag, Metric } from '../ui';
import SectionBorderElectron from '../SectionBorderElectron';

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24">
      <SectionHeader
        index="01"
        title="Experience"
        kicker="Model compression for real phones, with honest real-world evaluation."
        accent="#38bdf8"
      />

      {experience.map((job) => (
        <Reveal key={job.id}>
          <article className="relative rounded-2xl border border-sky-500/25 bg-[#081019] p-5 sm:p-8">
            <SectionBorderElectron color="#38bdf8" rx={16} duration={16} />

            <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-10 h-10 shrink-0 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">{job.title}</h3>
                  <p className="text-sky-200">
                    {job.org} <span className="text-neutral-500">· {job.program}</span>
                  </p>
                </div>
              </div>
              <div className="text-sm font-mono text-neutral-400 sm:text-right shrink-0">
                <div>{job.period}</div>
                <div className="text-neutral-500">{job.location}</div>
              </div>
            </header>

            <p className="mt-5 text-neutral-300 leading-relaxed">{job.summary}</p>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              {job.metrics.map((m) => (
                <Metric key={m.label} {...m} />
              ))}
            </div>

            <ul className="mt-6 space-y-2.5">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm sm:text-[15px] text-neutral-300 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </section>
  );
}

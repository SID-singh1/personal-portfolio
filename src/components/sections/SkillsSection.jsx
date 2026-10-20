import React from 'react';
import { skillGroups } from '../../data/profile';
import { Reveal, SectionHeader } from '../ui';

const coreChip = 'text-sm text-neutral-100 px-2.5 py-1 rounded-md bg-violet-500/[0.08] border border-violet-400/25';
const familiarChip = 'text-sm text-neutral-400 px-2.5 py-1 rounded-md border border-dashed border-white/15';

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24">
      <SectionHeader
        index="03"
        title="Skills"
        kicker="From shipped work, coursework, GATE CS prep and a lot of self-study."
        accent="#a78bfa"
      />

      <Reveal className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-400">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-violet-500/30 border border-violet-400/40" /> Used in shipped work
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm border border-dashed border-white/30" /> Studied in depth
        </span>
      </Reveal>

      <div className="columns-1 md:columns-2 gap-4 [&>*]:mb-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 2) * 0.05} className="break-inside-avoid">
            <div className="rounded-xl border border-white/10 bg-[#0c0c0f] p-5">
              <h3 className="text-sm font-semibold text-violet-300">{g.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.core.map((s) => (
                  <span key={s} className={coreChip}>
                    {s}
                  </span>
                ))}
                {g.familiar.map((s) => (
                  <span key={s} className={familiarChip}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

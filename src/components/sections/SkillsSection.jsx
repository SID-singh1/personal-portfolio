import React from 'react';
import { skillGroups } from '../../data/profile';
import { Reveal, SectionHeader } from '../ui';

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24">
      <SectionHeader index="03" title="Skills" kicker="Only what my experience and projects above actually use." accent="#a78bfa" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 2) * 0.05}>
            <div className="h-full rounded-xl border border-white/10 bg-[#0c0c0f] p-5">
              <h3 className="text-sm font-semibold text-violet-300">{g.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="text-sm text-neutral-200 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
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

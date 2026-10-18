import React from 'react';
import { GraduationCap, Trophy, ArrowUpRight } from 'lucide-react';
import { education, achievements } from '../../data/profile';
import { Reveal, SectionHeader } from '../ui';

export default function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24">
      <SectionHeader index="04" title="Education & achievements" accent="#fbbf24" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Reveal className="lg:col-span-2">
          <div className="h-full rounded-xl border border-white/10 bg-[#0c0c0f] p-5 sm:p-6">
            <GraduationCap className="w-6 h-6 text-amber-300" />
            <h3 className="mt-3 text-lg font-semibold text-white">{education.degree}</h3>
            <p className="text-neutral-300">{education.school}</p>
            <div className="mt-4 flex items-center justify-between text-sm font-mono">
              <span className="text-neutral-400">{education.period}</span>
              <span className="text-amber-200 font-semibold">{education.grade}</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.05}>
          <ul className="h-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((a) => {
              const body = (
                <>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Trophy className="w-4 h-4 text-amber-300" /> {a.title}
                    {a.href && <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />}
                  </div>
                  <p className="mt-1 text-sm text-neutral-400">{a.detail}</p>
                </>
              );
              const cls = 'block h-full rounded-xl border border-white/10 bg-[#0c0c0f] p-4 transition-colors';
              return (
                <li key={a.title}>
                  {a.href ? (
                    <a href={a.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-amber-400/40`}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

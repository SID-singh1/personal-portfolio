import React from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle2, Trophy, Code2 } from 'lucide-react';
import ScrollCard from '../ScrollCard';
import SectionBorderElectron from '../SectionBorderElectron';

const educationData = [
  {
    institution: 'Vellore Institute of Technology (VIT)',
    campus: 'Vellore, Tamil Nadu',
    degree: 'B.Tech in Computer Science & Engineering',
    period: '2022 — 2026',
    scoreLabel: 'CGPA',
    score: '8.99 / 10.0',
    status: 'GRADUATED // CLASS OF 2026',
    badgeColor: 'cyan',
    highlights: [
      'Specialized in Distributed Systems, Core Algorithms, and Machine Intelligence architectures.',
      'Maintained consistent top-tier academic standing across 7 semesters with an 8.99 CGPA.',
      'Rigorous foundational coursework in Data Structures, OS Kernels, Computer Networks, and DBMS.',
    ],
  },
  {
    institution: 'Delhi Public School (DPS) Bangalore South',
    campus: 'Bengaluru, Karnataka',
    degree: 'Senior Secondary Education // Class XII (CBSE)',
    period: '2022',
    scoreLabel: 'CBSE SCORE',
    score: '94.0%',
    status: 'SCIENCE & MATHEMATICS',
    badgeColor: 'emerald',
    highlights: [
      'Graduated with distinction (94.0%) in Physics, Chemistry, Mathematics, and Computer Science.',
      'Strong mathematical foundation in linear algebra, calculus, and discrete problem-solving.',
    ],
  },
  {
    institution: 'Delhi Public School (DPS) Bangalore South',
    campus: 'Bengaluru, Karnataka',
    degree: 'Secondary School Examination // Class X (CBSE)',
    period: '2020',
    scoreLabel: 'CBSE SCORE',
    score: '92.0%',
    status: 'DISTINCTION',
    badgeColor: 'amber',
    highlights: [
      'Achieved 92.0% aggregate across core subjects.',
      'Early interest and foundational training in algorithmic logic and computational programming.',
    ],
  },
];

export default function EducationSection() {
  return (
    <div id="education" className="relative scroll-mt-24">
      {/* Oversized Faint Spatial Section Watermark */}
      <span className="absolute -top-10 -left-2 sm:-left-6 text-8xl sm:text-9xl font-black text-sky-400/[0.04] select-none pointer-events-none font-mono">
        05
      </span>

      {/* Distinct Atmospheric Ambient Wash (Academic Sapphire / Sky Blue) */}
      <div
        className="absolute -top-12 inset-x-0 h-96 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 0%, rgba(56, 189, 248, 0.14), rgba(99, 102, 241, 0.04) 55%, transparent 80%)',
        }}
      />

      {/* Section Header */}
      <ScrollCard exitThreshold={0.62} exitComplete={0.92} className="relative z-10 mb-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-sky-500/20">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase bg-sky-500/10 border border-sky-500/30 text-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.25)]">
              SECTION 05
            </span>
            <h3 className="text-xs sm:text-sm font-mono text-white/70 uppercase tracking-widest">
              ACADEMIC RECORD // VIT CSE & PEDIGREE
            </h3>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-sky-400/80 bg-sky-500/[0.06] px-2.5 py-0.5 rounded border border-sky-500/20">
            [INSTITUTIONAL FOUNDATION]
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
            Rigorous computer science foundation paired with elite execution.
          </h2>
          <p className="text-sm text-white/40 max-w-xl">
            A consistent record of academic excellence across premier institutions, backed by 680+ verified algorithmic solutions.
          </p>
        </div>
      </ScrollCard>

      {/* Algorithmic Distinction Banner */}
      <ScrollCard
        entranceThreshold={0.14}
        exitThreshold={0.72}
        exitComplete={0.95}
        yOffset={24}
        className="mb-8"
      >
        <div className="p-4 sm:p-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white/95 flex items-center space-x-2">
                <span>Algorithmic Mastery // LeetCode Knight (Rating 1837)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                  TOP 6% GLOBALLY
                </span>
              </div>
              <p className="text-xs text-white/45 font-light mt-0.5">
                Knight badge with 1837 contest rating and 680+ solved problems across dynamic programming, graph theory, and algorithmic complexity.
              </p>
            </div>
          </div>

          <a
            href="https://leetcode.com/u/_SID_SINGH"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs font-mono text-amber-300 hover:text-white px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all shrink-0 self-start sm:self-auto"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Verify LeetCode Profile</span>
          </a>
        </div>
      </ScrollCard>

      {/* Education Cards Stack */}
      <div className="space-y-6">
        {educationData.map((edu, idx) => (
          <ScrollCard
            key={idx}
            entranceThreshold={0.14}
            exitThreshold={0.72}
            exitComplete={0.95}
            yOffset={28}
          >
            <div className="group relative overflow-hidden p-6 sm:p-7 rounded-xl border border-sky-500/20 bg-[#080d18]/85 backdrop-blur-xl hover:border-sky-400/40 transition-all shadow-[0_0_30px_rgba(56,189,248,0.06)]">
              {/* Traveling Electron Perimeter Beam (Sapphire / Sky Blue) */}
              <SectionBorderElectron color="#60a5fa" rx={12} duration={14} />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-lg font-semibold text-white/95">{edu.institution}</h4>
                  </div>
                  <div className="text-sm text-cyan-300/90 font-medium">{edu.degree}</div>
                  <div className="text-xs font-mono text-white/40">{edu.campus} • {edu.period}</div>
                </div>

                {/* Score Pill / Distinction */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-1 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] shrink-0">
                  <span className="text-[10px] font-mono text-white/35 uppercase tracking-wider">
                    {edu.scoreLabel}
                  </span>
                  <span className="text-xl font-bold font-mono text-white/95 tracking-tight">
                    {edu.score}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/[0.08] px-2 py-0.5 rounded border border-emerald-500/20">
                    {edu.status}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 pt-4 border-t border-white/[0.04] text-xs sm:text-sm text-white/45 font-light">
                {edu.highlights.map((item, hIdx) => (
                  <li key={hIdx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/60 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollCard>
        ))}
      </div>
    </div>
  );
}

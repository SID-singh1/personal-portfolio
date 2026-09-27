import React from 'react';
import {
  Award,
  Trophy,
  Cloud,
  Users,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Code2,
  Terminal,
} from 'lucide-react';
import ScrollCard from '../ScrollCard';
import SectionBorderElectron from '../SectionBorderElectron';

export default function AchievementsSection() {
  return (
    <div id="honors" className="relative scroll-mt-24">
      {/* Distinct Atmospheric Ambient Wash (Amber / Violet Prestige Glow) */}
      <div
        className="absolute -top-12 inset-x-0 h-96 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 0%, rgba(245, 158, 11, 0.14), rgba(168, 85, 247, 0.04) 55%, transparent 80%)',
        }}
      />

      {/* Section Header */}
      <ScrollCard exitThreshold={0.62} exitComplete={0.92} className="relative z-10 mb-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest">
              06 // HONORS, CREDENTIALS & LEADERSHIP
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-400/70 bg-amber-500/[0.06] px-2.5 py-0.5 rounded border border-amber-500/20">
            [COMPETITIVE SIGNALS]
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white/90">
            Standardized excellence, certified cloud rigor, and community impact.
          </h2>
          <p className="text-sm text-white/40 max-w-2xl leading-relaxed">
            A unified record of competitive algorithmic benchmarks, cloud architecture credentials, and engineering leadership.
          </p>
        </div>
      </ScrollCard>

      {/* ── Grid of Honors, Certifications & Leadership ── */}
      <div className="relative z-10 space-y-6">
        {/* Top Pair: Competitive Rigor (GATE CS 2026 & VIT Top Coder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GATE CS 2026 */}
          <ScrollCard
            entranceThreshold={0.14}
            exitThreshold={0.72}
            exitComplete={0.95}
            yOffset={24}
          >
            <div className="group relative overflow-hidden h-full p-6 sm:p-7 rounded-xl border border-amber-500/20 bg-[#140e06]/85 backdrop-blur-xl hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-5 shadow-[0_0_30px_rgba(245,158,11,0.06)]">
              {/* Traveling Electron Perimeter Beam (Amber Gold) */}
              <SectionBorderElectron color="#f59e0b" rx={12} duration={14} />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 font-semibold tracking-wider">
                    AIR 3966 // SCORE 573
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    GATE CS 2026 Qualification
                  </h4>
                  <div className="text-xs font-mono text-amber-400/80 mt-0.5">
                    Graduate Aptitude Test in Engineering — Computer Science
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  Secured an <strong className="text-white font-medium">All India Rank of 3966</strong> with a score of <strong className="text-white font-medium">573</strong> in the highly competitive Computer Science discipline, demonstrating deep theoretical mastery across algorithms, operating systems, compiler design, computer architecture, and discrete mathematics.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.05] flex flex-wrap gap-2">
                <span className="text-[11px] font-mono text-white/40 px-2.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  Score: 573
                </span>
                <span className="text-[11px] font-mono text-white/40 px-2.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  National Percentile
                </span>
                <span className="text-[11px] font-mono text-white/40 px-2.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  Core CS Disciplines
                </span>
              </div>
            </div>
          </ScrollCard>

          {/* VIT Top Coder */}
          <ScrollCard
            entranceThreshold={0.14}
            exitThreshold={0.72}
            exitComplete={0.95}
            yOffset={24}
          >
            <div className="group relative overflow-hidden h-full p-6 sm:p-7 rounded-xl border border-cyan-500/20 bg-[#140e06]/85 backdrop-blur-xl hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-5 shadow-[0_0_30px_rgba(0,243,255,0.06)]">
              {/* Traveling Electron Perimeter Beam (Cyan) */}
              <SectionBorderElectron color="#00f3ff" rx={12} duration={14} />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 font-semibold tracking-wider">
                    TOP 200 / 10,000+ CODERS
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    VIT Top Coder Finalist
                  </h4>
                  <div className="text-xs font-mono text-cyan-400/80 mt-0.5">
                    Institution-Wide Competitive Coding Championship
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  Ranked in the <strong className="text-white font-medium">Top 200 out of 10,000+ final-year engineers</strong> across all VIT campuses (Vellore, Chennai, Bhopal, AP). Proven problem-solving under strict time constraints across dynamic programming, graph theory, combinatorics, and data structure design.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.05] flex flex-wrap gap-2">
                <span className="text-[11px] font-mono text-white/40 px-2.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  All-Campus Finals
                </span>
                <span className="text-[11px] font-mono text-white/40 px-2.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  Top 2% Standing
                </span>
                <span className="text-[11px] font-mono text-white/40 px-2.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  Speed & Precision
                </span>
              </div>
            </div>
          </ScrollCard>
        </div>

        {/* Cloud Certification Card (AWS Certified Cloud Practitioner) */}
        <ScrollCard
          entranceThreshold={0.14}
          exitThreshold={0.72}
          exitComplete={0.95}
          yOffset={24}
        >
          <div className="group relative overflow-hidden p-6 sm:p-7 rounded-xl border border-orange-500/20 bg-[#140e06]/85 backdrop-blur-xl hover:border-orange-400/50 transition-all shadow-[0_0_30px_rgba(249,115,22,0.06)]">
            {/* Traveling Electron Perimeter Beam (Orange / Gold) */}
            <SectionBorderElectron color="#f97316" rx={12} duration={14} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-lg bg-orange-500/10 border border-orange-500/25 flex items-center justify-center shrink-0">
                  <Cloud className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      AWS Certified Cloud Practitioner
                    </h4>
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-xs font-mono text-orange-400/80">
                    Amazon Web Services (AWS) // Industry Cloud Credential
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto shrink-0 font-medium">
                OFFICIALLY CERTIFIED
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light mb-4">
              Validated foundational expertise in cloud concepts, security compliance, architecture resilience, core services (EC2, S3, RDS, Lambda, VPC), IAM access policies, and distributed cloud economics.
            </p>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.04]">
              {['Cloud Architecture', 'AWS IAM & Security', 'EC2 & Compute', 'S3 & Storage', 'VPC Networking', 'High Availability'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono text-white/40 px-2.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </ScrollCard>

        {/* Engineering Leadership & Activities Card */}
        <ScrollCard
          entranceThreshold={0.14}
          exitThreshold={0.72}
          exitComplete={0.95}
          yOffset={24}
        >
          <div className="p-6 sm:p-7 rounded-xl border border-purple-500/20 bg-[#130a16]/85 backdrop-blur-xl hover:border-purple-400/50 transition-all shadow-[0_0_30px_rgba(168,85,247,0.06)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    Technical Leadership & Community Impact
                  </h4>
                  <div className="text-xs font-mono text-purple-400/80">
                    Event Organizing, Hackathon Participation & Full-Stack Development
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 self-start sm:self-auto shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+50% PARTICIPATION LIFT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-3.5 rounded-lg bg-white/[0.015] border border-white/[0.04]">
                <div className="text-xs font-semibold text-white/90 mb-1 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Technical Event & Session Director</span>
                </div>
                <p className="text-xs text-white/45 font-light leading-relaxed">
                  Conducted technical workshops and curated hands-on coding sessions, directly driving a <strong className="text-white/80 font-medium">50% increase in active attendee participation</strong> across community events.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white/[0.015] border border-white/[0.04]">
                <div className="text-xs font-semibold text-white/90 mb-1 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Hackathons & Web Engineering</span>
                </div>
                <p className="text-xs text-white/45 font-light leading-relaxed">
                  Organized and actively competed in collegiate and regional hackathons; designed and developed responsive web platforms and interactive user experiences from conception to deployment.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.04]">
              {['Tech Event Organizing', 'Hackathon Development', 'Web Platforms', 'Public Tech Sessions', 'Team Leadership'].map(
                (item) => (
                  <span
                    key={item}
                    className="text-[11px] font-mono text-white/40 px-2.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </ScrollCard>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Terminal,
  Github,
  Linkedin,
  Code2,
  ArrowUpRight,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react';
import ScrollCard from '../ScrollCard';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = 'siddhant3103@gmail.com';
  const phone = '+91-8747893867';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  return (
    <div id="contact" className="relative scroll-mt-24">
      {/* Oversized Faint Spatial Section Watermark */}
      <span className="absolute -top-10 -left-2 sm:-left-6 text-8xl sm:text-9xl font-black text-purple-400/[0.04] select-none pointer-events-none font-mono">
        07
      </span>

      {/* Section Header */}
      <ScrollCard exitThreshold={0.62} exitComplete={0.92} className="relative z-10 mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase bg-purple-500/10 border border-purple-500/30 text-purple-300 shadow-[0_0_14px_rgba(192,132,252,0.25)]">
              SECTION 07
            </span>
            <h3 className="text-xs sm:text-sm font-mono text-white/70 uppercase tracking-widest">
              DIRECT TRANSMISSION // CONTACT & CHANNELS
            </h3>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-purple-400/80 bg-purple-500/[0.06] px-2 py-0.5 rounded border border-purple-500/20">
            [OPEN PIPELINE]
          </span>
        </div>
      </ScrollCard>

      <ScrollCard entranceThreshold={0.14} exitThreshold={0.72} exitComplete={0.95} yOffset={28}>
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-xl p-8 sm:p-12 relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DIRECT CHANNELS MONITORED // BENGALURU, INDIA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white/95 leading-tight">
              Let's engineer systems that redefine performance.
            </h2>

            <p className="text-sm sm:text-base text-white/40 leading-relaxed font-light">
              Whether you are scaling distributed backends, building agentic AI workflows, or seeking an engineer with deep systems intuition and algorithmic speed, my channel is open.
            </p>

            {/* Direct Telemetry Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-white/40">
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded bg-white/[0.02] border border-white/[0.05]">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Bengaluru, Karnataka</span>
              </span>

              <span className="flex items-center space-x-1.5 px-3 py-1 rounded bg-white/[0.02] border border-white/[0.05]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Timezone: IST (UTC+5:30)</span>
              </span>
            </div>

            {/* Interactive Copy Terminal Array */}
            <div className="pt-2 space-y-3">
              {/* Email Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.02] font-mono text-sm text-white/85 grow">
                  <div className="flex items-center space-x-3">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>{email}</span>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="flex items-center space-x-1.5 text-xs text-white/40 hover:text-white transition-colors pl-4 cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-neutral-950 text-sm font-semibold rounded-lg hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.12)] shrink-0"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </a>
              </div>

              {/* Phone Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.02] font-mono text-sm text-white/85 grow">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{phone}</span>
                  </div>

                  <button
                    onClick={copyPhone}
                    className="flex items-center space-x-1.5 text-xs text-white/40 hover:text-white transition-colors pl-4 cursor-pointer"
                    title="Copy phone to clipboard"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] text-white text-sm font-semibold rounded-lg transition-colors shrink-0"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>

            {/* Social & Professional Nodes */}
            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-4 text-xs font-mono text-white/40">
              <a
                href="https://github.com/SID-singh1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-cyan-300 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB // SID-singh1</span>
                <ArrowUpRight className="w-3 h-3 text-white/20" />
              </a>

              <span className="text-white/10">•</span>

              <a
                href="https://www.linkedin.com/in/siddhant-singh-3283ab268/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-cyan-300 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LINKEDIN // siddhant-singh</span>
                <ArrowUpRight className="w-3 h-3 text-white/20" />
              </a>

              <span className="text-white/10">•</span>

              <a
                href="https://leetcode.com/u/_SID_SINGH"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-amber-300 text-amber-300/80 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>LEETCODE // KNIGHT (1837)</span>
                <ArrowUpRight className="w-3 h-3 text-amber-300/30" />
              </a>
            </div>
          </div>
        </div>
      </ScrollCard>
    </div>
  );
}

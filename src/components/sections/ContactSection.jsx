import React, { useState } from 'react';
import { Mail, Copy, Check, Terminal, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import ScrollCard from '../ScrollCard';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = 'siddhant@example.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div id="contact" className="scroll-mt-24">
      {/* Section Header */}
      <ScrollCard exitThreshold={0.62} exitComplete={0.92} className="mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest">
              05 // GET IN TOUCH
            </h3>
          </div>
          <span className="text-xs font-mono text-white/30">[OPEN CHANNEL]</span>
        </div>
      </ScrollCard>

      <ScrollCard entranceThreshold={0.14} exitThreshold={0.72} exitComplete={0.95} yOffset={28}>
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-xl p-8 sm:p-12 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white/95 leading-tight">
            Let's build systems that redefine the digital standard.
          </h2>

          <p className="text-sm sm:text-base text-white/40 leading-relaxed font-light">
            Whether you have an architectural challenge, a high-throughput graphics requirement,
            or are looking for senior technical leadership, my channel is open.
          </p>

          {/* Interactive Copy Terminal Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.02] font-mono text-sm text-white/80 grow">
              <div className="flex items-center space-x-3">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-white/90">{email}</span>
              </div>

              <button
                onClick={copyEmail}
                className="flex items-center space-x-1.5 text-xs text-white/40 hover:text-white transition-colors pl-4"
                title="Copy email to clipboard"
              >
                {copied ? (
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
              <span>Dispatch Message</span>
            </a>
          </div>

          {/* Social Network Array */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-4 text-xs font-mono text-white/40">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-cyan-300 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3 h-3 text-white/20" />
            </a>

            <span className="text-white/10">•</span>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-cyan-300 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3 h-3 text-white/20" />
            </a>

            <span className="text-white/10">•</span>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-cyan-300 transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>TWITTER / X</span>
              <ArrowUpRight className="w-3 h-3 text-white/20" />
            </a>
          </div>
        </div>
      </div>
    </ScrollCard>
  </div>
);
}

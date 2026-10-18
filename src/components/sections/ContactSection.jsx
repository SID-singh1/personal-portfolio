import React, { useState } from 'react';
import { Mail, Copy, Check, Download, Github, Linkedin, Code2 } from 'lucide-react';
import { person, resumes } from '../../data/profile';
import { Reveal, SectionHeader } from '../ui';
import { sendTelemetry } from '../../utils/telemetry';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <SectionHeader index="05" title="Let's talk" accent="#22d3ee" />
      <Reveal>
        <div className="rounded-2xl border border-white/10 bg-[#0c0c0f] p-6 sm:p-10">
          <p className="max-w-2xl text-lg sm:text-xl text-neutral-200 leading-relaxed">
            Looking for AI/ML, on-device ML, GenAI or backend roles. I can start within a week in Bengaluru, sooner if remote.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-neutral-950 text-sm font-semibold hover:bg-neutral-200 transition-colors"
            >
              <Mail className="w-4 h-4" /> {person.email}
            </a>
            <button
              onClick={copy}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/15 text-sm text-neutral-200 hover:border-white/30 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            {resumes.map((r) => (
              <a
                key={r.id}
                href={r.href}
                target="_blank"
                rel="noopener"
                onClick={() => sendTelemetry('RESUME_OPEN', { resume: r.id, from: 'contact' })}
                className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200"
              >
                <Download className="w-4 h-4" /> {r.label}
              </a>
            ))}
            <span className="hidden sm:inline text-neutral-700">|</span>
            <a href={person.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={person.links.leetcode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white">
              <Code2 className="w-4 h-4" /> LeetCode
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

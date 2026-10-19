import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Download, Mail, Check, Github, Linkedin, Code2, MapPin, ArrowUpRight } from 'lucide-react';
import { person, resumes, proofStats } from '../../data/profile';
import { sendTelemetry } from '../../utils/telemetry';
import DistillationNet from '../DistillationNet';

export default function HeroSection() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fade = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 },
  });

  return (
    <section id="hero" className="relative pt-14 sm:pt-20 pb-16 sm:pb-20">
      <motion.div
        className="hidden lg:block absolute right-0 top-20 w-[340px] pointer-events-none"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <DistillationNet />
      </motion.div>

      <motion.div {...fade(0)} className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {person.availability}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 text-neutral-400">
          <MapPin className="w-3 h-3" /> {person.location}
        </span>
      </motion.div>

      <motion.h1 {...fade(1)} className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
        {person.name}
      </motion.h1>

      <motion.p {...fade(2)} className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-cyan-300">
        {person.role}
      </motion.p>

      <motion.p {...fade(3)} className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed">
        {person.tagline} Ex-<span className="text-white font-medium">Samsung R&D</span> research intern,{' '}
        B.Tech CSE from <span className="text-white font-medium">VIT</span> (2026).
      </motion.p>

      {/* Primary actions: resumes first — that's what recruiters came for */}
      <motion.div {...fade(4)} className="mt-8 flex flex-wrap items-center gap-3">
        {resumes.map((r, i) => (
          <a
            key={r.id}
            href={r.href}
            target="_blank"
            rel="noopener"
            onClick={() => sendTelemetry('RESUME_OPEN', { resume: r.id })}
            className={
              i === 0
                ? 'group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-neutral-950 text-sm font-semibold hover:bg-neutral-200 transition-colors'
                : 'group inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-cyan-400/40 bg-cyan-400/[0.06] text-cyan-200 text-sm font-semibold hover:bg-cyan-400/[0.12] transition-colors'
            }
            title={r.hint}
          >
            <Download className="w-4 h-4" />
            {r.label}
          </a>
        ))}
        <button
          onClick={copyEmail}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-white/15 text-sm text-neutral-200 hover:border-white/30 hover:text-white transition-colors cursor-pointer"
          title="Copy email"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
          <span className={copied ? 'text-emerald-300' : ''}>{copied ? 'Email copied' : person.email}</span>
        </button>
      </motion.div>

      <motion.div {...fade(5)} className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        {[
          { href: person.links.github, label: 'GitHub', Icon: Github },
          { href: person.links.linkedin, label: 'LinkedIn', Icon: Linkedin },
          { href: person.links.leetcode, label: 'LeetCode', Icon: Code2 },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <Icon className="w-4 h-4" /> {label}
            <ArrowUpRight className="w-3 h-3 opacity-50" />
          </a>
        ))}
      </motion.div>

      {/* Proof strip: the four things to remember after a 10-second skim */}
      <motion.dl {...fade(6)} className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border border-white/10 bg-white/10">
        {proofStats.map((s) => (
          <div key={s.label} className="bg-[#0c0c0f] p-4 sm:p-5">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-lg sm:text-2xl font-semibold text-white tracking-tight font-mono">{s.value}</dd>
            <dd className="mt-1 text-xs sm:text-sm text-neutral-400">{s.label}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}

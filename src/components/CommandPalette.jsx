import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CornerDownLeft, Download, Mail, Github, Linkedin, Code2, Zap, Hash } from 'lucide-react';
import { person, resumes } from '../data/profile';
import { sendTelemetry } from '../utils/telemetry';

/** Ctrl/⌘+K (or "/") command palette: jump, download, copy, open, overclock. */
export default function CommandPalette({ open, onClose, onOverclock }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef(null);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const commands = useMemo(
    () => [
      ...['experience', 'projects', 'skills', 'education', 'contact'].map((id) => ({
        id: `go-${id}`,
        label: `Go to ${id[0].toUpperCase()}${id.slice(1)}`,
        group: 'Navigate',
        Icon: Hash,
        run: () => go(id),
      })),
      ...resumes.map((r) => ({
        id: `resume-${r.id}`,
        label: `Download ${r.label.replace('Resume · ', '')} resume`,
        hint: r.hint,
        group: 'Resume',
        Icon: Download,
        run: () => window.open(r.href, '_blank', 'noopener'),
      })),
      {
        id: 'copy-email',
        label: 'Copy email',
        hint: person.email,
        group: 'Contact',
        Icon: Mail,
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(person.email);
          setToast('Email copied');
        },
      },
      { id: 'github', label: 'Open GitHub', group: 'Contact', Icon: Github, run: () => window.open(person.links.github, '_blank', 'noopener') },
      { id: 'linkedin', label: 'Open LinkedIn', group: 'Contact', Icon: Linkedin, run: () => window.open(person.links.linkedin, '_blank', 'noopener') },
      { id: 'leetcode', label: 'Open LeetCode', group: 'Contact', Icon: Code2, run: () => window.open(person.links.leetcode, '_blank', 'noopener') },
      { id: 'overclock', label: 'Overclock the system', hint: '???', group: 'Experimental', Icon: Zap, run: () => onOverclock?.() },
    ],
    [onOverclock]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint || ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    setToast('');
    setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = (cmd) => {
    if (!cmd) return;
    sendTelemetry('COMMAND', { command: cmd.id });
    cmd.run();
    if (!cmd.keepOpen) onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="relative w-full max-w-lg rounded-xl border border-white/15 bg-[#111114] shadow-2xl overflow-hidden"
            initial={{ y: -8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center gap-3 px-4 border-b border-white/10">
              <Search className="w-4 h-4 text-neutral-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command…"
                className="w-full bg-transparent py-3.5 text-sm text-white placeholder:text-neutral-500 outline-none"
              />
              <kbd className="text-[10px] font-mono text-neutral-500 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            <ul className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-neutral-500">No matches</li>}
              {results.map((c, i) => {
                const header = c.group !== lastGroup;
                lastGroup = c.group;
                return (
                  <React.Fragment key={c.id}>
                    {header && (
                      <li className="px-4 pt-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500">{c.group}</li>
                    )}
                    <li>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onClick={() => run(c)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm cursor-pointer ${
                          i === active ? 'bg-white/[0.07] text-white' : 'text-neutral-300'
                        }`}
                      >
                        <c.Icon className={`w-4 h-4 ${c.id === 'overclock' ? 'text-amber-300' : 'text-neutral-400'}`} />
                        <span className="flex-1">{c.label}</span>
                        {c.hint && <span className="text-xs text-neutral-500 truncate max-w-[45%]">{c.hint}</span>}
                        {i === active && <CornerDownLeft className="w-3.5 h-3.5 text-neutral-500" />}
                      </button>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>

            <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span>↑↓ navigate · ↵ run</span>
              <AnimatePresence>
                {toast && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400">
                    {toast}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useEffect } from 'react';
import { person } from '../data/profile';
import { sendTelemetry } from './telemetry';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const AWAY_TITLES = ['👀 still here…', '⚡ model still compiling…', '🥲 come back'];

let greeted = false;

function isTyping(e) {
  const t = e.target;
  return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
}

/**
 * Small, ambient easter eggs for the Clean view:
 * - DevTools console greeting (for the engineers who inspect)
 * - Tab title reacts when you switch away
 * - Konami code → overclock
 * - Ctrl/⌘+K or "/" → command palette
 */
export default function useEasterEggs({ onOverclock, onOpenPalette }) {
  // Console greeting (once per page load)
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    const big = 'font: 700 16px/1.4 Inter, sans-serif; color: #22d3ee;';
    const body = 'font: 13px/1.6 "JetBrains Mono", monospace; color: #a3a3a3;';
    console.log(
      `%cHey, fellow engineer 👋%c\n\nYou opened DevTools on a portfolio, so we'd probably get along.\n` +
        `→ ${person.email}\n→ Press Ctrl/⌘+K for shortcuts.\n→ Some say the Konami code still works here.`,
      big,
      body
    );
  }, []);

  // Tab title when away
  useEffect(() => {
    const original = document.title;
    let i = 0;
    const onVis = () => {
      if (document.hidden) {
        document.title = AWAY_TITLES[i++ % AWAY_TITLES.length];
      } else {
        document.title = original;
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      document.title = original;
    };
  }, []);

  // Keyboard: Konami + palette
  useEffect(() => {
    let seq = [];
    const onKey = (e) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenPalette?.();
        return;
      }
      if (isTyping(e)) return;
      if (e.key === '/') {
        e.preventDefault();
        onOpenPalette?.();
        return;
      }
      seq = [...seq, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (seq.join(',') === KONAMI.join(',')) {
        seq = [];
        sendTelemetry('EGG_FOUND', { egg: 'konami' });
        onOverclock?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOverclock, onOpenPalette]);
}

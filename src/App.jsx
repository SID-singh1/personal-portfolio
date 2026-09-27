import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Check, X, Sparkles } from 'lucide-react';
import CleanPortfolio from './components/CleanPortfolio';
import OverclockSequence from './components/OverclockSequence';
import ShutdownTransition from './components/ShutdownTransition';
import { incrementVisitCount, sendTelemetry } from './utils/telemetry';

/**
 * App Component — Dual-State Architecture with URL Hash Routing (#ultra)
 *
 * Default: CleanPortfolio — hyper-clean, minimalist Vercel/Linear-style dark portfolio.
 *          Features a "temptation trigger" widget in the bottom-right corner.
 *
 * Overclocked: OverclockSequence — the full gamified cinematic sequence
 *              (Cold Boot → Flashlight → Ignition → Circuit Surge → Glitch → Reveal).
 *
 * Transition: Rogue AI Matrix Skull glitch → 4-sided diamond CRT collapse → 2s void → Cold Boot.
 *
 * URL Routing: Native `#ultra` hash support so refreshing reloads cleanly into Cold Boot,
 *              and browser Back button / ESC returns to CleanPortfolio smoothly.
 */
export default function App() {
  const [isOverclocked, setIsOverclocked] = useState(() => {
    return typeof window !== 'undefined' && window.location.hash === '#ultra';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFeedbackToast, setShowFeedbackToast] = useState(false);
  const [feedbackVote, setFeedbackVote] = useState(null); // 'up' | 'down' | null

  // Initialize visit tracking & URL hash listener
  useEffect(() => {
    const isUltra = window.location.hash === '#ultra';
    const visitCount = incrementVisitCount();
    sendTelemetry('VISIT', {
      mode: isUltra ? 'ultra' : 'clean',
      visitCount,
    });

    const handleHashChange = () => {
      const isNowUltra = window.location.hash === '#ultra';
      if (isNowUltra) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        setIsOverclocked(true);
      } else {
        setIsOverclocked(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Triggered by the Temptation Widget in CleanPortfolio
  const handleOverclock = useCallback(() => {
    setShowFeedbackToast(false);
    // Play the 4-phase cinematic shutdown transition (Matrix Skull -> Diamond -> Void -> Cold Boot)
    setIsTransitioning(true);
  }, []);

  // Called when the 3.2s shutdown transition finishes (void ends)
  const handleTransitionComplete = useCallback(() => {
    window.location.hash = '#ultra';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsTransitioning(false);
    setIsOverclocked(true);
    sendTelemetry('ULTRA_ENTER', { trigger: 'Temptation Button' });
  }, []);

  // Triggered by any "RETURN TO NORMAL" button or ESC key in OverclockSequence
  const handleReturnToStable = useCallback(() => {
    window.location.hash = '';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsOverclocked(false);
    setShowFeedbackToast(true);
    setFeedbackVote(null);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen bg-[#09090b]">
      {/* Dynamic Viewport: CleanPortfolio or OverclockSequence */}
      {!isOverclocked && (
        <CleanPortfolio onOverclock={handleOverclock} />
      )}

      {isOverclocked && (
        <OverclockSequence onReturnToStable={handleReturnToStable} />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          CINEMATIC SHUTDOWN TRANSITION (Matrix Skull + Diamond Collapse + 2s Void)
          ═══════════════════════════════════════════════════════════════ */}
      {isTransitioning && (
        <ShutdownTransition onComplete={handleTransitionComplete} />
      )}


      {/* ═══════════════════════════════════════════════════════════════
          POST-OVERCLOCK TELEMETRY FEEDBACK HUD (Thumbs Up / Down)
          ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showFeedbackToast && !isOverclocked && (
          <motion.div
            className="fixed bottom-6 left-6 z-50 max-w-sm"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="p-4 rounded-xl border border-cyan-500/35 bg-[#0c0c0e]/95 backdrop-blur-xl shadow-[0_0_35px_rgba(0,243,255,0.22)] text-white space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                    SYS::OVERCLOCK TRANSITION
                  </span>
                </div>
                <button
                  onClick={() => setShowFeedbackToast(false)}
                  className="text-white/40 hover:text-white text-xs font-mono p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                  title="Dismiss Feedback"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {!feedbackVote ? (
                <>
                  <p className="text-xs text-white/70 font-mono leading-relaxed">
                    System de-overclocked to stable canvas. How was the cinematic overclock experience?
                  </p>

                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={() => {
                        setFeedbackVote('up');
                        sendTelemetry('FEEDBACK', { rating: 'SICK (👍)' });
                        setTimeout(() => setShowFeedbackToast(false), 3600);
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/35 hover:border-emerald-400 text-emerald-300 text-xs font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.15)] active:scale-95"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>SICK (👍)</span>
                    </button>

                    <button
                      onClick={() => {
                        setFeedbackVote('down');
                        sendTelemetry('FEEDBACK', { rating: 'MEH (👎)' });
                        setTimeout(() => setShowFeedbackToast(false), 3600);
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/35 hover:border-amber-400 text-amber-300 text-xs font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.15)] active:scale-95"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>MEH (👎)</span>
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  className="py-1 text-xs font-mono space-y-1"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-1.5 text-cyan-300 font-semibold">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>TELEMETRY LOGGED</span>
                  </div>
                  <p className="text-[11px] text-white/60 font-light">
                    {feedbackVote === 'up'
                      ? 'Peak 120 FPS confirmed. Overclock rating recorded to telemetry logs // Thank you!'
                      : 'Underclock noted. Diagnostic logs captured for optimization.'}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

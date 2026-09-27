import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap, ArrowLeft, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';
import FlashlightOverlay from './FlashlightOverlay';
import NeonButton from './NeonButton';
import CpuChip from './CpuChip';
import CircuitTraces from './CircuitTraces';
import GlitchOverlay from './GlitchOverlay';
import PortfolioContent from './PortfolioContent';
import CustomCursor from './CustomCursor';

/**
 * OverclockSequence Component
 * The full gamified cinematic sequence extracted from the original App.
 * Finite State Machine with Cold Boot Optics Mechanic:
 * 1. 'FLASHLIGHT':
 *    - Cold Boot (opticsEnabled = false): High-tech diagnostic HUD, click or press [F] to ignite optics.
 *    - Optics Online (opticsEnabled = true via [F] or click): 150px spotlight, revolving reticle, stealth neon button.
 * 2. 'IGNITION': Flashlight disabled, button transforms into glowing CPU chip.
 * 3. 'CIRCUIT_SURGE': 20 strict 90°/45° PCB traces shoot outward across boundaries over ~2.4s.
 * 4. 'GLITCH': CRT screen-tear glitch followed by blinding white flash.
 * 5. 'REVEALED': Overclocked portfolio revealed with return-to-stable mechanism.
 *
 * @param {Function} onReturnToStable - Callback to switch back to CleanPortfolio (isOverclocked = false).
 */
export default function OverclockSequence({ onReturnToStable }) {
  const [currentState, setCurrentState] = useState('FLASHLIGHT');
  const [opticsEnabled, setOpticsEnabled] = useState(false);
  const [bootFlicker, setBootFlicker] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: -999, y: -999 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Scroll to top instantly on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Toggle system optics ON and OFF
  const toggleOptics = useCallback(() => {
    setOpticsEnabled((prev) => {
      const next = !prev;
      if (next) {
        setBootFlicker(true);
        setTimeout(() => setBootFlicker(false), 280);
      }
      return next;
    });
  }, []);

  // Keydown listener for toggling optics with 'F' key, and 'Escape' to abort back to stable
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onReturnToStable?.();
        return;
      }

      if (currentState === 'FLASHLIGHT') {
        if (e.key === 'f' || e.key === 'F') {
          toggleOptics();
        } else if (!opticsEnabled && e.key === ' ') {
          toggleOptics();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentState, opticsEnabled, toggleOptics, onReturnToStable]);


  // Handle pointer tracking
  const handlePointerMove = useCallback((e) => {
    setPointerPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePointerDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  // State 1 -> State 2
  const handleInitialize = useCallback(() => {
    setIsHoveringButton(false);
    setCurrentState('IGNITION');
  }, []);

  // State 2 -> State 3
  useEffect(() => {
    if (currentState === 'IGNITION') {
      const surgeTimer = setTimeout(() => {
        setCurrentState('CIRCUIT_SURGE');
      }, 350);
      return () => clearTimeout(surgeTimer);
    }
  }, [currentState]);

  // State 3 -> State 4
  const handleCircuitComplete = useCallback(() => {
    setCurrentState('GLITCH');
  }, []);

  // State 4 -> State 5
  const handleGlitchComplete = useCallback(() => {
    setCurrentState('REVEALED');
  }, []);

  // State 5 -> Return to stable (exits the overclock sequence entirely)
  const handleReset = useCallback(() => {
    if (onReturnToStable) {
      onReturnToStable();
    }
  }, [onReturnToStable]);

  const isFlashlightActive = currentState === 'FLASHLIGHT';
  const showCpu = currentState === 'IGNITION' || currentState === 'CIRCUIT_SURGE';
  const showCircuit = currentState === 'CIRCUIT_SURGE';
  const showGlitch = currentState === 'GLITCH';
  const isRevealed = currentState === 'REVEALED';  const isCursorSuppressed = opticsEnabled || showCpu || showCircuit || showGlitch || isRevealed;

  return (
    <motion.div
      id="overclock-sequence-wrapper"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`fixed inset-0 w-screen h-screen overflow-hidden bg-black select-none z-[70] ${
        isCursorSuppressed ? 'cursor-none' : 'cursor-auto'
      }`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background PCB Grid */}
      <div className="absolute inset-0 pcb-grid-bg opacity-30 pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════════════
          FLOATING PERSISTENT TOP CONTROL: RETURN TO STABLE CANVAS
          Always available in all states so the user can never get trapped
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed top-5 right-6 z-[95] pointer-events-auto">
        <button
          onClick={onReturnToStable}
          className="group flex items-center space-x-2.5 px-4 py-2 rounded-full bg-neutral-950/90 hover:bg-neutral-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-xs backdrop-blur-md transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] cursor-pointer active:scale-95"
          title="Return to Normal Portfolio (Esc)"
        >

          <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-semibold tracking-wider uppercase text-[11px]">
            RETURN TO NORMAL
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/60 font-bold hidden sm:inline-block">
            ESC
          </span>
        </button>
      </div>

      {/* State 1: Flashlight Spotlight Overlay & Stealth Neon Button */}
      {isFlashlightActive && (
        <>
          <FlashlightOverlay
            pointerPos={pointerPos}
            active={true}
            opticsEnabled={opticsEnabled}
          />
          <NeonButton
            flashlightPos={pointerPos}
            onInitialize={handleInitialize}
            isRevealedState={false}
            onHoverChange={setIsHoveringButton}
            opticsEnabled={opticsEnabled}
          />

          {/* ═════════════════════════════════════════════════════════════
              COLD BOOT STEALTH HUD (When Optics are Offline)
              Authentic pitch-black hacker boot with rhythmic blinking prompt
              Clicking anywhere or pressing [F] toggles system optics!
              ═════════════════════════════════════════════════════════════ */}
          {!opticsEnabled && (
            <div
              onClick={toggleOptics}
              className="fixed inset-0 z-[80] flex flex-col items-center justify-end pb-12 sm:pb-16 cursor-pointer select-none pointer-events-auto"
            >
              <motion.div
                className="flex items-center space-x-2.5 px-5 py-2.5 rounded-full border border-cyan-500/50 bg-cyan-950/80 backdrop-blur-md text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase drop-shadow-[0_0_18px_rgba(0,243,255,0.6)]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0.35, 1, 0.35], y: 0 }}
                transition={{
                  opacity: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
                  y: { duration: 0.25 },
                }}
              >
                <span className="text-cyan-300 font-bold animate-ping">●</span>
                <span>SYSTEM OPTICS OFFLINE // PRESS</span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded border border-cyan-400 bg-cyan-900 text-cyan-200 font-bold shadow-[0_0_12px_rgba(0,243,255,0.7)] text-xs">
                  F
                </span>
                <span className="hidden sm:inline-block">OR CLICK ANYWHERE TO ENGAGE</span>
                <span className="sm:hidden">OR TAP TO ENGAGE</span>
              </motion.div>
            </div>
          )}

          {/* Discreet HUD Status when optics are active */}
          {opticsEnabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="fixed inset-x-0 bottom-6 z-[60] flex items-center justify-center pointer-events-none select-none text-[11px] font-mono text-cyan-400 uppercase tracking-widest"
            >
              <span className="px-3 py-1 rounded bg-black/80 border border-cyan-500/30">
                OPTICS ENGAGED // PRESS [ F ] TO POWER DOWN
              </span>
            </motion.div>
          )}

          {/* Hardware Boot Static / Phosphor Screen Flicker */}
          {bootFlicker && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-[85] bg-cyan-400/25 mix-blend-screen crt-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.15, 0.7, 0] }}
              transition={{ duration: 0.28, ease: 'linear' }}
            />
          )}
        </>
      )}

      {/* State 2 & 3: Central CPU Chip */}
      {showCpu && <CpuChip />}

      {/* State 3: Circuit Surge Traces */}
      {showCircuit && <CircuitTraces onComplete={handleCircuitComplete} />}

      {/* State 4: Glitch & Reveal Overlay */}
      {showGlitch && <GlitchOverlay onGlitchComplete={handleGlitchComplete} />}

      {/* State 5: Revealed Portfolio Content */}
      <AnimatePresence>
        {isRevealed && (
          <PortfolioContent
            onReset={handleReset}
            onReplaySequence={() => {
              setOpticsEnabled(true);
              setCurrentState('FLASHLIGHT');
            }}
          />
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════
          FUTURISTIC CUSTOM RETICLE WITH REVOLVING DOT
          Active ONLY when optics are engaged or revealed.
          When optics are offline, user has the standard normal mouse!
          ═══════════════════════════════════════════════════════════════════ */}
      {(opticsEnabled || isRevealed) && (
        <CustomCursor
          mode="ultra"
          pointerPos={pointerPos}
          isHoveringTarget={isHoveringButton}
          isClicking={isClicking}
        />
      )}
    </motion.div>
  );
}

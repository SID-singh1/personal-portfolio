import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
 *    - Cold Boot (opticsEnabled = false): Pitch black, standard OS cursor, blinking prompt.
 *    - Optics Online (opticsEnabled = true via [F]): 150px spotlight, custom reticle, stealth neon button.
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

  // Keydown listener for toggling optics with 'F' key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentState === 'FLASHLIGHT') {
        if (e.key === 'f' || e.key === 'F') {
          setOpticsEnabled((prev) => {
            const nextState = !prev;
            if (nextState) {
              setBootFlicker(true);
              setTimeout(() => setBootFlicker(false), 280);
            }
            return nextState;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentState]);

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
  const isRevealed = currentState === 'REVEALED';
  const isCursorHidden = (isFlashlightActive && opticsEnabled) || showCpu || showGlitch;

  return (
    <motion.div
      id="overclock-sequence-wrapper"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`fixed inset-0 w-screen h-screen overflow-hidden bg-black select-none z-40 ${
        isCursorHidden ? 'cursor-none' : 'cursor-auto'
      }`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background PCB Grid */}
      <div className="absolute inset-0 pcb-grid-bg opacity-30 pointer-events-none" />

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

          {/* Cold Boot UI: Blinking text prompt when optics are offline */}
          {!opticsEnabled && (
            <motion.div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex items-center space-x-2 text-xs md:text-sm font-mono tracking-widest text-cyan-400/70 uppercase select-none drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0.25, 0.9, 0.25], y: 0 }}
              transition={{ opacity: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' } }}
            >
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span>SYSTEM OPTICS OFFLINE // PRESS</span>
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded border border-cyan-400/60 bg-cyan-950/60 text-cyan-300 font-bold shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                F
              </span>
              <span>TO ENGAGE</span>
            </motion.div>
          )}

          {/* Hardware Boot Static / Phosphor Screen Flicker */}
          {bootFlicker && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-50 bg-cyan-400/25 mix-blend-screen crt-overlay"
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
          <PortfolioContent onReset={handleReset} />
        )}
      </AnimatePresence>

      {/* Futuristic Custom Reticle */}
      {!isRevealed && opticsEnabled && (
        <CustomCursor
          pointerPos={pointerPos}
          isHoveringTarget={isHoveringButton}
          isClicking={isClicking}
        />
      )}
    </motion.div>
  );
}

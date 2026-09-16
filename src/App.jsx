import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FlashlightOverlay from './components/FlashlightOverlay';
import NeonButton from './components/NeonButton';
import CpuChip from './components/CpuChip';
import CircuitTraces from './components/CircuitTraces';
import GlitchOverlay from './components/GlitchOverlay';
import PortfolioContent from './components/PortfolioContent';
import CustomCursor from './components/CustomCursor';

/**
 * App Component
 * Finite State Machine:
 * 1. 'FLASHLIGHT': Pitch black, 150px cursor spotlight, stealth centered neon button,
 *                  artistic custom targeting reticle (no default pointed hand).
 * 2. 'IGNITION': Flashlight disabled, button transforms into glowing CPU chip.
 * 3. 'CIRCUIT_SURGE': Strict 90°/45° PCB traces shoot outward across boundaries.
 * 4. 'GLITCH': CRT screen-tear glitch followed by blinding white flash.
 * 5. 'REVEALED': Main portfolio landing content revealed with replay mechanism.
 */
export default function App() {
  const [currentState, setCurrentState] = useState('FLASHLIGHT');
  const [pointerPos, setPointerPos] = useState({ x: -999, y: -999 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Handle pointer tracking for smooth spotlight and reticle
  const handlePointerMove = useCallback((e) => {
    setPointerPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePointerDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  // State 1 -> State 2: Ignition triggered on button click
  const handleInitialize = useCallback(() => {
    setIsHoveringButton(false);
    setCurrentState('IGNITION');
  }, []);

  // Choreograph State 2 -> State 3 (Circuit Surge immediately follows CPU appearance)
  useEffect(() => {
    if (currentState === 'IGNITION') {
      const surgeTimer = setTimeout(() => {
        setCurrentState('CIRCUIT_SURGE');
      }, 350);
      return () => clearTimeout(surgeTimer);
    }
  }, [currentState]);

  // State 3 -> State 4: Traces hit the viewport edges
  const handleCircuitComplete = useCallback(() => {
    setCurrentState('GLITCH');
  }, []);

  // State 4 -> State 5: Glitch and white flash complete
  const handleGlitchComplete = useCallback(() => {
    setCurrentState('REVEALED');
  }, []);

  // State 5 -> State 1: Re-initialize reset replay mechanism
  const handleReset = useCallback(() => {
    setPointerPos({ x: -999, y: -999 });
    setIsHoveringButton(false);
    setCurrentState('FLASHLIGHT');
  }, []);

  const isFlashlightActive = currentState === 'FLASHLIGHT';
  const showCpu = currentState === 'IGNITION' || currentState === 'CIRCUIT_SURGE';
  const showCircuit = currentState === 'CIRCUIT_SURGE';
  const showGlitch = currentState === 'GLITCH';
  const isRevealed = currentState === 'REVEALED';

  return (
    <div
      id="system-main-wrapper"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`relative w-screen h-screen overflow-hidden bg-black select-none ${
        currentState !== 'REVEALED' ? 'cursor-none' : 'cursor-auto'
      }`}
    >
      {/* Background PCB Grid (Revealed under flashlight or visible in later states) */}
      <div className="absolute inset-0 pcb-grid-bg opacity-30 pointer-events-none" />

      {/* State 1: Flashlight Spotlight Overlay & Stealth Neon Button */}
      {isFlashlightActive && (
        <>
          <FlashlightOverlay pointerPos={pointerPos} active={true} />
          <NeonButton
            flashlightPos={pointerPos}
            onInitialize={handleInitialize}
            isRevealedState={false}
            onHoverChange={setIsHoveringButton}
          />
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

      {/* Futuristic Custom Reticle (Active during intro states - completely replaces OS pointed hand) */}
      {!isRevealed && (
        <CustomCursor
          pointerPos={pointerPos}
          isHoveringTarget={isHoveringButton}
          isClicking={isClicking}
        />
      )}
    </div>
  );
}

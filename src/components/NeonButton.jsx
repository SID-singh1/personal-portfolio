import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * NeonButton
 * Centered in the screen.
 * Strictly respects flashlight stealth: opacity is calculated via Euclidean distance
 * from the flashlight position (x,y) to the button center (bx, by).
 * Replaces default pointed hand with artistic target-lock state.
 */
export default function NeonButton({ flashlightPos, onInitialize, isRevealedState, onHoverChange }) {
  // Center coordinates (screen center)
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const bx = windowWidth / 2;
  const by = windowHeight / 2;

  // Calculate Euclidean distance to the flashlight
  const opacity = useMemo(() => {
    if (isRevealedState) return 1;
    if (!flashlightPos || flashlightPos.x === undefined || flashlightPos.y === undefined) {
      return 0; // Pitch dark initially before pointer moves
    }
    const dx = flashlightPos.x - bx;
    const dy = flashlightPos.y - by;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Flashlight radius is ~150px.
    const maxRadius = 155;
    const minRadius = 40;

    if (distance >= maxRadius) return 0;
    if (distance <= minRadius) return 1;
    return Math.max(0, Math.min(1, (maxRadius - distance) / (maxRadius - minRadius)));
  }, [flashlightPos, bx, by, isRevealedState]);

  const isClickable = opacity > 0.35;

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
      style={{
        opacity: opacity,
        transition: 'opacity 0.08s ease-out',
      }}
    >
      <motion.button
        id="initialize-system-button"
        onClick={isClickable ? onInitialize : undefined}
        onMouseEnter={() => isClickable && onHoverChange && onHoverChange(true)}
        onMouseLeave={() => onHoverChange && onHoverChange(false)}
        className={`relative group px-8 py-4 bg-black/80 backdrop-blur-md rounded-sm border-2 border-cyan-400 
          font-mono tracking-widest text-cyan-300 uppercase font-semibold text-sm md:text-base
          shadow-[0_0_25px_rgba(0,243,255,0.6),inset_0_0_15px_rgba(0,243,255,0.3)]
          transition-all duration-300 select-none cursor-none
          ${isClickable ? 'pointer-events-auto hover:bg-cyan-950/40 hover:text-white hover:shadow-[0_0_35px_rgba(0,243,255,0.9),inset_0_0_25px_rgba(0,243,255,0.5)] active:scale-95' : 'pointer-events-none'}`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        whileHover={isClickable ? { scale: 1.05 } : {}}
      >
        {/* Cyberpunk corner brackets */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-300 pointer-events-none" />
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-300 pointer-events-none" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-300 pointer-events-none" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-300 pointer-events-none" />

        {/* Pulsing inner status diode */}
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 mr-3 shadow-[0_0_8px_#00f3ff] animate-ping pointer-events-none" />
        
        {/* Button label */}
        <span className="relative z-10 text-cyan-200 group-hover:text-cyan-100 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] pointer-events-none">
          INITIALIZE SYSTEM
        </span>

        {/* Ambient background glow sweep on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      </motion.button>
    </div>
  );
}

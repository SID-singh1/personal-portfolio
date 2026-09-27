import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ShutdownTransition Component
 * Authentic 5-Stage Progressive Cyber Glitch & Vintage Curved-Diamond CRT TV Collapse:
 *
 * Stage 1 (0.0s - 1.0s): Faint matrix glitch + subtle toxic green skull on the LEFT
 * Stage 2 (1.0s - 2.0s): Escalating glitch + sharper toxic green skull on the RIGHT
 * Stage 3 (2.0s - 3.1s): Violent full-viewport shake + dominant CENTER skull (100% green phosphor glow)
 * Stage 4 (3.1s - 3.8s): Vintage CRT TV collapse — curved diamond fold -> horizontal laser slit -> center spark -> blackout
 * Stage 5 (3.8s - 5.2s): Dead silent suspenseful void (1.4s blackout before cold boot awakens)
 */
export default function ShutdownTransition({ onComplete }) {
  // Glitch progressive step: 1 (left faint), 2 (right medium), 3 (center violent climax)
  const [glitchStep, setGlitchStep] = useState(1);
  const [phase, setPhase] = useState('GLITCH'); // 'GLITCH' | 'CRT_COLLAPSE' | 'VOID'

  useEffect(() => {
    // Step 1 -> Step 2 at 1.0s (Skull moves to Right, glitch intensifies)
    const tStep2 = setTimeout(() => {
      setGlitchStep(2);
    }, 1000);

    // Step 2 -> Step 3 at 2.0s (Master Skull in Center, violent screen shake)
    const tStep3 = setTimeout(() => {
      setGlitchStep(3);
    }, 2000);

    // Step 3 -> CRT Collapse at 3.1s (Curved diamond screen fold)
    const tCollapse = setTimeout(() => {
      setPhase('CRT_COLLAPSE');
    }, 3100);

    // CRT Collapse -> Suspenseful Void at 3.8s
    const tVoid = setTimeout(() => {
      setPhase('VOID');
    }, 3800);

    // Suspenseful Void -> Complete at 5.2s
    const tEnd = setTimeout(() => {
      onComplete?.();
    }, 5200);

    return () => {
      clearTimeout(tStep2);
      clearTimeout(tStep3);
      clearTimeout(tCollapse);
      clearTimeout(tVoid);
      clearTimeout(tEnd);
    };
  }, [onComplete]);

  // Reusable Green Matrix Skull SVG Component
  const CyberSkull = ({ size = 130, opacity = 1, glowIntensity = 15 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        opacity,
        filter: `drop-shadow(0 0 ${glowIntensity}px #00ff66) drop-shadow(0 0 ${glowIntensity * 2}px rgba(0,255,102,0.4))`,
      }}
      className="transition-all duration-300"
    >
      {/* Outer Cranium */}
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 15.65 3.96 18.84 6.89 20.61L7 22H17L17.11 20.61C20.04 18.84 22 15.65 22 12C22 6.48 17.52 2 12 2Z"
        fill="#020804"
        stroke="#00ff66"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Cybernetic Eye Sockets with Glowing Green Pupils */}
      <path
        d="M6.5 11C6.5 9.62 7.62 8.5 9 8.5C10.38 8.5 11.5 9.62 11.5 11C11.5 12.38 10.38 13.5 9 13.5C7.62 13.5 6.5 12.38 6.5 11Z"
        fill="#00ff66"
      />
      <circle cx="9" cy="11" r="1.5" fill="#ffffff" />

      <path
        d="M12.5 11C12.5 9.62 13.62 8.5 15 8.5C16.38 8.5 17.5 9.62 17.5 11C17.5 12.38 16.38 13.5 15 13.5C13.62 13.5 12.5 12.38 12.5 11Z"
        fill="#00ff66"
      />
      <circle cx="15" cy="11" r="1.5" fill="#ffffff" />

      {/* Inverted Triangular Nasal Cavity */}
      <polygon points="12,14 10.5,17 13.5,17" fill="#00ff66" />

      {/* Cyber Mandible Teeth Grate */}
      <path
        d="M8 19V21M10.5 19V21M13.5 19V21M16 19V21"
        stroke="#00ff66"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Cross Temple Circuit Traces */}
      <line x1="4.5" y1="8" x2="6.5" y2="8" stroke="#00ff66" strokeWidth="1" strokeDasharray="1 1" />
      <line x1="17.5" y1="8" x2="19.5" y2="8" stroke="#00ff66" strokeWidth="1" strokeDasharray="1 1" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden bg-black font-mono">
      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 1: PROGRESSIVE 3-SECOND GLITCH (GREEN & BLACK MATRIX)
          ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'GLITCH' && (
        <motion.div
          className="relative w-full h-full flex items-center justify-center bg-black"
          // Violent camera shake escalates at Step 3
          animate={
            glitchStep === 3
              ? {
                  x: [0, -18, 22, -14, 18, -10, 14, -8, 0],
                  y: [0, 14, -18, 12, -14, 8, -10, 6, 0],
                }
              : glitchStep === 2
              ? {
                  x: [0, -6, 8, -5, 7, 0],
                  y: [0, 4, -6, 5, -3, 0],
                }
              : {
                  x: [0, -2, 3, -1, 0],
                  y: [0, 1, -2, 2, 0],
                }
          }
          transition={{
            repeat: Infinity,
            duration: glitchStep === 3 ? 0.12 : glitchStep === 2 ? 0.22 : 0.4,
            ease: 'linear',
          }}
        >
          {/* CRT Phosphor Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none crt-overlay opacity-60 z-30" />

          {/* Screen Tear Glitch Slices */}
          <div
            className={`absolute inset-0 pointer-events-none z-20 ${
              glitchStep === 3
                ? 'animate-screen-tear opacity-95'
                : glitchStep === 2
                ? 'animate-screen-tear opacity-50'
                : 'opacity-20'
            }`}
          />

          {/* Matrix Terminal Code Rain in Toxic Green */}
          <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden flex justify-around text-xs text-[#00ff66] select-none z-10">
            {Array.from({ length: 22 }).map((_, i) => (
              <motion.div
                key={i}
                className="writing-mode-vertical"
                initial={{ y: -120 }}
                animate={{ y: [0, 950] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2 + (i % 6) * 0.2,
                  ease: 'linear',
                  delay: (i % 8) * 0.12,
                }}
              >
                010011110101011001000101010100100100001101001100010011110100001101001011
              </motion.div>
            ))}
          </div>

          {/* ── Progressive Step 1 (0s - 1s): Faint Skull on the LEFT ── */}
          {glitchStep === 1 && (
            <motion.div
              className="absolute left-[15%] sm:left-[22%] flex flex-col items-center space-y-3 z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.35, scale: 0.95, x: [-2, 3, -2], y: [1, -2, 1] }}
              transition={{ repeat: Infinity, duration: 0.25 }}
            >
              <CyberSkull size={110} opacity={0.4} glowIntensity={10} />
              <div className="px-2.5 py-0.5 rounded bg-black/80 border border-[#00ff66]/30 text-[9px] text-[#00ff66]/70 tracking-widest uppercase">
                [01] INTRUSION_SYNC // RESISTANCE_DETECTED
              </div>
            </motion.div>
          )}

          {/* ── Progressive Step 2 (1s - 2s): Medium Skull on the RIGHT ── */}
          {glitchStep === 2 && (
            <motion.div
              className="absolute right-[15%] sm:right-[22%] flex flex-col items-center space-y-3 z-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.7, scale: 1.05, x: [3, -4, 3], y: [-2, 3, -2] }}
              transition={{ repeat: Infinity, duration: 0.18 }}
            >
              <CyberSkull size={130} opacity={0.75} glowIntensity={22} />
              <div className="px-3 py-1 rounded bg-black/90 border border-[#00ff66]/60 text-[10px] text-[#00ff66] tracking-widest uppercase font-bold shadow-[0_0_15px_rgba(0,255,102,0.4)]">
                [02] INJECTING_ROGUE_KERNEL // LOCKDOWN
              </div>
            </motion.div>
          )}

          {/* ── Progressive Step 3 (2s - 3.1s): Dominant Master Skull in the CENTER with violent vibration ── */}
          {glitchStep === 3 && (
            <motion.div
              className="relative flex flex-col items-center space-y-5 z-30"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{
                scale: [1.15, 1.25, 1.18, 1.28, 1.2],
                opacity: 1,
              }}
              transition={{ repeat: Infinity, duration: 0.12 }}
            >
              <CyberSkull size={175} opacity={1} glowIntensity={40} />

              <div className="flex items-center space-x-2 px-4 py-1.5 rounded bg-black border-2 border-[#00ff66] text-xs sm:text-sm text-[#00ff66] font-black tracking-[0.25em] uppercase shadow-[0_0_25px_#00ff66]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-ping" />
                <span>OVERCLOCK_BREACH // CORE_PURGE</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 2: VINTAGE CRT TV CURVED-DIAMOND FOLD COLLAPSE (3.1s - 3.8s)
          Stage A: Screen compresses into a curved barrel-diamond fold
          Stage B: Snaps into a glowing green/white horizontal laser line
          Stage C: Pinches horizontally to a center spark
          Stage D: Snaps off to total blackout!
          ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'CRT_COLLAPSE' && (
        <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
          {/* Stage A: The Curved Barrel-Diamond Screen Collapse */}
          <motion.div
            className="w-full h-full bg-[#031509] border border-[#00ff66] shadow-[0_0_80px_#00ff66]"
            initial={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              scaleY: 1,
              scaleX: 1,
              opacity: 1,
            }}
            animate={{
              // First snaps into a curved 4-point diamond / barrel pinch
              clipPath: [
                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                'polygon(50% 12%, 88% 50%, 50% 88%, 12% 50%)',
                'polygon(50% 48%, 98% 50%, 50% 52%, 2% 50%)',
              ],
              scaleY: [1, 0.45, 0.005],
              scaleX: [1, 0.95, 0.98],
              opacity: [1, 1, 0.9],
            }}
            transition={{
              duration: 0.38,
              times: [0, 0.55, 1],
              ease: [0.77, 0, 0.175, 1],
            }}
          />

          {/* Stage B: Super-Bright Phosphor Horizontal Laser Beam */}
          <motion.div
            className="absolute inset-x-0 h-[2.5px] bg-[#00ff66] shadow-[0_0_30px_#00ff66,0_0_60px_#ffffff]"
            initial={{ scaleX: 1, opacity: 0 }}
            animate={{
              scaleX: [1, 1, 0.05, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              delay: 0.28,
              duration: 0.25,
              times: [0, 0.2, 0.8, 1],
              ease: 'easeInOut',
            }}
          />

          {/* Stage C: Final Dying Phosphor Center Spark */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_30px_#ffffff,0_0_60px_#00ff66]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2.5, 0.8, 0],
              opacity: [0, 1, 0.9, 0],
            }}
            transition={{
              delay: 0.45,
              duration: 0.18,
              times: [0, 0.3, 0.7, 1],
              ease: 'easeOut',
            }}
          />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 3: THE SUSPENSEFUL VOID (3.8s - 5.2s)
          Dead silent 1.4-second pure blackout void before cold boot prompt
          ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'VOID' && (
        <div className="w-full h-full bg-black cursor-none" />
      )}
    </div>
  );
}

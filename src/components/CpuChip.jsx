import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

/**
 * CpuChip Component
 * Transforms into the glowing central CPU chip in State 2 (The Ignition)
 * and anchors the circuit traces in State 3.
 */
export default function CpuChip() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      <motion.div
        className="relative w-40 h-40 md:w-44 md:h-44 flex items-center justify-center"
        initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 22,
          duration: 0.5,
        }}
      >
        {/* Ambient Neon Back-Glow */}
        <div className="absolute -inset-6 bg-cyan-500/25 rounded-2xl blur-xl animate-pulse" />
        <div className="absolute -inset-2 bg-blue-600/30 rounded-xl blur-md" />

        {/* Outer Contact Pins (Lining Top, Bottom, Left, Right) */}
        {/* Top Pins */}
        <div className="absolute -top-3.5 left-6 right-6 flex justify-between px-2">
          {[...Array(6)].map((_, i) => (
            <span
              key={`top-pin-${i}`}
              className="w-1.5 h-3.5 bg-gradient-to-t from-cyan-400 to-cyan-100 rounded-t-sm shadow-[0_0_8px_#00f3ff]"
            />
          ))}
        </div>
        {/* Bottom Pins */}
        <div className="absolute -bottom-3.5 left-6 right-6 flex justify-between px-2">
          {[...Array(6)].map((_, i) => (
            <span
              key={`bot-pin-${i}`}
              className="w-1.5 h-3.5 bg-gradient-to-b from-cyan-400 to-cyan-100 rounded-b-sm shadow-[0_0_8px_#00f3ff]"
            />
          ))}
        </div>
        {/* Left Pins */}
        <div className="absolute -left-3.5 top-6 bottom-6 flex flex-col justify-between py-2">
          {[...Array(6)].map((_, i) => (
            <span
              key={`left-pin-${i}`}
              className="w-3.5 h-1.5 bg-gradient-to-l from-cyan-400 to-cyan-100 rounded-l-sm shadow-[0_0_8px_#00f3ff]"
            />
          ))}
        </div>
        {/* Right Pins */}
        <div className="absolute -right-3.5 top-6 bottom-6 flex flex-col justify-between py-2">
          {[...Array(6)].map((_, i) => (
            <span
              key={`right-pin-${i}`}
              className="w-3.5 h-1.5 bg-gradient-to-r from-cyan-400 to-cyan-100 rounded-r-sm shadow-[0_0_8px_#00f3ff]"
            />
          ))}
        </div>

        {/* CPU Silicon Substrate (Black/Dark Metallic Body) */}
        <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-2 border-cyan-400/80 rounded-lg shadow-[0_0_30px_rgba(0,243,255,0.7),inset_0_0_20px_rgba(0,243,255,0.4)] p-3 flex flex-col justify-between overflow-hidden">
          
          {/* Subtle PCB texture overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00f3ff_1px,transparent_1px)] [background-size:8px_8px]" />

          {/* Corner gold alignment marks */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-amber-400" />

          {/* Top Engraving Header */}
          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono tracking-wider text-cyan-300/80">
            <span className="font-semibold text-amber-300">CORE // V4.2</span>
            <span>64-THREAD</span>
          </div>

          {/* Central Die / Heat Spreader with Glowing Core */}
          <div className="relative z-10 mx-auto w-20 h-20 bg-neutral-900/90 border border-cyan-400/60 rounded flex flex-col items-center justify-center shadow-[inset_0_0_15px_rgba(0,243,255,0.6)]">
            {/* Spinning Neon Reticle */}
            <div className="absolute inset-1 rounded border border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: '14s' }} />

            {/* Core Glowing Diode */}
            <motion.div
              className="w-10 h-10 rounded bg-cyan-400/20 border border-cyan-300 flex items-center justify-center text-cyan-200 shadow-[0_0_20px_#00f3ff]"
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 15px rgba(0,243,255,0.7)',
                  '0 0 30px rgba(0,243,255,1)',
                  '0 0 15px rgba(0,243,255,0.7)',
                ],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Cpu className="w-6 h-6 text-cyan-100 animate-pulse" />
            </motion.div>

            <span className="text-[7px] font-mono tracking-widest text-cyan-300 mt-1 uppercase font-bold">
              IGNITION OK
            </span>
          </div>

          {/* Bottom Laser Text */}
          <div className="relative z-10 flex items-center justify-between text-[8px] font-mono tracking-tighter text-cyan-400/70">
            <span>NEURAL MATRIX</span>
            <span className="text-emerald-400 font-bold">● ONLINE</span>
          </div>

          {/* Animated Sweeping Light Sheen */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-300/20 to-transparent -translate-x-full -translate-y-full pointer-events-none"
            animate={{ translateX: ['100%', '-100%'], translateY: ['100%', '-100%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

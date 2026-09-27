import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * Section Theme Palette for Dynamic Section Luminescence & Ambient Cursor Halo
 */
const SECTION_COLORS = {
  hero: { hex: '#00f3ff', rgb: '0, 243, 255', label: 'CYAN' },
  about: { hex: '#38bdf8', rgb: '56, 189, 248', label: 'SKY' },
  skills: { hex: '#818cf8', rgb: '129, 140, 248', label: 'INDIGO' },
  experience: { hex: '#0ea5e9', rgb: '14, 165, 233', label: 'SAMSUNG BLUE' },
  projects: { hex: '#10b981', rgb: '16, 185, 129', label: 'EMERALD' },
  education: { hex: '#60a5fa', rgb: '96, 165, 250', label: 'SAPPHIRE' },
  honors: { hex: '#f59e0b', rgb: '245, 158, 11', label: 'AMBER' },
  contact: { hex: '#c084fc', rgb: '192, 132, 252', label: 'VIOLET' },
  default: { hex: '#00f3ff', rgb: '0, 243, 255', label: 'CYAN' },
};

/**
 * CustomCursor Component
 * Dual-Mode Cyber-Pointer with Dynamic Section Luminescence, Ambient Halo & Ultra Reticle
 */
export default function CustomCursor({
  mode = 'clean',
  pointerPos = null,
  isHoveringTarget = false,
  isClicking = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [activeSectionColor, setActiveSectionColor] = useState(SECTION_COLORS.default);
  const [clickRipples, setClickRipples] = useState([]);

  // Raw mouse coordinates (exact tip of the pointer)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Sync with manual pointerPos if provided (e.g. In OverclockSequence)
  useEffect(() => {
    if (pointerPos && pointerPos.x !== -999 && pointerPos.y !== -999) {
      mouseX.set(pointerPos.x);
      mouseY.set(pointerPos.y);
      if (!isVisible) setIsVisible(true);
    }
  }, [pointerPos, mouseX, mouseY, isVisible]);

  // Dynamic Section Detection & Pointer Tracking
  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    // Apply cursor-none class to body when custom cursor is active
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseX.set(x);
      mouseY.set(y);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target;
      if (target) {
        const interactive =
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.closest('[data-cursor="pointer"]') ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA';

        setIsHovered(!!interactive);

        // Detect which section the cursor is currently hovering over
        if (mode === 'clean') {
          const sectionEl = target.closest('section') || target.closest('[id]');
          if (sectionEl && sectionEl.id) {
            const secId = sectionEl.id.toLowerCase();
            if (SECTION_COLORS[secId]) {
              setActiveSectionColor(SECTION_COLORS[secId]);
              return;
            }
          }
          const closestId = target.closest('[id]')?.id?.toLowerCase();
          if (closestId && SECTION_COLORS[closestId]) {
            setActiveSectionColor(SECTION_COLORS[closestId]);
          }
        }
      }
    };

    const handleMouseDown = (e) => {
      setIsMouseDown(true);

      // Spawn kinetic click shockwave in that section's color
      const id = Date.now() + Math.random();
      const newRipple = {
        id,
        x: e.clientX,
        y: e.clientY,
        color: activeSectionColor.rgb,
      };

      setClickRipples((prev) => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setClickRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY, mode, activeSectionColor]);

  const effectiveHover = isHoveringTarget || isHovered;
  const effectiveClick = isClicking || isMouseDown;

  if (!isVisible && !pointerPos) return null;

  // ═════════════════════════════════════════════════════════════════════════
  // MODE 1: ULTRA VERSION (Overclock Reticle with Uninterrupted Revolving Dot & Lock HUD)
  // ═════════════════════════════════════════════════════════════════════════
  if (mode === 'ultra') {
    return (
      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none">
        {/* Click shockwave ripples */}
        {clickRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed rounded-full pointer-events-none border border-cyan-400"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ width: 10, height: 10, opacity: 0.8, borderWidth: 2 }}
            animate={{ width: 90, height: 90, opacity: 0, borderWidth: 0.5 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        ))}

        <motion.div
          className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
          style={{
            x: pointerPos ? pointerPos.x : mouseX,
            y: pointerPos ? pointerPos.y : mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ scale: effectiveClick ? 0.85 : 1 }}
          transition={{ duration: 0.12 }}
        >
          {/* ── Base Reticle: Permanently Spinning Ring with The Revolving Dot (NEVER unmounts!) ── */}
          <div className="relative flex items-center justify-center">
            {/* Outer Circular Ring with the ONLY Revolving Dot */}
            <div
              className="w-10 h-10 rounded-full border border-cyan-400/60 flex items-center justify-center animate-spin pointer-events-none"
              style={{ animationDuration: '8s' }}
            >
              <span className="absolute top-0 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#00f3ff] -translate-y-0.5" />
            </div>

            {/* Crosshair Pips */}
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400/90 shadow-[0_0_4px_#00f3ff]" />
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400/90 shadow-[0_0_4px_#00f3ff]" />
            <span className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/90 shadow-[0_0_4px_#00f3ff]" />
            <span className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/90 shadow-[0_0_4px_#00f3ff]" />

            {/* Target Hover Lock Overlay: Clamping Brackets + Diamond + LOCK::ENGAGE */}
            <AnimatePresence>
              {effectiveHover && (
                <motion.div
                  key="target-lock-overlay"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* 4 Inward Clamping Target Brackets */}
                  <motion.span
                    className="absolute -top-4 -left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-300 shadow-[0_0_8px_#00f3ff]"
                    animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <motion.span
                    className="absolute -top-4 -right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-300 shadow-[0_0_8px_#00f3ff]"
                    animate={{ x: [0, -2, 0], y: [0, 2, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <motion.span
                    className="absolute -bottom-4 -left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-300 shadow-[0_0_8px_#00f3ff]"
                    animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <motion.span
                    className="absolute -bottom-4 -right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-300 shadow-[0_0_8px_#00f3ff]"
                    animate={{ x: [0, -2, 0], y: [0, -2, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />

                  {/* Rotating Diamond Center Core */}
                  <motion.div
                    className="w-2.5 h-2.5 bg-cyan-300 rotate-45 shadow-[0_0_12px_#00f3ff]"
                    animate={{ scale: [1, 1.35, 1], rotate: [45, 90, 45] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />

                  {/* Tactical Target Readout Tag */}
                  <div className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap flex items-center space-x-1.5 px-2 py-0.5 bg-black/95 border border-cyan-400/90 rounded text-[9px] font-mono font-bold tracking-widest text-cyan-200 shadow-[0_0_12px_rgba(0,243,255,0.6)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>LOCK::ENGAGE</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MODE 2: CLEAN VERSION (Custom Cyber Chevron Pointer + Thick Dynamic Outline)
  // ═════════════════════════════════════════════════════════════════════════
  const colorHex = activeSectionColor.hex;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none">
      {/* ── 1. Expanding Click Shockwave Ripples (Section Color) ── */}
      {clickRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: '-50%',
            translateY: '-50%',
            borderColor: `rgba(${ripple.color}, 0.8)`,
            borderWidth: 1.5,
            borderStyle: 'solid',
            boxShadow: `0 0 16px rgba(${ripple.color}, 0.5)`,
          }}
          initial={{ width: 8, height: 8, opacity: 1 }}
          animate={{ width: 110, height: 110, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}

      {/* ── 2. Custom Precision Cyber-Pointer Arrow Glyph ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          // Hotspot offset: tip is at (2, 2)
          translateX: -2,
          translateY: -2,
        }}
        animate={{
          scale: effectiveClick ? 0.88 : effectiveHover ? 1.15 : 1,
          rotate: effectiveClick ? -4 : 0,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      >
        <div className="relative">
          {/* Custom SVG Cybernetic Chevron Pointer with Thick Outline & Dark Background Inside */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `drop-shadow(0 0 3px ${colorHex}) drop-shadow(0 0 7px ${colorHex}55)`,
            }}
            className="transition-all duration-300"
          >
            {/* Single sharp cyber-chevron pointer: thick dynamic outline, dark solid background inside */}
            <path
              d="M3 2L20.5 12L12.5 14.2L9.5 22L3 2Z"
              fill="#09090b"
              stroke={colorHex}
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="transition-colors duration-300"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

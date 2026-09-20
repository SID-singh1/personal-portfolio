import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor
 * Ultra-smooth, hardware-accelerated precision cyber-reticle.
 * Features:
 * - Fine cyan center dot that tracks pointer position immediately
 * - Trailing spring ring (damped, zero lag, smooth momentum)
 * - Expands & glows when hovering over clickable elements (buttons, links, cards, pills)
 * - Micro-pulse on mouse down/click
 * - Automatically hidden on touch/mobile devices
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics for outer ring
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine hover (non-touch)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA';

      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* ── Outer Trailing Spring Ring ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 44 : isClicked ? 24 : 32,
          height: isHovered ? 44 : isClicked ? 24 : 32,
          borderColor: isHovered ? 'rgba(0, 243, 255, 0.85)' : 'rgba(0, 243, 255, 0.35)',
          backgroundColor: isHovered ? 'rgba(0, 243, 255, 0.08)' : 'rgba(0, 243, 255, 0.02)',
          boxShadow: isHovered
            ? '0 0 20px rgba(0, 243, 255, 0.35), inset 0 0 10px rgba(0, 243, 255, 0.15)'
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {/* Subtle crosshair tick marks on outer ring when hovered */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
            <span className="absolute top-0 w-1 h-0.5 bg-cyan-400 -translate-y-1" />
            <span className="absolute bottom-0 w-1 h-0.5 bg-cyan-400 translate-y-1" />
            <span className="absolute left-0 w-0.5 h-1 bg-cyan-400 -translate-x-1" />
            <span className="absolute right-0 w-0.5 h-1 bg-cyan-400 translate-x-1" />
          </div>
        )}
      </motion.div>

      {/* ── Instant Center Precision Dot ── */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,243,255,1)] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 1.4 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

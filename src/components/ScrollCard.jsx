import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollCard
 * High-performance, GPU-accelerated bidirectional scroll entrance & exit physics.
 *
 * Behavior:
 * - Entering from bottom: Organically fades in and glides up into view
 * - Sweet spot (center screen): 100% crisp focus, rock-solid opacity, razor-sharp typography
 * - Leaving near top: Visibly dissolves (opacity 1 -> 0, floats up, subtle scale) as it nears the top edge
 * - Reverse scrolling: Fluidly reverses the animation when scrolling back up
 */
export default function ScrollCard({
  children,
  className = '',
  entranceThreshold = 0.15,
  exitThreshold = 0.68,
  exitComplete = 0.94,
  yOffset = 32,
  scaleOffset = 0.98,
  ...props
}) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, entranceThreshold, exitThreshold, exitComplete],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, entranceThreshold, exitThreshold, exitComplete],
    [yOffset, 0, 0, -yOffset]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, entranceThreshold, exitThreshold, exitComplete],
    [scaleOffset, 1, 1, scaleOffset]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y, scale }}
      className={`will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

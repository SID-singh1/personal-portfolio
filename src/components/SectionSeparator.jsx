import React from 'react';

/**
 * SectionSeparator Component
 * Architectural demarcation line signaling section transitions:
 * - Smooth gradient laser beams tailored to the incoming section's accent color
 * - Prominent, readable glowing telemetry demarcation pill with pulse indicator
 * - Eliminates scrolling ambiguity between sections
 */
export default function SectionSeparator({ label, color = '#00f3ff' }) {
  return (
    <div className="relative py-16 flex items-center justify-center select-none pointer-events-none">
      {/* Left tapering laser beam */}
      <div
        className="flex-1 h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 40%, ${color}70 100%)`,
        }}
      />

      {/* Center demarcation pill (Enlarged & Prominent) */}
      <div
        className="mx-4 sm:mx-6 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border-[1.5px] text-xs sm:text-[13px] font-mono tracking-[0.2em] uppercase flex items-center space-x-2.5 bg-[#0b0c10] backdrop-blur-xl shadow-xl"
        style={{
          borderColor: `${color}55`,
          color: color,
          boxShadow: `0 0 24px ${color}25`,
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse shrink-0"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
        <span className="font-bold tracking-wider">{label}</span>
      </div>

      {/* Right tapering laser beam */}
      <div
        className="flex-1 h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, ${color}70 0%, rgba(255, 255, 255, 0.05) 60%, transparent 100%)`,
        }}
      />
    </div>
  );
}

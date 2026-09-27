import React from 'react';

/**
 * SectionSeparator Component
 * Clean architectural demarcation line that signals section transitions:
 * - Smooth gradient beams tailored to the incoming section's accent color
 * - Centered glowing telemetry demarcation pill with pulse indicator
 * - Eliminates scrolling ambiguity between sections
 */
export default function SectionSeparator({ label, color = '#00f3ff' }) {
  return (
    <div className="relative py-12 flex items-center justify-center select-none pointer-events-none">
      {/* Left tapering laser beam */}
      <div
        className="flex-1 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.04) 50%, ${color}55 100%)`,
        }}
      />

      {/* Center demarcation pill */}
      <div
        className="mx-4 px-3.5 py-1 rounded-full border text-[10px] font-mono tracking-[0.25em] uppercase flex items-center space-x-2 bg-[#09090b] backdrop-blur-md shadow-lg"
        style={{
          borderColor: `${color}40`,
          color: color,
          boxShadow: `0 0 16px ${color}20`,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
        <span className="font-semibold">{label}</span>
      </div>

      {/* Right tapering laser beam */}
      <div
        className="flex-1 h-[1px]"
        style={{
          background: `linear-gradient(90deg, ${color}55 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%)`,
        }}
      />
    </div>
  );
}

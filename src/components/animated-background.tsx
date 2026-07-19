'use client'

/**
 * Fixed, layered midnight-volt backdrop:
 *   three drifting aurora orbs (indigo / violet / cyan)
 *   → faint dot grid → vignette → film grain.
 * Pure CSS — the only motion is GPU-composited orb drift.
 */
const AnimatedBackground = () => {
  return (
    <div className="bg-canvas" aria-hidden>
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-dot-grid" />
      <div className="bg-vignette" />
      <div className="bg-grain" />
    </div>
  )
}

export default AnimatedBackground

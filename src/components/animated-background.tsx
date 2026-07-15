'use client'

/**
 * Fixed, layered graphite-spotlight backdrop:
 *   soft top spotlight → drifting aurora → horizon hairline → faint dot grid
 *   → vignette → film grain.
 * Pure CSS — the only motion is one slow GPU-composited aurora drift.
 */
const AnimatedBackground = () => {
  return (
    <div className="bg-canvas" aria-hidden>
      <div className="bg-spotlight" />
      <div className="bg-aurora" />
      <div className="bg-horizon" />
      <div className="bg-dot-grid" />
      <div className="bg-vignette" />
      <div className="bg-grain" />
    </div>
  )
}

export default AnimatedBackground

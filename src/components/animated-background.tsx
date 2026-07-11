'use client'

/**
 * Fixed, layered graphite-spotlight backdrop:
 *   soft top spotlight → horizon hairline → faint dot grid → vignette → film grain.
 * Entirely static CSS — no animation, no canvas, no per-frame JS.
 */
const AnimatedBackground = () => {
  return (
    <div className="bg-canvas" aria-hidden>
      <div className="bg-spotlight" />
      <div className="bg-horizon" />
      <div className="bg-dot-grid" />
      <div className="bg-vignette" />
      <div className="bg-grain" />
    </div>
  )
}

export default AnimatedBackground

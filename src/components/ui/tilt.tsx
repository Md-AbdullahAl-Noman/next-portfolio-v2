'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface TiltProps {
  children: React.ReactNode
  /** max tilt in degrees */
  max?: number
  className?: string
}

/**
 * Perspective tilt that follows the cursor and springs back on leave.
 * Touch devices never fire mousemove, so it stays inert there.
 */
export const Tilt = ({ children, max = 5, className }: TiltProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 160, damping: 20, mass: 0.5 })
  const sry = useSpring(ry, { stiffness: 160, damping: 20, mass: 0.5 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rx.set(-py * max * 2)
    ry.set(px * max * 2)
  }

  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Tilt

'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * A soft champagne spotlight that trails the cursor with a gentle spring.
 * Desktop / fine-pointer only, and disabled under reduced-motion.
 */
const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 260)
      y.set(e.clientY - 260)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden />
}

export default CursorGlow

'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Soft light that trails the cursor across the whole page (desktop only). */
const CursorGlow = () => {
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const springX = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      style={{ left: springX, top: springY, x: '-50%', y: '-50%' }}
      className="pointer-events-none fixed z-30 hidden mix-blend-screen md:block"
    >
      <div className="h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.07)_0%,rgba(129,140,248,0.04)_35%,transparent_65%)]" />
    </motion.div>
  )
}

export default CursorGlow

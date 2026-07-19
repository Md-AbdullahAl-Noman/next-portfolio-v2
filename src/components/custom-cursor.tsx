'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Bespoke pointer: a precise dot that tracks 1:1 and a lagging ring that grows
 * and reveals a contextual label over interactive elements. Any element can set
 * its own label via `data-cursor="…"`. Fine-pointer only; bails under
 * reduced-motion so the native cursor stays.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 380, damping: 28, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('cursor-none')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor]',
      ) as HTMLElement | null
      setHovering(!!el)
      setLabel(el?.getAttribute('data-cursor') || '')
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.classList.remove('cursor-none')
    }
  }, [x, y])

  if (!enabled) return null

  const ringSize = hovering ? (label ? 88 : 54) : 34

  return (
    <>
      {/* precise dot */}
      <motion.div
        style={{ x, y }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-[var(--primary)]"
        aria-hidden
      />
      {/* lagging ring + label */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          backgroundColor: hovering
            ? 'rgba(129, 140, 248, 0.12)'
            : 'rgba(129, 140, 248, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full border border-[var(--primary)] backdrop-blur-[1px]"
        aria-hidden
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--primary)]">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}

export default CustomCursor

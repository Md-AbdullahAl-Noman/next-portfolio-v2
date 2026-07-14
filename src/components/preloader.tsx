'use client'

import { useEffect, useState } from 'react'
import { animate, AnimatePresence, motion } from 'framer-motion'

/** When the hero reveal should begin — curtain starts lifting at 1.5s. */
export const INTRO_DELAY = 1.9

const HOLD_MS = 1500

/**
 * Full-screen intro: name wordmark + 0→100 counter, then the curtain
 * lifts to reveal the page. Plays on every full load.
 */
const Preloader = () => {
  const [done, setDone] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const counter = animate(0, 100, {
      duration: 1.25,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    const timer = setTimeout(() => setDone(true), HOLD_MS)
    return () => {
      counter.stop()
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-background px-6 py-8 sm:px-10"
          aria-hidden
        >
          <div className="flex items-center justify-between">
            <span className="label-mono">Portfolio — 2026</span>
            <span className="label-mono">Dhaka, BD</span>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl"
            >
              Md Abdullah Al Noman
              <span className="text-[var(--primary)]">.</span>
            </motion.h1>
          </div>

          <div className="flex items-end justify-between border-t border-[var(--border)] pt-6">
            <span className="label-mono">Lead Software Engineer</span>
            <span className="font-display text-6xl font-light tabular-nums tracking-tight text-[var(--primary)] sm:text-8xl">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader

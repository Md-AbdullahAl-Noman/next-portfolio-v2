'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  HomeIcon,
  UserIcon,
  MapIcon,
  WrenchScrewdriverIcon,
  FolderOpenIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid'

const LINKS = [
  { id: 'hero', label: 'Home', icon: HomeIcon },
  { id: 'about', label: 'About', icon: UserIcon },
  { id: 'journey', label: 'Journey', icon: MapIcon },
  { id: 'skills', label: 'Skills', icon: WrenchScrewdriverIcon },
  { id: 'projects', label: 'Projects', icon: FolderOpenIcon },
  { id: 'contact', label: 'Contact', icon: EnvelopeIcon },
]

const NavigationTab = () => {
  const [active, setActive] = useState('hero')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* page scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400"
      />

      {/* centered wrapper — translate is owned by flex, motion only animates y */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3">
        <motion.nav
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="pointer-events-auto"
        >
          <div className="flex items-center gap-0.5 rounded-full border border-[var(--border)] bg-[#0a1020]/70 px-1.5 py-1.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:gap-1">
            {LINKS.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => handleScroll(id)}
                whileTap={{ scale: 0.9 }}
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-300 sm:px-4 sm:text-sm ${
                  active === id
                    ? 'text-slate-950'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_4px_16px_-4px_rgba(34,211,238,0.7)]"
                  />
                )}
                <Icon className="relative z-10 size-4" />
                <span className="relative z-10 hidden md:inline">{label}</span>
              </motion.button>
            ))}
          </div>
        </motion.nav>
      </div>
    </>
  )
}

export default NavigationTab

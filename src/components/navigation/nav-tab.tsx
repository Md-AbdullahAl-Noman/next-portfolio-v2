'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'

import { INTRO_DELAY } from '@/components/preloader'
import { Magnetic } from '@/components/ui/magnetic'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

const NavigationTab = () => {
  const [active, setActive] = useState('hero')
  const [hovered, setHovered] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    ;['hero', ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleScroll = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // the pill sits under whichever item is hovered, else the active section
  const spotlight = hovered ?? active

  return (
    <motion.header
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: INTRO_DELAY + 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-[var(--border)] bg-[#05070f]/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* scroll progress hairline */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        {/* wordmark */}
        <Magnetic strength={0.3}>
          <button
            onClick={() => handleScroll('hero')}
            className="font-display text-lg tracking-tight text-foreground"
            aria-label="Back to top"
          >
            Al Noman<span className="text-[var(--primary)]">.</span>
          </button>
        </Magnetic>

        {/* desktop links */}
        <nav
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              onMouseEnter={() => setHovered(id)}
              className={`relative rounded-full px-4 py-2 text-[13px] tracking-wide transition-colors duration-300 ${
                active === id
                  ? 'text-foreground'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {spotlight === id && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full border border-[var(--border)] bg-[var(--surface-2)]"
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
          <Magnetic strength={0.35} className="ml-3">
            <a
              href="/Md-Abdullah-Al-Noman_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-[var(--border-strong)] px-5 py-2 text-[13px] tracking-wide text-foreground transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              Resume
            </a>
          </Magnetic>
        </nav>

        {/* mobile toggle */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          className="flex size-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-5 bg-foreground transition-transform duration-300 ${
              menuOpen ? 'translate-y-[3px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-5 bg-foreground transition-transform duration-300 ${
              menuOpen ? '-translate-y-[3px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-[var(--border)] bg-[#05070f]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {LINKS.map(({ id, label }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => handleScroll(id)}
                  className="py-3 text-left font-display text-2xl font-light tracking-tight text-foreground"
                >
                  {label}
                </motion.button>
              ))}
              <a
                href="/Md-Abdullah-Al-Noman_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 font-display text-2xl font-light italic tracking-tight text-[var(--primary)]"
              >
                Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default NavigationTab

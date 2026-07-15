'use client'

import { useEffect, useState } from 'react'
import { ArrowUpIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'

const socials = [
  { label: 'GitHub', href: 'https://github.com/Md-AbdullahAl-Noman' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alnoman-se/' },
]

/** Live clock in Dhaka time — the "where I am right now" signature. */
const LocalTime = () => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="label-mono tabular-nums">
      Dhaka, BD — {time || '--:--'}
    </span>
  )
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="font-display text-lg tracking-tight text-foreground">
            Al Noman<span className="text-[var(--primary)]">.</span>
          </div>

          <div className="flex items-center gap-8">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-foreground"
              >
                {label}
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 self-start text-muted transition-colors duration-300 hover:text-foreground md:self-auto"
          >
            <span className="label-mono !text-inherit">Back to top</span>
            <ArrowUpIcon className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-[var(--muted-2)]">
            © {currentYear} Md Abdullah Al Noman. All rights reserved.
          </span>
          <LocalTime />
        </div>

        {/* giant ghost wordmark */}
        <div
          aria-hidden
          className="ghost-stroke pointer-events-none -mb-6 mt-12 whitespace-nowrap text-center font-display text-[15vw] font-light leading-[0.85] tracking-tight sm:-mb-10"
        >
          AL NOMAN
        </div>
      </div>
    </footer>
  )
}

export default Footer

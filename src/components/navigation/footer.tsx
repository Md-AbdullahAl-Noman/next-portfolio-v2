'use client'

import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import { ArrowUpIcon } from '@heroicons/react/24/solid'

const socials = [
  {
    name: 'GitHub',
    icon: SiGithub,
    href: 'https://github.com/Md-AbdullahAl-Noman',
  },
  {
    name: 'LinkedIn',
    icon: SiLinkedin,
    href: 'https://www.linkedin.com/in/alnoman-se/',
  },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)]">
      {/* glow accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-8 py-16">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Back to top"
          className="flex size-12 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.03] text-muted transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <ArrowUpIcon className="size-5" />
        </motion.button>

        <div className="font-display text-xl font-bold tracking-tight">
          Md Abdullah <span className="text-gradient">Al Noman</span>
        </div>

        <div className="flex items-center gap-4">
          {socials.map(({ name, icon: Icon, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 text-center text-sm text-slate-500">
          <span>
            © {currentYear} Md Abdullah Al Noman. All rights reserved.
          </span>
          <span className="font-mono text-xs text-slate-600">
            Designed & engineered with Next.js, TypeScript & Framer Motion
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

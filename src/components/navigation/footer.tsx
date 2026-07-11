'use client'

import { ArrowUpIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'

const socials = [
  { label: 'GitHub', href: 'https://github.com/Md-AbdullahAl-Noman' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alnoman-se/' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[var(--border)]">
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
          <span className="label-mono">
            Next.js · TypeScript · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

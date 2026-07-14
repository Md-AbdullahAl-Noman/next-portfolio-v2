'use client'

import { ArrowDownRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { motion, type Variants } from 'framer-motion'

import { INTRO_DELAY } from '@/components/preloader'
import { Magnetic } from '@/components/ui/magnetic'

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: INTRO_DELAY },
  },
}

const fadeUp: Variants = {
  hidden: { y: 26, opacity: 0, filter: 'blur(8px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
}

// the headline orchestrates its own slower line-by-line reveal
const headline: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
}

const lineReveal: Variants = {
  hidden: { y: '116%' },
  visible: {
    y: 0,
    transition: { duration: 1.35, ease: [0.16, 1, 0.3, 1] },
  },
}

const Line = ({ children }: { children: React.ReactNode }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span variants={lineReveal} className="block">
      {children}
    </motion.span>
  </span>
)

const socials = [
  { label: 'GitHub', href: 'https://github.com/Md-AbdullahAl-Noman' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alnoman-se/' },
]

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative flex min-h-screen w-full flex-col justify-center pb-24 pt-32"
    >
      {/* aurora light beams — slow diagonal sweep behind the headline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: INTRO_DELAY + 0.3 }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_85%,transparent)]"
      >
        <div className="hero-beams">
          <div className="hero-beam hero-beam-1" />
          <div className="hero-beam hero-beam-2" />
          <div className="hero-beam hero-beam-3" />
        </div>
      </motion.div>

      {/* intro line */}
      <motion.div variants={fadeUp} className="relative z-10 mb-10 flex items-center gap-4">
        <span className="relative flex size-2">
          <span className="dot-ping relative inline-flex size-2 rounded-full bg-[#7ea884]" />
        </span>
        <span className="label-mono !text-muted">
          Available for select opportunities
        </span>
      </motion.div>

      {/* statement */}
      <motion.h1
        variants={headline}
        className="relative z-10 font-display text-[13vw] font-light leading-[1.02] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[6.5rem]"
      >
        <Line>Software engineer</Line>
        <Line>
          crafting <span className="accent-italic shimmer-text">reliable,</span>
        </Line>
        <Line>
          <span className="accent-italic shimmer-text">elegant</span> products.
        </Line>
      </motion.h1>

      {/* sub row */}
      <div className="relative z-10 mt-14 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
        <motion.p
          variants={fadeUp}
          className="max-w-md text-base leading-relaxed text-muted"
        >
          I&apos;m{' '}
          <span className="text-foreground">Md Abdullah Al Noman</span> — a
          lead software engineer with five years of experience designing and
          shipping production platforms, from data model to deployment.
          Currently leading engineering at Autoworx.
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center gap-6">
          {socials.map(({ label, href }) => (
            <Magnetic key={label} strength={0.35}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 px-1 text-sm text-muted transition-colors duration-300 hover:text-foreground"
              >
                {label}
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </Magnetic>
          ))}
          <Magnetic strength={0.35}>
            <button
              onClick={() => scrollTo('contact')}
              className="link-underline inline-flex items-center gap-1.5 px-1 text-sm text-[var(--primary)]"
            >
              Get in touch
              <ArrowUpRightIcon className="size-3.5" />
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* bottom rail */}
      <motion.div
        variants={fadeUp}
        className="relative z-10 mt-20 flex items-center justify-between border-t border-[var(--border)] pt-6 md:mt-24"
      >
        <span className="label-mono">Dhaka, Bangladesh — open to remote</span>
        <button
          onClick={() => scrollTo('about')}
          aria-label="Scroll to about"
          className="group inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-foreground"
        >
          <span className="label-mono !text-inherit">Scroll</span>
          <ArrowDownRightIcon className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
        </button>
      </motion.div>
    </motion.div>
  )
}

export default Hero

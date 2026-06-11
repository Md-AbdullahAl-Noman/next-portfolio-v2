'use client'

import { useEffect, useState } from 'react'
import {
  DocumentArrowDownIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid'
import {
  SiGithub,
  SiLinkedin,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiTypescript,
  SiPrisma,
  SiTailwindcss,
} from '@icons-pack/react-simple-icons'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion'
import Link from 'next/link'

import { FlipWords } from '@/components/flip-words'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { Tilt } from '@/components/ui/tilt'

const NAME_FIRST = 'Md Abdullah'
const NAME_LAST = 'Al Noman'

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const letter: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const Letters = ({ text, className }: { text: string; className?: string }) => (
  <span className={`inline-flex overflow-hidden ${className ?? ''}`}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        variants={letter}
        whileHover={{ y: -6, scale: 1.08, transition: { duration: 0.2 } }}
        className="inline-block cursor-default whitespace-pre transition-colors duration-300 hover:text-cyan-300"
      >
        {char}
      </motion.span>
    ))}
  </span>
)

/* --------------------- live typing terminal --------------------- */

const COMMANDS = [
  { cmd: 'whoami', out: 'lead software engineer' },
  { cmd: 'stack --favorites', out: 'typescript · next.js · nestjs · prisma' },
  { cmd: 'ship --to production', out: '✓ scalable  ✓ tested  ✓ on time' },
  { cmd: 'uptime', out: '3+ years building — still compounding' },
]

const useTypedTerminal = () => {
  const [history, setHistory] = useState<typeof COMMANDS>([])
  const [typed, setTyped] = useState('')
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const current = COMMANDS[idx]
    let char = 0
    let doneTimer: ReturnType<typeof setTimeout>

    const typeTimer = setInterval(() => {
      char++
      setTyped(current.cmd.slice(0, char))
      if (char >= current.cmd.length) {
        clearInterval(typeTimer)
        doneTimer = setTimeout(() => {
          setHistory((h) => [...h.slice(-1), current])
          setTyped('')
          setIdx((i) => (i + 1) % COMMANDS.length)
        }, 1400)
      }
    }, 65)

    return () => {
      clearInterval(typeTimer)
      clearTimeout(doneTimer)
    }
  }, [idx])

  return { history, typed }
}

const Prompt = () => (
  <>
    <span className="text-emerald-400">➜</span>{' '}
    <span className="text-slate-500">~</span>{' '}
  </>
)

const TerminalCard = () => {
  const { history, typed } = useTypedTerminal()

  return (
    <Tilt max={7} className="w-full max-w-md">
      <motion.div
        variants={fadeUp}
        className="card-surface w-full rounded-2xl shadow-[0_24px_80px_-24px_rgba(34,211,238,0.25)]"
      >
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-rose-500/80 transition-transform duration-200 hover:scale-125" />
            <span className="size-3 rounded-full bg-amber-400/80 transition-transform duration-200 hover:scale-125" />
            <span className="size-3 rounded-full bg-emerald-400/80 transition-transform duration-200 hover:scale-125" />
          </div>
          <span className="font-mono text-xs text-slate-500">
            noman@portfolio ~ zsh
          </span>
        </div>

        {/* body — live session */}
        <div className="flex min-h-[200px] flex-col justify-end space-y-3 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
          {history.map((entry, i) => (
            <motion.div
              key={`${entry.cmd}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Prompt />
              <span className="text-slate-200">{entry.cmd}</span>
              <div className="text-cyan-300/90">{entry.out}</div>
            </motion.div>
          ))}
          <div>
            <Prompt />
            <span className="text-slate-200">{typed}</span>
            <span className="caret-blink text-cyan-300">▌</span>
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

/* ---------------- floating parallax tech icons ---------------- */

const FLOATERS = [
  { Icon: SiReact, color: '#61dafb', className: '-left-6 top-2', depth: 28, duration: 5 },
  { Icon: SiNextdotjs, color: '#e8eef8', className: 'right-0 -top-10', depth: 18, duration: 6 },
  { Icon: SiNestjs, color: '#ea2845', className: '-right-10 top-1/3', depth: 36, duration: 4.5 },
  { Icon: SiTypescript, color: '#3178c6', className: '-left-14 bottom-1/4', depth: 22, duration: 5.5 },
  { Icon: SiPrisma, color: '#8fa6ff', className: 'left-10 -bottom-10', depth: 32, duration: 4.8 },
  { Icon: SiTailwindcss, color: '#38bdf8', className: 'right-6 -bottom-6', depth: 16, duration: 6.5 },
]

const Floater = ({
  Icon,
  color,
  className,
  depth,
  duration,
  mx,
  my,
}: (typeof FLOATERS)[number] & {
  mx: MotionValue<number>
  my: MotionValue<number>
}) => {
  const x = useTransform(mx, (v) => v * depth)
  const y = useTransform(my, (v) => v * depth)

  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.25, rotate: 8 }}
        className="card-surface flex size-11 items-center justify-center rounded-xl shadow-lg"
      >
        <Icon className="size-5" style={{ color }} />
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------ hero ------------------------------ */

const Hero = () => {
  // normalized cursor position for parallax (-1 .. 1)
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2)
      my.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative flex min-h-screen w-full flex-col justify-center px-4 pb-24 pt-28 md:px-6 lg:px-8"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT — copy */}
        <div className="flex flex-col items-start space-y-6">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-4 py-1.5 text-xs font-medium text-emerald-300"
          >
            <span className="relative flex size-2">
              <span className="dot-ping relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Open to new opportunities
          </motion.div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Letters text={NAME_FIRST} />
            <br />
            <Letters text={NAME_LAST} className="text-gradient" />
          </h1>

          <motion.div
            variants={fadeUp}
            className="flex h-8 items-center gap-3 font-mono text-sm text-slate-400 sm:text-base"
          >
            <span className="text-cyan-400">$</span>
            <FlipWords
              className="p-0 text-slate-300"
              words={[
                'Lead Software Engineer',
                'Full Stack Developer',
                'System Architect',
                'DevOps Enthusiast',
              ]}
              duration={2400}
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            I design and ship production-grade web platforms — from pixel-level
            frontend polish to resilient backend architecture. Currently
            leading engineering at{' '}
            <span className="font-semibold text-cyan-300">Autoworx</span>,
            turning complex problems into elegant, scalable products.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Button onClick={() => scrollTo('contact')}>
                Let&apos;s build together
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Link href="/Md-Abdullah-Al-Noman_CV.pdf" target="_blank">
                <Button variant="outline" className="w-full sm:w-auto">
                  <DocumentArrowDownIcon className="size-4" />
                  Resume
                </Button>
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 pt-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-600">
              Find me on
            </span>
            <span className="h-px w-8 bg-slate-700" />
            {[
              {
                icon: SiGithub,
                href: 'https://github.com/Md-AbdullahAl-Noman',
                label: 'GitHub',
              },
              {
                icon: SiLinkedin,
                href: 'https://www.linkedin.com/in/alnoman-se/',
                label: 'LinkedIn',
              },
            ].map(({ icon: Icon, href, label }) => (
              <Magnetic key={label} strength={0.5}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block text-slate-500 transition-colors duration-300 hover:text-cyan-300"
                >
                  <Icon className="size-5" />
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — terminal + floating icons */}
        <div className="relative hidden justify-center lg:flex">
          <div className="relative">
            <TerminalCard />
            {FLOATERS.map((floater) => (
              <Floater key={floater.color} {...floater} mx={mx} my={my} />
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => scrollTo('about')}
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-600 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

export default Hero

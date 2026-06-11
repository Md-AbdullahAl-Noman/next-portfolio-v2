'use client'

import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion'
import {
  BriefcaseIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/solid'

import SectionHeading from '@/components/ui/section-heading'
import projects from '@/data/projects.json'
import { skills } from '@/data/skills-sets'

/* ------------------------------ data ------------------------------ */

interface JourneyItem {
  period: string
  role: string
  company: string
  current?: boolean
  icon: React.ComponentType<{ className?: string }>
  achievements: string[]
  tags: string[]
}

const journey: JourneyItem[] = [
  {
    period: '2025 — Present',
    role: 'Lead Software Engineer',
    company: 'Autoworx',
    current: true,
    icon: RocketLaunchIcon,
    achievements: [
      'Leading architecture and delivery across the full platform',
      'Mentoring engineers and owning code quality standards',
      'Driving automation systems with BullMQ, Redis & Prisma',
    ],
    tags: ['NestJS', 'Next.js', 'MySQL', 'Redis'],
  },
  {
    period: '2024 — 2025',
    role: 'Software Engineer',
    company: 'Autoworx',
    icon: BriefcaseIcon,
    achievements: [
      'Shipped core CRM modules: leads, scheduling & client comms',
      'Built reusable UI systems that cut feature build time',
      'Owned features end-to-end, from schema to deploy',
    ],
    tags: ['React', 'TypeScript', 'Tailwind', 'Prisma'],
  },
  {
    period: '2024',
    role: 'Software Engineer Intern',
    company: 'Autoworx',
    icon: CodeBracketIcon,
    achievements: [
      'Delivered production features within the first month',
      'Learned the modern stack fast — and earned a full-time seat',
    ],
    tags: ['Next.js', 'Node.js', 'Git'],
  },
  {
    period: '2020 — 2024',
    role: 'B.Sc. in Computer Science & Engineering',
    company: 'American International University–Bangladesh',
    icon: AcademicCapIcon,
    achievements: [
      'Graduated with CGPA 3.88 / 4.00',
      'Earned academic scholarships for consistent performance',
      'Built a deep base in algorithms, OS & system design',
    ],
    tags: ['DSA', 'System Design', 'Python', 'SQL'],
  },
]

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience', decimals: 0 },
  { value: projects.length, suffix: '+', label: 'Projects Delivered', decimals: 0 },
  { value: skills.length, suffix: '+', label: 'Technologies Mastered', decimals: 0 },
  { value: 3.88, suffix: '', label: 'CGPA / 4.00', decimals: 2 },
]

/* --------------------------- count-up stat --------------------------- */

const CountUp = ({
  to,
  decimals,
  suffix,
}: {
  to: number
  decimals: number
  suffix: string
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals)
      },
    })
    return () => controls.stop()
  }, [inView, to, decimals])

  return (
    <span className="font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  )
}

const StatsBand = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="card-surface grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4"
  >
    {stats.map((stat, i) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 * i, duration: 0.6 }}
        className="group relative flex flex-col items-center gap-2 px-4 py-8 text-center"
      >
        {/* hover glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/0 to-cyan-400/0 transition-all duration-500 group-hover:from-cyan-400/[0.04] group-hover:to-indigo-400/[0.06]" />
        <CountUp to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted sm:text-sm">
          {stat.label}
        </span>
        {i < stats.length - 1 && (
          <span className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-[var(--border)] lg:block" />
        )}
      </motion.div>
    ))}
  </motion.div>
)

/* ----------------------------- timeline ----------------------------- */

const cardVariants = (fromLeft: boolean): Variants => ({
  hidden: { opacity: 0, x: fromLeft ? -48 : 48, y: 16 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
})

const TimelineCard = ({ item, index }: { item: JourneyItem; index: number }) => {
  const isLeft = index % 2 === 0
  const Icon = item.icon

  return (
    <div
      className={`relative flex md:items-center ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* node */}
      {/* wrapper owns positioning; motion only scales/rotates the inner node */}
      <div className="absolute left-5 top-8 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          whileHover={{ scale: 1.2, rotate: 12 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 18,
            delay: 0.2,
          }}
          className="relative cursor-pointer"
        >
          <div
            className={`flex size-11 items-center justify-center rounded-full border bg-[#0a1020] shadow-[0_0_24px_-4px_var(--glow)] ${
              item.current
                ? 'border-cyan-400/70 text-cyan-300'
                : 'border-[var(--border-strong)] text-slate-400'
            }`}
          >
            <Icon className="size-5" />
          </div>
          {item.current && (
            <span className="absolute inset-0 animate-ping rounded-full border border-cyan-400/40" />
          )}
        </motion.div>
      </div>

      {/* card */}
      <motion.div
        variants={cardVariants(isLeft)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className={`ml-14 w-full md:ml-0 md:w-[calc(50%-3.5rem)] ${
          isLeft ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        <div className="card-surface card-surface-hover group rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-3 py-1 font-mono text-xs tracking-wide text-cyan-300">
              {item.period}
            </span>
            {item.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Current
              </span>
            )}
          </div>

          <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {item.role}
          </h3>
          <div className="mt-0.5 text-sm font-medium text-slate-400">
            {item.company}
          </div>

          <ul className="mt-4 space-y-2">
            {item.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.12, duration: 0.5 }}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
              >
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400" />
                {achievement}
              </motion.li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border)] bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-slate-400 transition-colors duration-300 group-hover:border-cyan-400/30 group-hover:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Journey = () => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.45'],
  })
  const beamScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <div className="space-y-20 py-24 md:py-32">
      <SectionHeading
        index="02"
        eyebrow="Journey"
        title={
          <>
            The road <span className="text-gradient">so far</span>
          </>
        }
        description="From classroom fundamentals to leading production systems — every step compounds."
      />

      <StatsBand />

      <div ref={timelineRef} className="relative">
        {/* track */}
        <div className="absolute bottom-0 left-5 top-0 w-px bg-[var(--border)] md:left-1/2 md:-translate-x-1/2" />
        {/* scroll-linked beam */}
        <motion.div
          style={{ scaleY: beamScale }}
          className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-cyan-400 via-sky-400 to-indigo-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-12 md:space-y-20">
          {journey.map((item, index) => (
            <TimelineCard key={item.role} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Journey

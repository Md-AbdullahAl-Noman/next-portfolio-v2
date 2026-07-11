'use client'

import { useEffect, useRef } from 'react'
import { animate, motion, useInView, type Variants } from 'framer-motion'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import SectionHeading from '@/components/ui/section-heading'

/* ------------------------------ data ------------------------------ */

interface ExperienceItem {
  period: string
  role: string
  company: string
  current?: boolean
  summary: string
  tags: string[]
}

const experience: ExperienceItem[] = [
  {
    period: '2025 — Present',
    role: 'Lead Software Engineer',
    company: 'Autoworx',
    current: true,
    summary:
      'Leading architecture and delivery across the full platform — owning code quality standards, mentoring engineers, and driving automation systems built on BullMQ, Redis, and Prisma.',
    tags: ['NestJS', 'Next.js', 'MySQL', 'Redis'],
  },
  {
    period: '2024 — 2025',
    role: 'Software Engineer',
    company: 'Autoworx',
    summary:
      'Shipped core CRM modules — leads, scheduling, and client communications — and built reusable UI systems that cut feature build time. Owned features end-to-end, from schema to deploy.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Prisma'],
  },
  {
    period: '2024',
    role: 'Software Engineer Intern',
    company: 'Autoworx',
    summary:
      'Delivered production features within the first month, learned the modern stack fast — and earned a full-time seat.',
    tags: ['Next.js', 'Node.js', 'Git'],
  },
  {
    period: '2020 — 2024',
    role: 'B.Sc. in Computer Science & Engineering',
    company: 'American International University–Bangladesh',
    summary:
      'Graduated with a CGPA of 3.88 / 4.00, earning academic scholarships for consistent performance. Built a deep base in algorithms, operating systems, and system design.',
    tags: ['DSA', 'System Design', 'Python', 'SQL'],
  },
]

const stats = [
  { value: 5, suffix: '+', label: 'Years of experience', decimals: 0 },
  { value: 15, suffix: '+', label: 'Projects delivered', decimals: 0 },
  { value: 30, suffix: '+', label: 'Technologies used', decimals: 0 },
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
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals)
      },
    })
    return () => controls.stop()
  }, [inView, to, decimals])

  return (
    <span className="font-display text-4xl font-light tracking-tight text-foreground sm:text-5xl">
      <span ref={ref}>0</span>
      <span className="text-[var(--primary)]">{suffix}</span>
    </span>
  )
}

const StatsBand = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="grid grid-cols-2 border-y border-[var(--border)] lg:grid-cols-4"
  >
    {stats.map((stat, i) => (
      <div
        key={stat.label}
        className={`flex flex-col gap-2 px-2 py-10 sm:px-8 ${
          i > 0 ? 'lg:border-l lg:border-[var(--border)]' : ''
        } ${i % 2 === 1 ? 'border-l border-[var(--border)] lg:border-l' : ''}`}
      >
        <CountUp to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
        <span className="label-mono">{stat.label}</span>
      </div>
    ))}
  </motion.div>
)

/* --------------------------- experience row --------------------------- */

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const ExperienceRow = ({ item }: { item: ExperienceItem }) => (
  <motion.div
    variants={rowVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    className="group relative border-t border-[var(--border)]"
  >
    {/* warm hover bleed */}
    <div className="pointer-events-none absolute inset-0 -mx-4 rounded-2xl bg-gradient-to-r from-[var(--primary-soft)] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:-mx-6" />
    {/* gold left rail that grows on hover */}
    <div className="pointer-events-none absolute -left-4 top-1/2 h-0 w-px -translate-y-1/2 bg-[var(--primary)] transition-all duration-500 group-hover:h-2/3 sm:-left-6" />

    <div className="relative grid gap-4 py-10 md:grid-cols-[200px_1fr] md:gap-12">
      {/* period */}
      <div className="flex items-start gap-3">
        <span className="label-mono pt-1 transition-colors duration-300 group-hover:!text-[var(--primary)]">
          {item.period}
        </span>
        {item.current && (
          <span className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-2.5 py-1 text-[10px] uppercase tracking-widest text-[var(--primary)]">
            Now
          </span>
        )}
      </div>

      {/* detail */}
      <div className="space-y-4">
        <div>
          <h3 className="flex items-center gap-3 font-display text-2xl font-light tracking-tight text-foreground transition-colors duration-300 group-hover:text-[var(--primary)] sm:text-3xl">
            {item.role}
            <ArrowUpRightIcon className="size-5 -translate-x-2 text-[var(--primary)] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
          </h3>
          <div className="mt-1 text-sm text-muted">{item.company}</div>
        </div>

        <p className="max-w-2xl leading-relaxed text-muted">{item.summary}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
          {item.tags.map((tag) => (
            <span key={tag} className="label-mono !text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

const Journey = () => {
  return (
    <div className="space-y-16 py-24 md:space-y-20 md:py-32">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title={
          <>
            The road <span className="accent-italic">so far</span>
          </>
        }
        description="From classroom fundamentals to leading production systems — every step compounds."
      />

      <StatsBand />

      <div>
        {experience.map((item) => (
          <ExperienceRow key={item.role} item={item} />
        ))}
        <div className="hairline" />
      </div>
    </div>
  )
}

export default Journey

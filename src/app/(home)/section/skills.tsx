'use client'

import { motion, type Variants } from 'framer-motion'

import SectionHeading from '@/components/ui/section-heading'
import { skills } from '@/data/skills-sets'

const GROUPS: { key: string; label: string }[] = [
  { key: 'languages', label: 'Languages' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'databases', label: 'Databases' },
  { key: 'testing', label: 'Testing & QA' },
  { key: 'other', label: 'Tooling & Infra' },
]

const rowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const labelVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const chipsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
}

const chipVariant: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const Skills = () => {
  return (
    <div className="space-y-16 py-24 md:space-y-20 md:py-32">
      <SectionHeading
        index="04"
        eyebrow="Stack"
        title={
          <>
            Tools I <span className="accent-italic">think in</span>
          </>
        }
        description="A battle-tested toolkit, sharpened across production systems."
      />

      <div>
        {GROUPS.map(({ key, label }) => {
          const items = skills.filter((skill) => skill.category === key)
          if (items.length === 0) return null

          return (
            <motion.div
              key={key}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid gap-3 border-t border-[var(--border)] py-8 md:grid-cols-[200px_1fr] md:gap-12"
            >
              <motion.div
                variants={labelVariant}
                className="flex items-baseline gap-2 pt-1"
              >
                <span className="label-mono">{label}</span>
                <span className="font-mono text-[11px] text-[var(--primary)]">
                  {String(items.length).padStart(2, '0')}
                </span>
              </motion.div>
              <motion.div
                variants={chipsContainer}
                className="flex flex-wrap gap-x-2.5 gap-y-3"
              >
                {items.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <motion.span
                      key={skill.name}
                      variants={chipVariant}
                      className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--surface-2)] hover:text-foreground"
                    >
                      {Icon && (
                        <Icon className="size-3.5 text-[var(--muted-2)] transition-colors duration-300 group-hover:text-[var(--primary)]" />
                      )}
                      {skill.name}
                    </motion.span>
                  )
                })}
              </motion.div>
            </motion.div>
          )
        })}
        <div className="hairline" />
      </div>
    </div>
  )
}

export default Skills

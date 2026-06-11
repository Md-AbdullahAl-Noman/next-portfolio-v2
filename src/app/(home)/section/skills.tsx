'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import SectionHeading from '@/components/ui/section-heading'
import { skills } from '@/data/skills-sets'

interface ISkillSet {
  name: string
  category: string
  icon?: React.ComponentType<any> | null
}

const TABS = [
  'All',
  'languages',
  'frontend',
  'backend',
  'databases',
  'testing',
  'other',
]

const Skills = () => {
  const [selectedTab, setSelectedTab] = useState('All')

  const filteredSkills =
    selectedTab === 'All'
      ? skills
      : skills.filter((skill) => skill.category.includes(selectedTab))

  return (
    <div className="space-y-14 py-24 md:py-32">
      <SectionHeading
        index="03"
        eyebrow="Skills"
        title={
          <>
            Tools I <span className="text-gradient">think in</span>
          </>
        }
        description="A battle-tested toolkit, sharpened across production systems."
      />

      {/* TABS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors duration-300 ${
              selectedTab === tab
                ? 'text-slate-950'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            {selectedTab === tab && (
              <motion.span
                layoutId="skill-tab"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_4px_20px_-6px_rgba(34,211,238,0.7)]"
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </motion.div>

      {/* GRID */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <SkillTile key={skill.name} skill={skill} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

const CATEGORY_STYLE: Record<string, { text: string; glow: string }> = {
  languages: { text: 'group-hover:text-amber-300', glow: 'bg-amber-400/20' },
  frontend: { text: 'group-hover:text-cyan-300', glow: 'bg-cyan-400/20' },
  backend: { text: 'group-hover:text-emerald-300', glow: 'bg-emerald-400/20' },
  databases: { text: 'group-hover:text-indigo-300', glow: 'bg-indigo-400/20' },
  testing: { text: 'group-hover:text-rose-300', glow: 'bg-rose-400/20' },
  other: { text: 'group-hover:text-sky-300', glow: 'bg-sky-400/20' },
}

const SkillTile = ({ skill }: { skill: ISkillSet }) => {
  const Icon = skill.icon
  const style = CATEGORY_STYLE[skill.category] ?? CATEGORY_STYLE.other

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ rotate: [0, -2, 2, 0], transition: { duration: 0.4 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="card-surface card-surface-hover group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl px-4 py-6"
    >
      {/* category-colored glow that breathes in on hover */}
      <div
        className={`pointer-events-none absolute -top-8 left-1/2 size-24 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${style.glow}`}
      />
      <div
        className={`relative text-slate-400 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-125 ${style.text}`}
      >
        {Icon ? (
          <Icon className="size-7" />
        ) : (
          <span className="flex size-7 items-center justify-center rounded-md border border-[var(--border)] font-mono text-xs">
            {skill.name[0]}
          </span>
        )}
      </div>
      <div className="relative text-center text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-foreground">
        {skill.name}
      </div>
      <div className="relative font-mono text-[10px] uppercase tracking-widest text-slate-600">
        {skill.category}
      </div>
    </motion.div>
  )
}

export default Skills

'use client'

import { skills } from '@/data/skills-sets'

const iconSkills = skills.filter((skill) => skill.icon)
const half = Math.ceil(iconSkills.length / 2)
const rowA = iconSkills.slice(0, half)
const rowB = iconSkills.slice(half)

const Chip = ({
  skill,
}: {
  skill: { name: string; icon?: React.ComponentType<any> | null }
}) => {
  const Icon = skill.icon
  return (
    <div className="group flex shrink-0 items-center gap-2.5 rounded-full border border-[var(--border)] bg-white/[0.03] px-4 py-2 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]">
      {Icon && (
        <Icon className="size-4 text-slate-500 transition-colors duration-300 group-hover:text-cyan-300" />
      )}
      <span className="whitespace-nowrap text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-100">
        {skill.name}
      </span>
    </div>
  )
}

const Row = ({
  items,
  reverse = false,
}: {
  items: typeof iconSkills
  reverse?: boolean
}) => (
  // py-2 gives chips headroom to lift on hover without being clipped
  <div className="flex overflow-hidden py-2">
    <div
      className={`flex w-max gap-3 pr-3 ${
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      } hover:[animation-play-state:paused]`}
    >
      {[...items, ...items].map((skill, i) => (
        <Chip key={`${skill.name}-${i}`} skill={skill} />
      ))}
    </div>
  </div>
)

/** Full-bleed double marquee of the tech stack. Pauses on hover. */
const TechMarquee = () => (
  <div className="fade-x relative w-full space-y-1 py-8">
    <Row items={rowA} />
    <Row items={rowB} reverse />
  </div>
)

export default TechMarquee

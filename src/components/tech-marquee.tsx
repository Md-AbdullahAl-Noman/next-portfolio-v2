'use client'

import { skills } from '@/data/skills-sets'

const featured = skills.filter((s) => s.icon).slice(0, 14)

const Item = ({
  skill,
}: {
  skill: { name: string; icon?: React.ComponentType<any> | null }
}) => {
  const Icon = skill.icon
  return (
    <div className="group flex shrink-0 items-center gap-3 px-8">
      {Icon && (
        <Icon className="size-4 text-[var(--muted-2)] transition-colors duration-500 group-hover:text-[var(--primary)]" />
      )}
      <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-500 group-hover:text-foreground">
        {skill.name}
      </span>
      <span className="ml-4 text-[var(--muted-2)]">/</span>
    </div>
  )
}

/** Full-bleed, slow single-line marquee of the core stack. Pauses on hover. */
const TechMarquee = () => (
  <div className="fade-x relative w-full border-y border-[var(--border)] py-6">
    <div className="flex overflow-hidden">
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {[...featured, ...featured].map((skill, i) => (
          <Item key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  </div>
)

export default TechMarquee

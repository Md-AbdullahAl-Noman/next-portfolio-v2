'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

import { Tilt } from '@/components/ui/tilt'

interface ProjectCardProps {
  id: string
  name: string
  description: string
  img: string
  techstack: string[]
  index?: number
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  img,
  techstack,
  index = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link href={`/projects/${id}`} className="block h-full">
        <Tilt max={4} className="h-full">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="card-surface card-surface-hover group relative flex h-full flex-col overflow-hidden rounded-2xl"
          >
          {/* mouse spotlight */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(34,211,238,0.08), transparent 65%)',
            }}
          />

          {/* image */}
          <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--border)] bg-[#0d1426]">
            <Image
              src={img}
              alt={`${name} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* content */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-cyan-300">
                {name}
              </h3>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-slate-500 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 group-hover:text-cyan-300">
                <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </div>

            <p className="line-clamp-2 text-sm leading-relaxed text-muted">
              {description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {techstack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-[var(--border)] bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-slate-400 transition-colors duration-300 group-hover:border-cyan-400/25"
                >
                  {tech}
                </span>
              ))}
              {techstack.length > 4 && (
                <span className="rounded-md px-2 py-1 font-mono text-[11px] text-slate-500">
                  +{techstack.length - 4}
                </span>
              )}
            </div>
          </div>
          </div>
        </Tilt>
      </Link>
    </motion.div>
  )
}

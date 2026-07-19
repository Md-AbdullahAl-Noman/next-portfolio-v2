'use client'

import { useRef } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Link from 'next/link'

import LivePreview from '@/components/ui/live-preview'
import SectionHeading from '@/components/ui/section-heading'

import projects from '@/data/projects.json'

interface Project {
  id: string
  name: string
  description: string
  img: string
  techstack: string[]
  links?: { live?: string; github?: string }
}

/**
 * Sticky stacked card: each project pins to the top and scales down slightly
 * as the next one slides over it, leaving a thin peek of the card beneath.
 */
const StackCard = ({
  project,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}) => {
  const reversed = index % 2 === 1
  const targetScale = 1 - (total - index) * 0.045
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div className="sticky top-0 flex min-h-screen items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(6vh + ${index * 26}px)` }}
        className="relative w-full origin-top will-change-transform"
      >
        <div className="group block">
          <div className="grid overflow-hidden rounded-[1.75rem] border border-[var(--border-strong)] bg-[#0a0e1c] shadow-[0_50px_140px_-50px_rgba(0,0,0,0.95)] md:grid-cols-2">
            {/* live preview */}
            <div
              className={`relative aspect-[16/11] overflow-hidden md:aspect-auto md:min-h-[440px] ${
                reversed ? 'md:order-2' : ''
              }`}
            >
              <LivePreview
                src={project.links?.live}
                poster={project.img}
                alt={`${project.name} preview`}
              />
            </div>

            {/* copy */}
            <div
              className={`flex flex-col justify-between gap-10 p-8 sm:p-12 ${
                reversed ? 'md:order-1' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="label-mono text-[var(--primary)]">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <ArrowUpRightIcon className="size-5 text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--primary)]" />
              </div>

              <div className="space-y-5">
                <Link
                  href={`/projects/${project.id}`}
                  data-cursor="View"
                  className="block"
                >
                  <h3 className="font-display text-3xl font-light tracking-tight text-foreground transition-colors duration-300 group-hover:text-[var(--primary)] sm:text-4xl lg:text-5xl">
                    {project.name}
                  </h3>
                </Link>
                <p className="max-w-md leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-[var(--border)] pt-6">
                {project.techstack.map((tech) => (
                  <span key={tech} className="label-mono !text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Projects = () => {
  const featured = projects.filter((project) => project.featured === true)
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <div className="space-y-16 py-24 md:space-y-20 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title={
            <>
              Built to <span className="accent-italic">ship</span>
            </>
          }
          description="Real products solving real problems in production."
        />
        <Link
          href="/projects"
          className="link-underline mb-2 inline-flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-foreground"
        >
          View all projects
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>

      <div ref={container} className="relative">
        {featured.map((project, index) => (
          <StackCard
            key={project.id}
            project={project}
            index={index}
            total={featured.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects

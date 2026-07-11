'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import SectionHeading from '@/components/ui/section-heading'

import projects from '@/data/projects.json'

interface Project {
  id: string
  name: string
  description: string
  img: string
  techstack: string[]
}

const WorkRow = ({ project, index }: { project: Project; index: number }) => {
  const reversed = index % 2 === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group grid items-center gap-8 py-6 md:grid-cols-2 md:gap-16"
      >
        {/* image */}
        <div
          className={`card-surface relative aspect-[16/10] w-full overflow-hidden rounded-2xl transition-all duration-500 group-hover:border-[var(--border-strong)] ${
            reversed ? 'md:order-2' : ''
          }`}
        >
          <Image
            src={project.img}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-[#0a0a0b]/25 transition-opacity duration-500 group-hover:opacity-0" />
          {/* hover CTA */}
          <div className="absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[#0a0a0b]/80 px-4 py-2 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
              View project
            </span>
            <ArrowUpRightIcon className="size-3.5 text-[var(--primary)]" />
          </div>
        </div>

        {/* copy */}
        <div className={`space-y-5 ${reversed ? 'md:order-1' : ''}`}>
          <span className="label-mono text-[var(--primary)]">
            {String(index + 1).padStart(2, '0')}
          </span>

          <h3 className="flex items-center gap-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-4xl">
            {project.name}
            <ArrowUpRightIcon className="size-6 text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--primary)]" />
          </h3>

          <p className="max-w-md leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
            {project.techstack.map((tech) => (
              <span key={tech} className="label-mono !text-muted">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
      {index < projects.filter((p) => p.featured).length - 1 && (
        <div className="hairline mt-6" />
      )}
    </motion.div>
  )
}

const Projects = () => {
  const featured = projects.filter((project) => project.featured === true)

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

      <div className="space-y-10 md:space-y-14">
        {featured.map((project, index) => (
          <WorkRow key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Projects

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'

import { Button } from '@/components/ui/button'

interface ProjectContentProps {
  data: {
    id: string
    name: string
    description: string
    img: string
    techstack: string[]
    links: {
      github: string
      live: string
    }
    figma_link: string
  }
}

const ProjectContent: React.FC<ProjectContentProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-10 py-24"
    >
      <Link
        href="/projects"
        className="link-underline inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3.5" />
        Back to projects
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--border)] pb-8">
        <h1 className="font-display text-4xl font-light tracking-tight sm:text-5xl">
          {data.name}
        </h1>
        <div className="flex flex-wrap gap-3">
          <Link href={data.links.live} target="_blank">
            <Button>
              Live demo
              <ArrowUpRightIcon className="size-4" />
            </Button>
          </Link>
          <Link href={data.links.github} target="_blank">
            <Button variant="outline">
              Source code
              <ArrowUpRightIcon className="size-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="card-surface relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <Image
          src={data.img}
          alt={`${data.name} preview`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          className="object-cover object-top"
        />
      </div>

      <div className="grid gap-10 md:grid-cols-[1.4fr_0.6fr] md:gap-16">
        <div className="space-y-4">
          <h2 className="label-mono text-[var(--primary)]">
            About this project
          </h2>
          <p className="leading-relaxed text-muted">{data.description}</p>
        </div>
        <div className="space-y-4">
          <h2 className="label-mono text-[var(--primary)]">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {data.techstack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectContent

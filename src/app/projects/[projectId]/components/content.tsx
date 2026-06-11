'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaLink } from 'react-icons/fa'

import { SiGithub } from '@icons-pack/react-simple-icons'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

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
      className="space-y-8 py-24"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {data.name}
        </h1>
        <Link href="/projects">
          <Button variant="outline">
            <ChevronLeftIcon className="size-4" />
            <span className="hidden sm:block">Back to projects</span>
          </Button>
        </Link>
      </div>

      <div className="card-surface relative flex h-[320px] w-full items-center justify-center overflow-hidden rounded-3xl sm:h-[420px] md:h-[520px]">
        <Image
          src={data.img}
          alt={`${data.name} preview`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          className="object-contain p-4"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
            About this project
          </h2>
          <p className="leading-relaxed text-muted">{data.description}</p>
        </div>
        <div className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.techstack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--border)] bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link href={data.links.live} target="_blank">
          <Button>
            <FaLink className="size-4" />
            Live demo
          </Button>
        </Link>
        <Link href={data.links.github} target="_blank">
          <Button variant="outline">
            <SiGithub className="size-4" />
            Source code
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

export default ProjectContent

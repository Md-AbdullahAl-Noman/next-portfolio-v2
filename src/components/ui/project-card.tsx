'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link href={`/projects/${id}`} className="group block h-full">
        <div className="card-surface card-surface-hover flex h-full flex-col overflow-hidden rounded-2xl">
          {/* image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border)]">
            <Image
              src={img}
              alt={`${name} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>

          {/* content */}
          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-light tracking-tight text-foreground transition-colors duration-300 group-hover:text-[var(--primary)]">
                {name}
              </h3>
              <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
            </div>

            <p className="line-clamp-2 text-sm leading-relaxed text-muted">
              {description}
            </p>

            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3">
              {techstack.slice(0, 4).map((tech) => (
                <span key={tech} className="label-mono !text-muted">
                  {tech}
                </span>
              ))}
              {techstack.length > 4 && (
                <span className="label-mono">+{techstack.length - 4}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

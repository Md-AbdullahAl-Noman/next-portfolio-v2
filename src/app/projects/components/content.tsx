'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import { ProjectCard } from '@/components/ui/project-card'
import SectionHeading from '@/components/ui/section-heading'

import projects from '@/data/projects.json'

const ProjectContent = () => {
  return (
    <div className="flex flex-col space-y-14 py-24">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/"
          className="link-underline inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back home
        </Link>
      </motion.div>

      <SectionHeading
        index="→"
        eyebrow="Archive"
        title={
          <>
            All <span className="accent-italic">projects</span>
          </>
        }
        description="The full collection — client work, platforms, and experiments."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            img={project.img}
            techstack={project.techstack}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectContent

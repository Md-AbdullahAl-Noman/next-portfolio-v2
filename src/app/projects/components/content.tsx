'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/ui/project-card'
import SectionHeading from '@/components/ui/section-heading'

import projects from '@/data/projects.json'

const ProjectContent = () => {
  return (
    <div className="flex flex-col space-y-14 py-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <Button variant="outline">
            <ChevronLeftIcon className="size-4" />
            Back home
          </Button>
        </Link>
      </motion.div>

      <SectionHeading
        index="//"
        eyebrow="Archive"
        title={
          <>
            All <span className="text-gradient">projects</span>
          </>
        }
        description="The full collection — client work, platforms, and experiments."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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

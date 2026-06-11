'use client'

import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/ui/project-card'
import SectionHeading from '@/components/ui/section-heading'

import projects from '@/data/projects.json'

const Projects = () => {
  const featured = projects.filter((project) => project.featured === true)

  return (
    <div className="flex flex-col items-center space-y-14 py-24 md:py-32">
      <SectionHeading
        index="04"
        eyebrow="Projects"
        title={
          <>
            Built to <span className="text-gradient">ship</span>
          </>
        }
        description="Selected work — real products solving real problems in production."
      />

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, index) => (
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/projects">
          <Button variant="outline">
            View all projects
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

export default Projects

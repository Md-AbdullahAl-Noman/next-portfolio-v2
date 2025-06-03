'use client'

import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { motion, useAnimation, useInView, Variants } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { ProjectCard } from '@/components/ui/project-card'

import projects from '@/data/projects.json'
import TitleBar from '@/components/ui/title'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const projectsFiltered = projects.filter(
    (project) => project.featured === true,
  )

  const projectVariants: Variants = {
    hidden: {
      y: -0.1,
    },
    visible: {
      y: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.25,
        staggerDirection: 1,
        when: 'beforeChildren',
      },
    },
  }

  const projectChildVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={projectVariants}
      initial="hidden"
      animate={controls}
      className="flex flex-col items-center justify-center space-y-16 py-16"
    >
      <div className="flex w-full items-start justify-center">
        <div className="  ml-14 w-[300px] rounded-r-md bg-gray-200 md:ml-16">
          <TitleBar text="Projects" strokeColor="black" />
        </div>
      </div>
      <motion.div
        variants={projectChildVariants}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {projectsFiltered.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            img={project.img}
            techstack={project.techstack}
          />
        ))}
      </motion.div>
      <motion.div variants={projectChildVariants}>
        <Link href="/projects">
          <Button>
            <div className="flex items-center justify-center gap-2">
              View All Projects
              <ArrowRightIcon className="social mb-1 size-6 transform duration-300 ease-out will-change-transform group-hover:-rotate-45 group-hover:scale-90 group-hover:text-[var(--foreground)]" />
            </div>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default Projects

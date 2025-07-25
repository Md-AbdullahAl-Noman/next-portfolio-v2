'use client'

import { motion, useAnimation, useInView, Variants } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { Heading } from '@/components/ui/heading'
import Linemaker from '@/components/ui/line'
import TitleBar from '@/components/ui/title'

interface TimelineItem {
  year: string
  title: string
  description: string
  icon: string
}

const timelineData: TimelineItem[] = [
  {
    year: '2025',
    title: 'Senior Software Engineer @ Autoworx',
    description:
      'Led multiple successful projects and mentored junior developers',
    icon: '/business-development.gif',
  },
  {
    year: '2024',
    title: 'Junior Software Engineer',
    description:
      'Contributed to a successful project and learned new technologies',
    icon: '/target.gif',
  },
  {
    year: '2024',
    title: 'Internship',
    description: 'Worked as a software developer intern',
    icon: '/trophy.gif',
  },
]

const About = () => {
  return (
    <motion.div className="space-y-16 py-16">
      <div className="flex w-full items-start justify-center">
        <div className=" ml:14 w-[300px] rounded-r-md bg-gray-200 md:ml-16">
          <TitleBar text="About" strokeColor="black" />
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2">
        <ProfileImage />
        <ProfileContent />
      </div>

      {/* Yellow Borders */}

      <div className="absolute top-[744px] hidden h-3 w-3 rounded-xl md:block">
        <Linemaker direction="horizontal" width="1810px" />
      </div>

      <div className="absolute bottom-0 right-0 top-[744px] hidden w-3 rounded-xl md:block">
        <Linemaker direction="vertical" height="738px" width="6px" />
      </div>

      <div className="absolute left-[100px] top-[1482px] hidden h-3 w-3 rounded-xl md:block">
        <Linemaker direction="horizontal" width="2430px" />
      </div>
      <div className="hidden md:block">
        <Experience />
      </div>
    </motion.div>
  )
}

const ProfileImage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const profileImageVariants: Variants = {
    hidden: { width: '100%' },
    visible: {
      width: '0%',
      transition: {
        ease: 'circOut',
        duration: 1.2,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="relative aspect-square h-full w-full md:max-h-[450px] md:max-w-[450px]"
    >
      <Image
        src="/main-photo.png"
        alt={'profile picture'}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        className="aspect-square rounded object-contain"
      />
      <motion.div
        variants={profileImageVariants}
        initial="hidden"
        animate={controls}
        className="absolute h-full w-full bg-[var(--foreground)]"
      />
    </motion.div>
  )
}

const ProfileContent = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const profileContentVariants: Variants = {
    hidden: {
      x: 0.1,
    },
    visible: {
      x: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.25,
        staggerDirection: 1,
        when: 'beforeChildren',
      },
    },
  }

  const profileContentChildVariants: Variants = {
    hidden: { x: 30, opacity: 0 },
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
      variants={profileContentVariants}
      initial="hidden"
      animate={controls}
      className="flex flex-col items-start space-y-4"
    >
      <motion.div
        variants={profileContentChildVariants}
        className="text-2xl font-semibold"
      >
        Hi, I&apos;m{' '}
        <span className="text-[var(--primary)]">Md Abdullah Al Noman</span>
      </motion.div>
      <div className="space-y-4 text-justify">
        <motion.div variants={profileContentChildVariants}>
          🌟 A passionate software engineer and full-stack developer with
          expertise in building scalable, interactive, and efficient web
          applications. I specialize in modern web technologies and have a
          strong foundation in problem-solving, project management, and user
          experience design.
        </motion.div>
        <motion.div variants={profileContentChildVariants}>
          🎓 I am a graduating student from the American International
          University-Bangladesh with a Bachelor’s Degree in Computer Science and
          Engineering, maintaining a CGPA of 3.88. I have consistently been
          awarded academic scholarships for outstanding performance.
        </motion.div>
        <motion.div variants={profileContentChildVariants}>
          💻 Currently, I am working as a Lead Software Engineer Autoworx, where
          I design and develop responsive web applications using Nest JS,
          Next.js, React, and other modern technologies. I am also actively
          learning DevOps and enhancing my skills in Linux to broaden my
          expertise.
        </motion.div>
        <motion.div variants={profileContentChildVariants}>
          🚀 My interests include solving problems on LeetCode to refine my
          understanding of data structures and algorithms, as well as exploring
          machine learning to apply innovative solutions to real-world
          challenges.
        </motion.div>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-active')
          }
        })
      },
      {
        threshold: 1,
      },
    )

    const timelineItems = document.querySelectorAll('.timeline-item')
    timelineItems.forEach((item) => {
      observerRef.current?.observe(item)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Timeline Line - Hidden on small screens */}
        <div className="relative mt-12" ref={timelineRef}>
          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 transform md:block">
            <Linemaker direction="vertical" height="740px" width="6px" />
          </div>

          {/* Mobile-optimized timeline */}
          <div className="space-y-8 md:space-y-16">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`timeline-item relative opacity-0 transition-all duration-1000 ease-out ${
                  index % 2 === 0 ? 'left-item' : 'right-item'
                }`}
              >
                {/* For medium screens and up - Side by side layout */}
                <div
                  className={`hidden items-center md:flex ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'
                    }`}
                  >
                    <div className="m-4 transform rounded-lg bg-gray-800 p-6 shadow-xl transition-transform duration-300 hover:scale-105">
                      <span className="font-semibold text-emerald-400">
                        {item.year}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="rounded-full bg-gray-600 px-2 py-2 shadow-lg">
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          className="rounded-full bg-black"
                          width={42}
                          height={42}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* For small screens - Stacked layout */}
                <div className="block md:hidden">
                  <div className="mb-3 flex items-center space-x-4">
                    <div className="rounded-full bg-gray-600 px-2 py-2 shadow-lg">
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          className="rounded-full bg-black"
                          width={32}
                          height={32}
                        />
                      )}
                    </div>
                    <span className="font-semibold text-emerald-400">
                      {item.year}
                    </span>
                  </div>
                  <div className="rounded-lg bg-gray-800 p-4 shadow-xl">
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default About

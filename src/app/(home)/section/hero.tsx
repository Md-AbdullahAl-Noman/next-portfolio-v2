'use client'

import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'
import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'

import { FlipWords } from '@/components/flip-words'
import { Button } from '@/components/ui/button'
import { PointerHighlight } from '@/components/ui/pointer'
import SideAnimation from '@/components/ui/side-circle'
import StackLoader from '@/components/ui/stack'
import { GiBugleCall } from 'react-icons/gi'
import { Link as ScrollLink } from 'react-scroll'
import CodeCard from '@/components/ui/code'

const Hero = () => {
  const firstName = [
    'M',
    'd',
    ' ',
    'A',
    'b',
    'd',
    'u',
    'l',
    'l',
    'a',
    'h',
    ' ',
    'A',
    'l',
  ]
  const lastName = ['N', 'o', 'm', 'a', 'n']

  const heroVariants: Variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.25,
        staggerDirection: 1,
        when: 'beforeChildren',
      },
    },
  }

  const heroChildVariants: Variants = {
    initial: {
      x: -30,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const letterVariants: Variants = {
    initial: {
      y: 40,
    },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  }

  const letterChildVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const socialChildVariants: Variants = {
    initial: {
      x: 30,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      variants={heroVariants}
      initial="initial"
      animate="animate"
      className="static flex min-h-[90vh] w-full flex-col items-start justify-center space-y-3 px-4 pb-[10vh] md:space-y-5 md:px-6 lg:px-8"
    >
      {/* HERO HEADING */}
      <motion.div
        variants={letterVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"
      >
        <div className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-7xl">
          {firstName.map((letter, index) => (
            <motion.span
              variants={letterChildVariants}
              key={index}
              className={`cursor-default transition-colors duration-500 ease-out hover:text-[var(--primary)] ${
                letter === ' ' ? 'mr-2' : ''
              }`}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <div className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-7xl">
          {lastName.map((letter, index) => (
            <motion.span
              variants={letterChildVariants}
              key={index}
              className="cursor-default transition-colors duration-500 ease-out hover:text-[var(--primary)]"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Update the FlipWords component with your roles */}
      <motion.div
        variants={heroChildVariants}
        className="relative h-[28px] w-full overflow-hidden"
      >
        <FlipWords
          className="absolute m-0 whitespace-nowrap p-0 font-serif text-base uppercase italic sm:text-lg"
          words={[
            'Software Engineer',
            'Full Stack Developer',
            'DevOps Enthusiast',
          ]}
          duration={2000} // Reduced duration for faster animation
        />
      </motion.div>

      {/* HERO BUTTONS */}
      <div className="flex flex-col space-y-3 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:pt-2">
        <motion.div variants={heroChildVariants} className="w-full sm:w-auto">
          <ScrollLink to="contact" smooth={true} duration={500} delay={200}>
            <Button className="w-full sm:w-auto">
              <div className="flex items-center justify-center">
                <GiBugleCall className="mb-1 mr-2 size-4" />
                Connect with me
              </div>
            </Button>
          </ScrollLink>
        </motion.div>
        <motion.div variants={heroChildVariants} className="w-full sm:w-auto">
          <Link
            href={'/MdAbdullahAlNoman_Resume_SoftwareEngineer.pdf'}
            target="_blank"
          >
            <Button className="w-full sm:w-auto">
              <div className="flex items-center justify-center">
                <DocumentArrowDownIcon className="mb-1 mr-2 size-4" />
                Resume
              </div>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* HERO QUOTE - Responsive adjustments */}
      <motion.div
        variants={heroChildVariants}
        className="w-full pt-8 sm:pt-12 md:pt-16"
      >
        <PointerHighlight>
          <FlipWords
            className="rounded-r-lg border-l-4 border-cyan-400 bg-gray-800/20 p-3 pl-3 text-sm italic text-gray-400 backdrop-blur-sm sm:p-4 sm:pl-4 sm:text-base md:text-lg"
            words={[
              'Turning complex problems into elegant solutions, one line of code at a time.',
              'Transforming complex problems into elegant solutions, one line of code at a time.',
              'Turning complexities into elegant solutions with every line of code.',
            ]}
            duration={3000}
          />
        </PointerHighlight>
      </motion.div>

      {/* SOCIAL BAR - Mobile Version */}
      <motion.div
        variants={socialChildVariants}
        className="absolute bottom-24 left-10 flex justify-center px-2 sm:hidden"
      >
        <div className="-left-8 scale-75">
          <CodeCard />
        </div>
      </motion.div>

      {/* SOCIAL BAR - Desktop Version */}
      <motion.div
        variants={socialChildVariants}
        className="absolute bottom-[15%] right-[45%] hidden flex-col space-y-4 sm:flex lg:right-[30%] xl:right-[15%]"
      >
        <CodeCard />
      </motion.div>
      <motion.div
        variants={socialChildVariants}
        className="absolute bottom-[45%] right-[2%] hidden flex-col space-y-4 sm:flex"
      >
        <SideAnimation />
      </motion.div>
    </motion.div>
  )
}

export default Hero

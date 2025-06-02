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
      className="static flex h-[90vh] w-full flex-col items-start justify-center space-y-3 pb-[10vh] md:space-y-5"
    >
      {/* HERO HEADING */}
      <motion.div
        variants={letterVariants}
        initial="initial"
        animate="animate"
        className="flex space-x-4"
      >
        <div className="text-4xl font-bold sm:text-5xl md:text-7xl">
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
        <div className="text-4xl font-bold sm:text-5xl md:text-7xl">
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
      <motion.div variants={heroChildVariants} className="relative h-[28px]">
        <FlipWords
          className="absolute m-0 whitespace-nowrap p-0 font-serif text-lg uppercase italic"
          words={[
            'Software Engineer',
            'Full Stack Developer',
            'DevOps Enthusiast',
          ]}
          duration={2000} // Reduced duration for faster animation
        />
      </motion.div>
      {/* HERO SUBHEADING */}

      {/* HERO BUTTONS */}
      <div className="flex flex-row space-x-4 pt-2">
        <motion.div variants={heroChildVariants}>
          <ScrollLink to="contact" smooth={true} duration={500} delay={200}>
            <Button className="">
              <div className="flex items-center justify-center">
                <GiBugleCall className="mb-1 mr-2 size-4" />
                Connect with me
              </div>
            </Button>
          </ScrollLink>
        </motion.div>
        <motion.div variants={heroChildVariants}>
          <Link
            href={'/MdAbdullahAlNoman_Resume_SoftwareEngineer.pdf'}
            target="_blank"
          >
            <Button>
              <div className="flex items-center justify-center">
                <DocumentArrowDownIcon className="mb-1 mr-2 size-4" />
                Resume
              </div>
            </Button>
          </Link>
        </motion.div>
      </div>
      <motion.div variants={heroChildVariants} className="pt-16">
        <PointerHighlight>
          <FlipWords
            className="rounded-r-lg border-l-4 border-cyan-400 bg-gray-800/20 p-4 pl-4 text-lg italic text-gray-400 backdrop-blur-sm"
            words={[
              'Turning complex problems into elegant solutions, one line of code at a time.',
              'Transforming complex problems into elegant solutions, one line of code at a time.',
              'Turning complexities into elegant solutions with every line of code.',
            ]}
            duration={3000}
          />
        </PointerHighlight>
      </motion.div>

     

      {/* SOCIAL BAR */}
      <motion.div
        variants={socialChildVariants}
        className="absolute right-12 hidden flex-col space-y-4 sm:flex 2xl:space-y-6"
      >
        {/* {socials.map((social) => (
          <span key={social.name} className="social">
            <Link href={social.href}>{social.icon}</Link>
          </span>
        ))} */}
        <SideAnimation />
      </motion.div>
    </motion.div>
  )
}

export default Hero

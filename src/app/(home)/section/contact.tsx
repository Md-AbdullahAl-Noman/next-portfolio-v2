'use client'

import Image from 'next/image'

import { useEffect, useRef } from 'react'
import { motion, Variants, useAnimation, useInView } from 'framer-motion'

import ContactForm from '@/components/contact-form'
import { Heading } from '@/components/ui/heading'
import StackLoader from '@/components/ui/stack'
import TitleBar from '@/components/ui/title'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const contactVariants: Variants = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={contactVariants}
      initial="hidden"
      animate={controls}
      className="flex w-full justify-between space-x-4 py-16"
    >
      <div className="relative mr-28 hidden aspect-square h-full w-full md:flex">
        <Image
          src="/pair-programming.png"
          alt="contact"
          width={1920}
          height={1080}
          priority
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-12 bg-[var(--foreground)]">
        <div className="flex w-full items-start justify-start">
          <div className="w-[300px] -mt-6 ml-4 rounded-r-md bg-gray-200 md:ml-8">
            <TitleBar text="Contact" strokeColor="black" />
          </div>
        </div>
        <motion.div variants={contactVariants}>
          <ContactForm />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact
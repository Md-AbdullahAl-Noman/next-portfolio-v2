'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { motion, type Variants } from 'framer-motion'

import ContactForm from '@/components/contact-form'
import SectionHeading from '@/components/ui/section-heading'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const fadeUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const details = [
  { label: 'Location', value: 'Dhaka, Bangladesh — open to remote' },
  { label: 'Response time', value: 'Usually within 24 hours' },
  { label: 'Currently', value: 'Open to select opportunities' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/Md-AbdullahAl-Noman' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alnoman-se/' },
]

const Contact = () => {
  return (
    <div className="space-y-16 py-24 md:space-y-20 md:py-32">
      <SectionHeading
        index="05"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something{' '}
            <span className="accent-italic">great</span>
          </>
        }
        description="Whether it's architecting a new platform, rescuing a stalled codebase, or joining a team that ships — tell me what you're building."
      />

      <div className="grid w-full gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* LEFT — details */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col justify-between gap-12"
        >
          <div>
            {details.map(({ label, value }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex flex-col gap-1 border-t border-[var(--border)] py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="label-mono shrink-0">{label}</span>
                <span className="text-sm text-foreground sm:text-right">
                  {value}
                </span>
              </motion.div>
            ))}
            <div className="hairline" />
          </div>

          <motion.div variants={fadeUp} className="flex items-center gap-8">
            <span className="label-mono">Elsewhere</span>
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-foreground"
              >
                {label}
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  )
}

export default Contact

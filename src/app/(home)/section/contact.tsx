'use client'

import { motion, type Variants } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/solid'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

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

const channels = [
  {
    icon: EnvelopeIcon,
    label: 'Email',
    value: 'Drop a line anytime',
  },
  {
    icon: MapPinIcon,
    label: 'Based in',
    value: 'Dhaka, Bangladesh — open to remote',
  },
  {
    icon: ClockIcon,
    label: 'Response time',
    value: 'Usually within 24 hours',
  },
]

const Contact = () => {
  return (
    <div className="space-y-16 py-24 md:py-32">
      <SectionHeading
        index="05"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something{' '}
            <span className="text-gradient">great</span>
          </>
        }
        description="Have a project, role, or idea in mind? My inbox is always open."
      />

      <div className="grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* LEFT — pitch + channels */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col space-y-8"
        >
          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed text-muted"
          >
            Whether it&apos;s architecting a new platform, rescuing a stalled
            codebase, or joining a team that ships — I&apos;m interested.
            Tell me what you&apos;re building.
          </motion.p>

          <div className="space-y-4">
            {channels.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="card-surface group flex items-center gap-4 rounded-2xl p-4 transition-colors duration-300 hover:border-cyan-400/40"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/[0.07] text-cyan-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="size-5" />
                </span>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    {label}
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    {value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-600">
              Or find me on
            </span>
            <span className="h-px w-8 bg-slate-700" />
            {[
              {
                icon: SiGithub,
                href: 'https://github.com/Md-AbdullahAl-Noman',
                label: 'GitHub',
              },
              {
                icon: SiLinkedin,
                href: 'https://www.linkedin.com/in/alnoman-se/',
                label: 'LinkedIn',
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:text-cyan-300"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="card-surface rounded-3xl p-6 sm:p-8"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  )
}

export default Contact

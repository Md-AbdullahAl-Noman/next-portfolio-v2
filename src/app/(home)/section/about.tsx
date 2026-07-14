'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'

import SectionHeading from '@/components/ui/section-heading'
import { Tilt } from '@/components/ui/tilt'

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

const facts = [
  { label: 'Role', value: 'Lead Software Engineer, Autoworx' },
  { label: 'Experience', value: '5+ years across frontend & backend' },
  { label: 'Education', value: 'B.Sc. CSE, AIUB — CGPA 3.88 / 4.00' },
  { label: 'Focus', value: 'TypeScript · Next.js · NestJS · System design' },
]

const About = () => {
  return (
    <div className="space-y-16 py-24 md:space-y-20 md:py-32">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            Engineering with <span className="accent-italic">intention</span>
          </>
        }
      />

      <div className="grid w-full gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        {/* PHOTO */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[380px] md:mx-0"
        >
          <Tilt max={4}>
            <div className="card-surface relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src="/main-photo.png"
                alt="Md Abdullah Al Noman"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </Tilt>
          <div className="mt-4 flex items-center justify-between">
            <span className="label-mono">Md Abdullah Al Noman</span>
            <span className="label-mono text-[var(--primary)]">Est. 2021</span>
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col justify-center space-y-8"
        >
          <motion.p
            variants={fadeUp}
            className="font-display text-2xl font-light leading-snug text-foreground sm:text-3xl"
          >
            I care about the whole product — clean architecture, fast
            interfaces, and code a team can grow on.
          </motion.p>

          <motion.p variants={fadeUp} className="leading-relaxed text-muted">
            Over five years I&apos;ve moved from building features to owning
            systems: today I lead engineering at{' '}
            <span className="text-foreground">Autoworx</span>, where I
            architect responsive web platforms with NestJS, Next.js, and React
            — owning delivery from database schema to production deploys, and
            mentoring the engineers around me.
          </motion.p>

          <motion.p variants={fadeUp} className="leading-relaxed text-muted">
            My foundation is a B.Sc. in Computer Science &amp; Engineering from
            American International University–Bangladesh, earned with academic
            scholarships throughout. Off the clock I sharpen the craft —
            algorithms, machine learning, and the DevOps &amp; Linux tooling
            that keeps systems honest.
          </motion.p>

          {/* fact rows */}
          <motion.dl variants={fadeUp} className="pt-2">
            {facts.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1 border-t border-[var(--border)] py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="label-mono shrink-0">{label}</dt>
                <dd className="text-sm text-foreground sm:text-right">
                  {value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </div>
  )
}

export default About

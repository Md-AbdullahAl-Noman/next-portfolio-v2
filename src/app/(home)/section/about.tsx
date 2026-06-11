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

const highlights = [
  { label: 'Lead Engineer @ Autoworx', dot: 'bg-cyan-400' },
  { label: 'B.Sc. CSE — CGPA 3.88', dot: 'bg-indigo-400' },
  { label: 'Academic Scholarship Awardee', dot: 'bg-emerald-400' },
  { label: 'DevOps & Linux Enthusiast', dot: 'bg-amber-400' },
]

const About = () => {
  return (
    <div className="space-y-16 py-24 md:py-32">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            Engineer. Builder. <span className="text-gradient">Leader.</span>
          </>
        }
      />

      <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* PHOTO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[420px]"
        >
          {/* rotating conic ring */}
          <div className="absolute -inset-3 rounded-3xl opacity-60">
            <div className="animate-spin-slow absolute inset-0 rounded-3xl bg-[conic-gradient(from_0deg,transparent_0%,#22d3ee_12%,transparent_25%,transparent_50%,#818cf8_62%,transparent_75%)] blur-md" />
          </div>
          <Tilt max={8} className="h-full w-full">
            <div className="card-surface relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src="/main-photo.png"
                alt="Md Abdullah Al Noman"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain p-2 transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </Tilt>
          {/* floating experience badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="card-surface absolute -bottom-5 -right-3 rounded-2xl px-5 py-3 shadow-xl sm:-right-6"
          >
            <div className="font-display text-2xl font-bold text-gradient">3+</div>
            <div className="text-xs text-muted">Years shipping</div>
          </motion.div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col space-y-6"
        >
          <motion.h3
            variants={fadeUp}
            className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Hi, I&apos;m{' '}
            <span className="text-cyan-300">Md Abdullah Al Noman</span>
          </motion.h3>

          <motion.p variants={fadeUp} className="leading-relaxed text-muted">
            A software engineer who cares about the whole product — clean
            architecture, fast interfaces, and code a team can grow on. I
            specialize in the modern TypeScript ecosystem and have a strong
            foundation in problem solving, system design, and developer
            experience.
          </motion.p>

          <motion.p variants={fadeUp} className="leading-relaxed text-muted">
            Currently I lead engineering at{' '}
            <span className="font-medium text-foreground">Autoworx</span>,
            where I architect and build responsive web platforms with NestJS,
            Next.js, and React — owning features from database schema to
            production deploys, while mentoring the engineers around me.
          </motion.p>

          <motion.p variants={fadeUp} className="leading-relaxed text-muted">
            I graduated from American International University–Bangladesh with
            a B.Sc. in Computer Science & Engineering (CGPA 3.88), earning
            academic scholarships throughout. Off the clock you&apos;ll find me
            grinding LeetCode, exploring machine learning, and leveling up my
            DevOps and Linux skills.
          </motion.p>

          {/* highlight chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
            {highlights.map(({ label, dot }) => (
              <span
                key={label}
                className="card-surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-slate-300"
              >
                <span className={`size-1.5 rounded-full ${dot}`} />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

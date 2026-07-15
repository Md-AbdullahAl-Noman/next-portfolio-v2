'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export const SectionHeading = ({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative flex flex-col gap-6',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {align === 'left' && (
        <span
          aria-hidden
          className="ghost-stroke pointer-events-none absolute -top-10 right-0 hidden font-display text-[9rem] font-light leading-none md:block"
        >
          {index}
        </span>
      )}
      <div
        className={cn(
          'flex w-full items-center gap-4',
          align === 'center' && 'justify-center',
        )}
      >
        <span className="label-mono text-[var(--primary)]">{index}</span>
        <span className="label-mono">{eyebrow}</span>
        {align === 'left' && <span className="hairline flex-1" />}
      </div>

      <h2 className="font-display text-4xl font-light leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="max-w-xl text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeading

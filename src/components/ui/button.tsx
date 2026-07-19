'use client'

import React from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = {
  variant?: 'solid' | 'outline' | 'ghost'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  children,
  className,
  type = 'button',
  onClick,
  disabled,
}) => {
  const base =
    'group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]'

  const variants = {
    solid:
      'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white shadow-[0_10px_36px_-12px_var(--glow)]',
    outline:
      'border border-[var(--border-strong)] text-foreground hover:border-[var(--primary)] hover:text-[var(--primary)]',
    ghost: 'text-muted hover:text-foreground',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
    >
      {/* light wash that slides in on hover for the solid variant */}
      {variant === 'solid' && (
        <span className="absolute inset-0 -z-0 translate-y-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-y-0" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </button>
  )
}

export default Button

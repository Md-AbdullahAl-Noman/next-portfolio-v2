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
    'group/btn relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050811] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.97]'

  const variants = {
    solid:
      'btn-shine bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-[0_8px_30px_-10px_rgba(34,211,238,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(34,211,238,0.7)] hover:brightness-110',
    outline:
      'border border-[var(--border-strong)] bg-white/[0.02] text-foreground backdrop-blur-sm hover:border-cyan-400/60 hover:bg-cyan-400/5 hover:text-cyan-300',
    ghost: 'text-muted hover:bg-white/5 hover:text-foreground',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  )
}

export default Button

import type { Metadata } from 'next'

import AnimatedBackground from '@/components/animated-background'
import CursorGlow from '@/components/cursor-glow'
import Footer from '@/components/navigation/footer'

export const metadata: Metadata = {
  title: 'Projects',
}

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative bg-background text-foreground">
      <AnimatedBackground />
      <CursorGlow />
      <div className="relative z-10">
        {children}
        <Footer />
      </div>
    </div>
  )
}

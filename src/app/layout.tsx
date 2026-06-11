import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

import { ToastProvider } from '@/providers/toast-provider'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Md Abdullah Al Noman',
    default: 'Md Abdullah Al Noman — Lead Software Engineer',
  },
  description:
    'Lead Software Engineer building scalable products with Next.js, NestJS and TypeScript.',
  keywords: [
    'abdullah al noman',
    'portfolio',
    'lead software engineer',
    'software engineer',
    'full stack developer',
    'next.js',
    'nestjs',
  ],
  metadataBase: new URL('https://mdabdullahalnoman.me'),
  openGraph: {
    title: 'Md Abdullah Al Noman',
    description: 'Lead Software Engineer',
    type: 'website',
    url: 'https://mdabdullahalnoman.me',
    images: ['/meta-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Abdullah Al Noman',
    description: 'Lead Software Engineer',
    images: ['/meta-card.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicons/icon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="theme-color" content="#050811" />
      </head>
      <body
        className={`${sans.variable} ${displayFont.variable} ${mono.variable} font-sans`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}

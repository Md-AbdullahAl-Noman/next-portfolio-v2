'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Link as ScrollLink } from 'react-scroll'

import { socials } from './social'
import LeafLoader from '../leaf'

const Footer = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex h-[300px] flex-col items-center justify-center space-y-8 border-t border-[var(--foreground)] py-20">
      <div className="cursor-pointer">
        {isHomePage ? (
          <ScrollLink to="hero" smooth={true} duration={500} delay={200}>
            <Image src="/noman_circle.png" alt="logo" width={48} height={48} />
          </ScrollLink>
        ) : (
          <Link href="/">
            <Image src="/noman_circle.png" alt="logo" width={28} height={28} />
          </Link>
        )}
      </div>
      <div className="flex flex-row space-x-6">
        {socials.map((social) => (
          <div
            key={social.name}
            className="cursor-pointer font-bold text-neutral-400 transition-colors duration-300 ease-out hover:text-[var(--accent)]"
          >
            <Link href={social.href}>{social.name}</Link>
          </div>
        ))}
      </div>
      <div className="text-medium text-neutral-400">
        © {currentYear} • Md Abdullah Al Noman • All Rights Reserved.
      </div>
      <LeafLoader />
    </footer>
  )
}

export default Footer

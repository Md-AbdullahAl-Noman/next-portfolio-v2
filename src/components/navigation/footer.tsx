'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Link as ScrollLink } from 'react-scroll'

import { socials } from './social'
import LeafLoader from '../leaf'
import BoxComponent from '../ui/box'

const Footer = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative flex h-[350px] flex-col items-center justify-center space-y-4 border-t border-[var(--foreground)] py-20">
      <div className="cursor-pointer ">
        <BoxComponent />
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
      <div className="text-medium text-neutral-400 mb-8" >
        © {currentYear} • Md Abdullah Al Noman • All Rights Reserved.
      </div>
      <div className='absolute bottom-0 left-0 right-0 flex justify-center'>
        <LeafLoader />
      </div>
    </footer>
  )
}

export default Footer

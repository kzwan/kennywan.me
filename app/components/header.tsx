'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import frog from '../../content/assets/frog.png'

const baseNavLinks = [
  { href: '/blog', title: 'Blog' },
  { href: '/projects', title: 'Projects' },
  { href: '/wall', title: 'Wall' },
  { href: '/contact', title: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navLinks = session 
    ? [...baseNavLinks, { href: '/admin', title: 'Admin' }]
    : baseNavLinks

  return (
    <header className="py-10">
      <div className="flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image 
              src={frog} 
              alt="Home" 
              width={50} 
              height={48}
              className=""
            />
        </Link>
        
        <nav className="flex gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-black hover:text-[#3a6e48] hover:underline font-semibold text-xl rounded transition ${
                pathname === link.href ? 'text-primary-500' : ''
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
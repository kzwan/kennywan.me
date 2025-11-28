'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import frog from '../../content/assets/frog.png'
import frogg from '../../content/assets/froggg.png'

const baseNavLinks = [
  { href: '/blog', title: 'blog' },
  { href: '/projects', title: 'projects' },
  { href: '/wall', title: 'wall' },
  { href: '/contact', title: 'contact' },
]

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navLinks = session 
    ? [...baseNavLinks, { href: '/admin', title: 'admin' }]
    : baseNavLinks

  return (
    <header className="py-10">
      <div className="flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image 
              src={frogg} 
              alt="Home" 
              width={85} 
              height={85}
              className=""
            />
        </Link>
        
        <nav className="flex gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-black hover:text-[#3a6e48] font-semibold text-xl rounded transition ${
                pathname === link.href 
                  ? 'underline decoration-[#3a6e48] decoration-4 text-[#3a6e48] font-bold' 
                  : 'hover:underline hover:decoration-[#3a6e48] hover:decoration-4 font-bold'
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
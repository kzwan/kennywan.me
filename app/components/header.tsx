'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const baseNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/projects', title: 'Projects' },
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
        <Link href="/blog" className="text-2xl font-bold">
          My Blog
        </Link>
        
        <nav className="flex gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded hover:bg-gray-800 transition ${
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
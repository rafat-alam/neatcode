'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/problems', label: 'Problems' },
    { href: '/contest', label: 'Contest' },
    { href: '/compiler', label: 'Compiler' },
    { href: '/messages', label: 'Messages' },
  ]

  return (
    <>
      <nav className="h-16 flex gap-10 p-4 bg-gray-100">
        {links.map(link => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 font-semibold rounded flex items-center justify-center ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
        <input className='bg-white'/>
      </nav>
    </>
  )
}

export default Header
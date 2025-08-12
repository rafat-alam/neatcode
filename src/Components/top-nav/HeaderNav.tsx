'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const HeaderNav = () => {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'NEATCODE' },
    { href: '/problems', label: 'Problems' },
    { href: '/contest', label: 'Contest' },
    { href: '/compiler', label: 'Compiler' },
    { href: '/messages', label: 'Messages' },
  ]

  return (
    <div className='flex gap-10 items-center'>
      {links.map(link => {
        const isActive = pathname === link.href
        const isneat = link.label === 'NEATCODE'
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 font-semibold rounded flex items-center justify-center ${
              isActive && !isneat
                ? 'bg-blue-600 text-white'
                : (isneat ? 'text-2xl px-5' :'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:text-gray-700')
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}

export default HeaderNav
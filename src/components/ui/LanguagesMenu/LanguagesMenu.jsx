'use client'

import { useState, useRef, useEffect } from 'react'
import { languages } from '@/consts/languages'
import { usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function LanguageMenu() {
  const { locale } = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const handleSelect = (langCode) => {
    router.push(pathname, { locale: langCode })
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="py-[6px] pl-[38px] pr-[36px] bg-[var(--color-main)] text-[var(--color-light-neutral)] font-medium cursor-pointer select-none flex items-center"
      >
        {locale.toUpperCase()}
      </div>

      <Image
        src="/icons/language-icon.svg"
        width={20}
        height={20}
        alt="lang"
        className="pointer-events-none absolute top-[6px] left-[12px] flex items-center"
      />

      <Image
        src="/icons/arrow-down.svg"
        width={12}
        height={12}
        alt="arrow-down"
        className={`pointer-events-none absolute top-[10px] right-[6px] flex items-center transition-custom ${
          open ? 'rotate-180' : ''
        }`}
      />

      {open && (
        <ul className="absolute left-0 right-0 bg-[var(--color-main)] text-[var(--color-light-neutral)] rounded-md shadow-lg z-10">
          {languages.map((lang) => (
            <li
              key={lang}
              onClick={() => handleSelect(lang)}
              className="px-4 py-2 hover:bg-[var(--color-light-neutral)] hover:text-[var(--color-main)] cursor-pointer"
            >
              {lang.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

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
        className="flex cursor-pointer items-center py-[6px] pr-[36px] pl-[38px] font-medium select-none"
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
        className={`transition-custom pointer-events-none absolute top-[10px] right-[6px] flex items-center ${
          open ? 'rotate-180' : ''
        }`}
      />

      {open && (
        <ul className="absolute right-0 left-0 z-10 rounded-md bg-(--color-light-neutral) shadow-lg">
          {languages.map((lang) => (
            <li
              key={lang}
              onClick={() => handleSelect(lang)}
              className="cursor-pointer px-4 py-2 hover:bg-(--color-text-default) hover:text-(--color-light-neutral)"
            >
              {lang.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

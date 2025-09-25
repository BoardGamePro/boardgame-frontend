'use client'

import { languages } from '@/consts/languages'
import { usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function LanguageMenu() {
  const { locale } = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (e) => {
    const langCode = e.target.value
    router.push(pathname, { locale: langCode })
  }

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={handleChange}
        className="border rounded-[15px] py-[3px] px-[10px] pr-[31px] border-none bg-white text-[var(--color-main)] font-semibold text-[20px] appearance-none focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
      <Image
        src="/icons/arrow-down.svg"
        width={32}
        height={32}
        alt="arrow-down"
        className="pointer-events-none absolute top-[2px] right-[1px] flex items-center"
      />
    </div>
  )
}

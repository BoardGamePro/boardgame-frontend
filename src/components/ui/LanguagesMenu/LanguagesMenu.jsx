'use client'

import { languages } from '@/consts/languages'
import { usePathname, useRouter } from '@/i18n/navigation'
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
    <select
      value={locale}
      onChange={handleChange}
      className="border rounded px-2 py-1"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  )
}

'use client'


import { languages } from '@/consts/languages'
import { useEffect, useState } from 'react'

export default function LanguageMenu() {
  const [selected, setSelected] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('lang')
    const defaultLang = languages[0]
    setSelected(saved || defaultLang)
  }, [])


  const handleChange = (e) => {
    const langCode = e.target.value
    setSelected(langCode)
    localStorage.setItem('lang', langCode)
    window.location.reload()
  }

  return (
    <select
      value={selected}
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

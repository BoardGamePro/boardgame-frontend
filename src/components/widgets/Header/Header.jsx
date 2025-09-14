import LanguageMenu from '@/components/ui/LanguagesMenu'
import React from 'react'

export default function Header() {
  return (
    <header className="flex">
      <div className="ml-auto mr-[15px]">
        <LanguageMenu />
      </div>
    </header>
  )
}

import LanguageMenu from '@/components/ui/LanguagesMenu'
import { Link } from '@/i18n/navigation'

import React from 'react'
import ProfileMenu from '../../widgets/ProfileMenu'

export default function Header() {
  return (
    <header className="flex bg-(--color-main) px-[calc((100%-1200px)/2)] py-[11px] text-(--color-light-neutral)">
      <Link href="/catalog" className="text-[32px] font-semibold text-white">
        DiceBook
      </Link>

      <div className="ml-auto flex items-center gap-[32px]">
        <LanguageMenu />
        <ProfileMenu />
      </div>
    </header>
  )
}

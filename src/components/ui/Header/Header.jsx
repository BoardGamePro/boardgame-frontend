import LanguageMenu from '@/components/ui/LanguagesMenu'
import { Link } from '@/i18n/navigation'

import React from 'react'
import ProfileMenu from '../../widgets/ProfileMenu'
import Image from 'next/image'
import AiLink from '../AiLink'
import GameSearchInput from '../GameSearchInput'

export default function Header() {
  return (
    <header className="flex justify-center border-b border-[#E5E5E5] bg-(--color-light-neutral) text-(--color-text-default)">
      <div className="flex w-[1200px] justify-between py-[15px]">
        <Link href="/" className="text-[32px] font-semibold">
          <Image src="/logo.svg" alt="Logo" width={208} height={50} />
        </Link>

        <GameSearchInput />

        <div className="flex items-center gap-[32px]">
          <LanguageMenu />
          <ProfileMenu />
          <AiLink />
        </div>
      </div>
    </header>
  )
}

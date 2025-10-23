import LanguageMenu from '@/components/ui/LanguagesMenu'
import { Link } from '@/i18n/navigation'

import React from 'react'
import ProfileMenu from '../../widgets/ProfileMenu'
import Image from 'next/image'
import AiLink from '../AiLink'

export default function Header() {
  return (
    <header className="flex justify-center border-b border-[#E5E5E5] bg-(--color-light-neutral) text-(--color-text-default)">
      <div className="flex w-[1200px] px-[40px] py-[15px]">
        <Link href="/catalog" className="text-[32px] font-semibold">
          <Image src="/logo.png" alt="Logo" width={208} height={50} />
        </Link>

        <div className="ml-auto flex items-center gap-[32px]">
          <LanguageMenu />
          <ProfileMenu />
          <AiLink />
        </div>
      </div>
    </header>
  )
}

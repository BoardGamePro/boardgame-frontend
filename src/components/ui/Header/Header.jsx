import LanguageMenu from '@/components/ui/LanguagesMenu'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import ProfileMenu from '../../widgets/ProfileMenu'

export default function Header() {
  const t = useTranslations('header')

  return (
    <header className="flex py-[11px] px-[calc((100%-1200px)/2)] bg-[var(--color-main)] text-[var(--color-light-neutral)]">
      <Link href="/catalog" className="text-white font-semibold text-[32px]">
        DiceBook
      </Link>

      <div className="ml-auto flex gap-[32px] items-center">
        <LanguageMenu />
        <ProfileMenu />
      </div>
    </header>
  )
}

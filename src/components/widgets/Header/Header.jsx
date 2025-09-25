import LanguageMenu from '@/components/ui/LanguagesMenu'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import ProfileMenu from '../ProfileMenu'

export default function Header() {
  const t = useTranslations('header')

  return (
    <header className="flex py-[9px] px-[calc((100%-1360px)/2)] bg-[var(--color-gray)]">
      <Link href="/catalog">
        <Image
          src="/icons/logo.svg"
          width={185}
          height={32}
          alt="logo"
          priority
        />
      </Link>

      <div className="ml-auto flex gap-[20px] items-center">
        <LanguageMenu />
        <Link href="/">
          <Image
            src="/icons/heart-icon.svg"
            width={36}
            height={36}
            alt="favorites"
          />
        </Link>
        <ProfileMenu />
      </div>
    </header>
  )
}

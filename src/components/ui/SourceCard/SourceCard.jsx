import Image from 'next/image'
import React from 'react'
import SourceRating from '../SourceRating'
import { Link } from '@/i18n/navigation'

export default function SourceCard({ sourceInfo }) {
  const { site, siteUrl, siteRating } = sourceInfo
  const sites = {
    bgg: {
      name: 'Board Game Geek',
      shortName: 'BGG',
    },
    tesera: { name: 'Tesera.ru', shortName: 'Tesera' },
  }
  return (
    <div className="mb-[10px] flex w-full items-center justify-between rounded-[4px] border border-[#C7C7C7] p-[16px]">
      <Link className="!flex items-center gap-[20px]" href={siteUrl}>
        <Image src={`/${site}.png`} alt={site} width={40} height={40} />
        <div>
          <h3 className="text-[18px] font-semibold">{sites[site].name}</h3>
          <p className="text-[12px]">{sites[site].shortName}</p>
        </div>
      </Link>
      <SourceRating rating={siteRating} />
    </div>
  )
}

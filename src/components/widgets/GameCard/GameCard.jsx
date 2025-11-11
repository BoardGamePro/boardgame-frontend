'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'
// viewMode='list'
export default function GameCard({ gameInfo, viewMode = 'grid' }) {
  // const { id, canonicalName, title, releaseYear, summaryOrDescription } =
  //   gameInfo

  // TODO: после изменения в api убрать
  const game = {
    ...gameInfo,
    rating: 3.4,
    minimumAge: 14,
    minimumPlayers: 3,
    maximumPlayers: 5,
  }
  const {
    id,
    canonicalName,
    title,
    summaryOrDescription,
    rating,
    minimumAge,
    minimumPlayers,
    maximumPlayers,
  } = game

  const t = useTranslations('gameCard')

  const [img, setImg] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GAMES_API_URL}/games/${id}/images/0`
      )
      const data = await res.json()

      setImg(data.content.original.url)
    }

    fetchData()
  }, [id])

  return (
    <div
      className={`flex w-full rounded-[10px] bg-white shadow-[0px_4px_4px_0px_rgba(142,141,208,0.16)] ${viewMode === 'grid' ? 'h-[441px] flex-col' : 'flex-row gap-[20px] p-[20px]'}`}
    >
      <div
        className={`relative flex-shrink-0 overflow-hidden ${viewMode === 'grid' ? 'h-[200px] w-full rounded-t-[10px]' : 'h-[210px] w-[210px] rounded-t-none'}`}
      >
        {img && (
          <Image src={img} alt={canonicalName} fill className="object-cover" />
        )}
      </div>

      <div
        className={`flex h-full flex-col gap-[15px] ${viewMode === 'grid' ? 'p-[20px_10px]' : 'w-full'}`}
      >
        <h2 className="line-clamp-1 text-lg font-semibold text-(--color-text-default)">
          {title}
        </h2>
        <div
          className={`flex ${viewMode === 'grid' ? 'justify-between' : 'gap-[20px]'}`}
        >
          <div className="flex gap-[10px]">
            <Image
              src="/icons/star.svg"
              width={15}
              height={15}
              alt="star-icon"
            />
            <p className="text-[16px]">{rating}</p>
          </div>
          <div className="flex gap-[10px]">
            <Image src="/icons/age.svg" width={15} height={15} alt="age-icon" />
            <p className="text-[16px]">{minimumAge}+</p>
          </div>
          <div className="flex gap-[10px]">
            <Image
              src="/icons/people.svg"
              width={15}
              height={15}
              alt="players-icon"
            />
            <p className="text-[16px]">
              {minimumPlayers}-{maximumPlayers} Players
            </p>
          </div>
        </div>
        <p className="line-clamp-4 text-[16px] text-[#86888A]">
          {summaryOrDescription}
        </p>
        <Link
          href={`/catalog/game/${canonicalName}`}
          className={`transition-custom mt-auto rounded-[4px] bg-(--color-accent) py-[9.5px] text-center text-[14px] font-medium text-white hover:opacity-90 ${viewMode === 'list' && 'w-[160px]'}`}
        >
          {t('linkButton')}
        </Link>
      </div>
    </div>
  )
}

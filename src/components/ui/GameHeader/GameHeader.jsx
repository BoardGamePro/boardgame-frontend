import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function GameHeader({ preview, gameinfo }) {
  const t = useTranslations('gameCard')

  const {
    title,
    releaseYear,
    summary,
    minimumAge,
    minimumPlayers,
    maximumPlayers,
    categories,
    rating,
  } = gameinfo
  return (
    <section className="mb-[10px] flex min-h-[350px] w-full gap-[20px] rounded-[8px] border border-[#E5E5E5] bg-white p-[20px] text-(--color-text-default) shadow-[0_4px_8px_0_rgba(142,141,208,0.16)]">
      <Image
        src={preview}
        width={200}
        height={0}
        alt={title}
        className="h-auto w-[200px] object-cover"
      />

      <div className="flex w-full flex-col gap-[30px]">
        <div className="w-full">
          <h1 className="mb-[15px] text-[32px] font-semibold">{title}</h1>
          {summary && (
            <p className="!text-[18px]/[1.4] text-(--color-text-gray)">
              {summary}
            </p>
          )}
        </div>
        <div className="flex gap-[50px]">
          <div className="flex gap-[10px]">
            <Image
              src="/icons/star.svg"
              width={20}
              height={20}
              alt="star-icon"
            />
            <p className="text-[16px]">
              {rating}
              <span className="text-[14px] text-(--color-text-gray)">/10</span>
            </p>
          </div>
          <div className="flex gap-[10px]">
            <Image src="/icons/age.svg" width={20} height={20} alt="age-icon" />
            <p className="text-[16px]">{minimumAge}+</p>
          </div>
          <div className="flex gap-[10px]">
            <Image
              src="/icons/people.svg"
              width={20}
              height={20}
              alt="players-icon"
            />
            <p className="text-[16px]">
              {t('playersCount', {
                playerFrom: minimumPlayers,
                playerTo: maximumPlayers,
              })}
            </p>
          </div>
          <div className="flex gap-[10px]">
            <Image
              src="/icons/calendar.svg"
              width={20}
              height={20}
              alt="calendar-icon"
            />
            <p className="text-[16px]">{releaseYear}</p>
          </div>
        </div>
        <div className="flex gap-[10px]">
          {categories?.map((category) => (
            <p
              key={category}
              className="rounded-[4px] bg-[#F2F2F2] px-[10px] py-[2px] !text-[12px]/[16px] text-(--color-dark-neutral)"
            >
              {category}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'
import React from 'react'

export default function GameHeader({ preview, gameinfo }) {
  console.log(gameinfo)

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
    <section className="mb-[10px] flex w-full gap-[20px] rounded-[8px] bg-[#242424] p-[10px] text-white">
      <Image src={preview} width={200} height={200} alt={title} />

      <div className="flex w-full flex-col gap-[20px]">
        <div className="flex w-full justify-between">
          <div>
            <h1 className="mb-[10px] text-[32px] font-semibold">
              {title} ({releaseYear})
            </h1>
            {summary && <p className="!text-[18px]/[1.4]">{summary}</p>}
          </div>

          <div className="ml-[25px] flex h-[38px] min-w-[41px] items-center justify-center bg-[url(/icons/star-icon.svg)] bg-no-repeat px-[12px] pt-[6px]">
            <p className="!text-[12px]/[16px]">{rating}</p>
          </div>
        </div>
        <div className="flex">
          <p className="border-r border-[[#CDCDCD]] px-[50px]">
            Age: {minimumAge}+
          </p>
          <p className="border-r border-[[#CDCDCD]] px-[50px]">
            {minimumPlayers}-{maximumPlayers} Players
          </p>
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

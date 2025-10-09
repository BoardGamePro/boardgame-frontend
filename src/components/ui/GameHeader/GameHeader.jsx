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
    <section className="w-full p-[10px] rounded-[8px] bg-[#242424] flex gap-[20px] text-white mb-[10px]">
      <Image src={preview} width={200} height={200} alt={title} />

      <div className="flex flex-col gap-[20px] w-full">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-[32px] font-semibold mb-[10px]">
              {title} ({releaseYear})
            </h1>
            {summary && <p className="!text-[18px]/[1.4]">{summary}</p>}
          </div>

          <div className="flex justify-center items-center min-w-[41px] h-[38px] bg-[url(/icons/star-icon.svg)] bg-no-repeat ml-[25px] pt-[6px] px-[12px]">
            <p className="!text-[12px]/[16px]">{rating}</p>
          </div>
        </div>
        <div className="flex">
          <p className="px-[50px] border-r border-[[#CDCDCD]]">
            Age: {minimumAge}+
          </p>
          <p className="px-[50px] border-r border-[[#CDCDCD]]">
            {minimumPlayers}-{maximumPlayers} Players
          </p>
        </div>
        <div className="flex gap-[10px]">
          {categories?.map((category) => (
            <p
              key={category}
              className="!text-[12px]/[16px] text-[var(--color-dark-neutral)] px-[10px] py-[2px] bg-[#F2F2F2] rounded-[4px]"
            >
              {category}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

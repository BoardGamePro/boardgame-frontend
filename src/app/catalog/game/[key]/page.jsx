'use client'

import { useGetGameByName } from '@/api/gamesApi/gamesApi'
import PageLayout from '@/components/layouts/PageLayout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function GamePage({ params }) {
  const { key } = params
  const { data: game, isLoading, isError } = useGetGameByName(key)

  return (
    <PageLayout>
      {isLoading ? (
        isError ? (
          !game ? (
            <h1>Игра не найдена</h1>
          ) : (
            <p className="mt-4 text-red-500">Ошибка при загрузке игры.</p>
          )
        ) : (
          <p className="mt-4">Загрузка игр...</p>
        )
      ) : (
        <>
          <h1 className="font-bold text-3xl">{game.title}</h1>
          <p className="text-[#86888A] text-lg mb-[15px]">
            {game.canonicalName}, {game.releaseYear}
          </p>
          <div className="flex gap-[100px] mb-[40px]">
            <div>
              <Image
                src={game.img}
                alt={game.canonicalName}
                className="w-[300px] h-[300px] object-cover"
              />
            </div>

            <div>
              <h2 className="mb-[5px] font-semibold text-lg">Информация</h2>
              <p>от {game.minimumAge} лет</p>
              <p>
                для {game.minimumPlayers} - {game.maximumPlayers} игроков
              </p>
              {game.sources.map(({ site, siteKey, siteUrl, siteRating }) => (
                <div className="flex" key={siteKey}>
                  <p className="mr-[15px]">{site} рейтинг: </p>
                  <Link
                    href={siteUrl}
                    className="text-[#0070c0] underline decoration-[#0070c0] hover:no-underline"
                    target="_blank"
                  >
                    {siteRating}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <h2 className="mb-[5px] font-semibold text-lg">Описание игры</h2>
          <p>{game.description}</p>
        </>
      )}
    </PageLayout>
  )
}

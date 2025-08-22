import { gameMocks } from '@/app/mocks/dataGame'
import PageLayout from '@/components/layouts/PageLayout'
import Image from 'next/image'
import React from 'react'

export default async function GamePage({ params }) {
  const { key } = await params

  const game = gameMocks.find(
    (g) => g.canonicalName === decodeURIComponent(key)
  )

  return (
    <PageLayout>
      {!game ? (
        <h1>Игра не найдена</h1>
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
            </div>
          </div>
          <h2 className="mb-[5px] font-semibold text-lg">Описание игры</h2>
          <p>{game.description}</p>
        </>
      )}
    </PageLayout>
  )
}

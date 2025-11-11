'use client'

import GameCard from '@/components/widgets/GameCard'
import React, { useState } from 'react'

export default function RecomendationSection({ games }) {
  const sliderSectionsCount = Math.ceil(games.length / 3)
  const [currentSliderSection, setCurrentSliderSection] = useState(0)

  return (
    <section className="px-[calc((100%-1200px)/2)] pt-[20px] pb-[40px]">
      <div className="flex justify-between">
        <div>
          <h2 className="mb-[10px] text-[32px] font-semibold">
            Recomended for You
          </h2>
          <p className="mb-[30px] !text-[18px]/[1.4] text-[#595959]">
            Personalized game suggestions based on your preferences
          </p>
        </div>
        {games.length > 3 && (
          <div className="flex gap-[10px]">
            <button
              type="button"
              className="transition-custom flex h-[50px] w-[50px] items-center justify-center rounded-[50%] border border-[#E5E5E5] bg-white hover:opacity-80 disabled:pointer-events-none disabled:opacity-50"
              disabled={currentSliderSection <= 0}
              onClick={() =>
                setCurrentSliderSection((prev) => (prev > 0 ? prev - 1 : prev))
              }
            >
              <svg
                width="11"
                height="20"
                viewBox="0 0 11 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 19L1 10L10 1"
                  stroke="#8A8894"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="transition-custom flex h-[50px] w-[50px] items-center justify-center rounded-[50%] border border-[#E5E5E5] bg-white hover:opacity-80 disabled:pointer-events-none disabled:opacity-50"
              disabled={currentSliderSection >= sliderSectionsCount - 1}
              onClick={() =>
                setCurrentSliderSection((prev) =>
                  prev < sliderSectionsCount - 1 ? prev + 1 : prev
                )
              }
            >
              <svg
                width="11"
                height="20"
                viewBox="0 0 11 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 19L10 10L1 1"
                  stroke="#8A8894"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      {!games || games.length === 0 ? (
        <p className="mt-4">games not Found</p>
      ) : (
        <div className="my-[30px] grid grid-cols-3 gap-[30px]">
          {games
            .slice(0 + 3 * currentSliderSection, 3 + 3 * currentSliderSection)
            .map((game) => (
              <GameCard key={game.canonicalName || game.id} gameInfo={game} />
            ))}
        </div>
      )}
      <div className="mx-auto flex justify-center gap-[20px]">
        {Array.from({ length: sliderSectionsCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            className="transition-custom h-[15px] w-[15px] rounded-[50%] bg-(--color-disabled) hover:opacity-80 disabled:pointer-events-none disabled:bg-(--color-accent)"
            disabled={index === currentSliderSection}
            onClick={() =>
              setCurrentSliderSection((prev) => (prev !== index ? index : prev))
            }
          ></button>
        ))}
      </div>
    </section>
  )
}

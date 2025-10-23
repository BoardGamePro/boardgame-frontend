'use client'

import React, { useState } from 'react'
import GameSection from '../GameSection'
import Image from 'next/image'
import { getPreviewImages } from '@/utils/imagesSlider'

export default function GameImagesSection({ gallery }) {
  const [currentImageId, setCurrentImageId] = useState(0)

  const previewsSize = 5
  const previews = getPreviewImages(gallery, previewsSize, currentImageId)

  return (
    <GameSection title="Images" sectionId="Images">
      <div className="relative mb-[20px] flex h-[450px] items-center justify-between">
        <button
          className="flex h-[60px] w-[60px] items-center justify-center"
          type="button"
          onClick={() => {
            setCurrentImageId((prev) => (prev > 0 ? prev - 1 : prev))
          }}
          disabled={currentImageId === 0}
        >
          <svg
            width="19"
            height="34"
            viewBox="0 0 19 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 32L2 17L17 2"
              stroke="#8A8894"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Image
          src={gallery[currentImageId].img}
          alt="current-image"
          fill
          priority
          unoptimized
          className="!relative max-w-[900px] object-contain"
        />
        <button
          className="flex h-[60px] w-[60px] items-center justify-center"
          type="button"
          onClick={() => {
            setCurrentImageId((prev) =>
              prev < gallery.length - 1 ? prev + 1 : prev
            )
          }}
          disabled={currentImageId === gallery.length - 1}
        >
          <svg
            width="19"
            height="34"
            viewBox="0 0 19 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L17 17L2 32"
              stroke="#8A8894"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <p className="mb-[20px] text-center text-[12px] text-(--color-text-gray)">
        Image {currentImageId + 1} of {gallery.length}
      </p>

      <div className="flex flex-wrap justify-center gap-[20px]">
        {previews.map(({ img, id }) => {
          const isCurrentImage = id === currentImageId

          return (
            <button
              key={id}
              type="button"
              onClick={() => setCurrentImageId(id)}
              className={`box-content h-[70px] w-[70px] overflow-hidden pb-[5px] ${
                isCurrentImage ? 'border-b-2 border-[#115EA3]' : ''
              }`}
            >
              <Image
                src={img}
                width={70}
                height={70}
                unoptimized
                alt="gallery-item"
                className="h-[70px] w-[70px] object-cover transition-transform duration-200 hover:scale-105"
              />
            </button>
          )
        })}
      </div>
    </GameSection>
  )
}

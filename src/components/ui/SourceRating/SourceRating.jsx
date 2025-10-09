import React from 'react'
import StarRating from '../StarRating'

export default function SourceRating({ rating }) {
  const stars = 5
  const filledStars = Math.max(0, Math.min(10, rating)) / 2

  return (
    <div className="flex gap-[4.5px]">
      <div className="flex gap-[5px]">
        {Array.from({ length: stars }).map((_, i) => {
          const fraction = Math.max(0, Math.min(1, filledStars - i))
          const percent = fraction * 100

          return (
            <div key={i} className="relative w-[14px] h-[13px]">
              <StarRating fill="#E5E7EB" />
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${percent}%` }}
              >
                <StarRating fill="#FF9F00" />
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-[12px] text-[#242424] font-semibold">{rating}</p>
    </div>
  )
}

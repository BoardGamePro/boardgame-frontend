'use client'

import { filterTypes } from '@/consts/filterTypes'
import React, { useState } from 'react'

export default function RateCategory() {
  const [rating, setRatig] = useState(filterTypes.rate.min)

  return (
    <div className="px-[20px]">
      <h3 className="mb-[10px] bg-[image:url('/icons/star-filter.svg')] bg-position-[left_center] bg-no-repeat pl-[26px] text-[18px] font-semibold">
        {filterTypes.rate.name}
      </h3>
      <fieldset className="flex items-center gap-[10px]">
        <input
          type="number"
          name="min-rate"
          value={rating}
          min={filterTypes.rate.min}
          onChange={(evt) =>
            setRatig((prev) =>
              evt.target.value >= filterTypes.rate.min &&
              evt.target.value <= filterTypes.rate.max
                ? evt.target.value
                : prev
            )
          }
          className="w-[80px] rounded-[100px] border border-[#C7C7C7] p-[6px_10px]"
        />
      </fieldset>
    </div>
  )
}

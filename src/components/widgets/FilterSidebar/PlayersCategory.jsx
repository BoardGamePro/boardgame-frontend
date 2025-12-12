'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { getFilterTypes } from '@/consts/filterTypes'

export default function PlayersCategory({ value, onChange }) {
  const t = useTranslations()
  const filterTypes = getFilterTypes(t)
  const playersCategory = filterTypes.players

  return (
    <div className="border-b border-[#C7C7C7] px-[20px]">
      <h3 className="mb-[10px] bg-[image:url('/icons/people.svg')] bg-position-[left_center] bg-no-repeat pl-[26px] text-[18px] font-semibold">
        {playersCategory.name}
      </h3>
      <fieldset className="mb-[20px] flex flex-col gap-[10px]">
        {playersCategory.values.map(({ text, value: val }, index) => (
          <label key={`${val}-${index}`} className="flex gap-[8px]">
            <input
              type="radio"
              value={val}
              onChange={() => onChange(val)}
              checked={val === value}
              name="players"
              className="h-[16px] w-[16px] accent-(--color-accent)"
            />
            <p className="text-[12px] text-(--color-dark-neutra)">{text}</p>
          </label>
        ))}
      </fieldset>
    </div>
  )
}

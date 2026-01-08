'use client'

import React, { useState } from 'react'
import Input from '../Input'
import { useSearchParams } from 'next/navigation'
import { usePathname, useRouter } from '@/i18n/navigation'

export default function GameSearchInput() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [value, setValue] = useState(searchParams.get('search') || '')

  const onSubmit = (evt) => {
    evt.preventDefault()

    const isCatalogPage = pathname.includes('/catalog')

    if (isCatalogPage) {
      const params = new URLSearchParams()
      params.set('search', value)
      params.set('page', 1)
      params.delete('sortBy')
      router.push(`${pathname}?${params.toString()}`)
    } else {
      router.push(`/catalog?search=${encodeURIComponent(value)}`)
    }
  }

  return (
    <form className="relative w-[350px]" onSubmit={onSubmit}>
      <Input
        placeholder="Search by title"
        icon="/icons/search.svg"
        roundedFull
        iconSize={24}
        opacityIcon={false}
        value={value}
        setValue={setValue}
        required={false}
      />

      {value.length > 0 && (
        <button
          type="reset"
          className="absolute top-1/2 right-[10px] -translate-y-1/2"
          onClick={() => setValue('')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.39705 4.55379L4.46967 4.46967C4.73594 4.2034 5.1526 4.1792 5.44621 4.39705L5.53033 4.46967L12 10.939L18.4697 4.46967C18.7626 4.17678 19.2374 4.17678 19.5303 4.46967C19.8232 4.76256 19.8232 5.23744 19.5303 5.53033L13.061 12L19.5303 18.4697C19.7966 18.7359 19.8208 19.1526 19.6029 19.4462L19.5303 19.5303C19.2641 19.7966 18.8474 19.8208 18.5538 19.6029L18.4697 19.5303L12 13.061L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303C4.17678 19.2374 4.17678 18.7626 4.46967 18.4697L10.939 12L4.46967 5.53033C4.2034 5.26406 4.1792 4.8474 4.39705 4.55379L4.46967 4.46967L4.39705 4.55379Z"
              fill="#616161"
            />
          </svg>
        </button>
      )}
    </form>
  )
}

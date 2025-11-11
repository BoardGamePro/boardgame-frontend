'use client'
import React, { useEffect, useMemo, useState } from 'react'

export default function GameNav() {
  const sections = useMemo(() => ['Description', 'Images', 'Sources'], [])
  const [active, setActive] = useState('Description')

  useEffect(() => {
    const handleScroll = () => {
      const center = window.innerHeight / 2
      let closestId = null
      let minDistance = Infinity

      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          const elCenter = rect.top + rect.height / 2
          const distance = Math.abs(center - elCenter)

          if (distance < minDistance) {
            minDistance = distance
            closestId = id
          }
        }
      })

      if (closestId) setActive(closestId)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <section>
      <ul className="mb-[25px] flex gap-[20px] text-(--color-neutral-foreground)">
        {sections.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`px-[8px] py-[6px] ${
                active === id &&
                'border-b-2 border-[#5368BF] font-semibold text-[#242424]'
              }`}
            >
              {id}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function GameNav() {
  const sections = ['Description', 'Sources', 'Images', 'Videos', 'Files']
  const [active, setActive] = useState('Description')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <section>
      <ul className="mb-[25px] flex gap-[20px] text-(--color-neutral-foreground)">
        {sections.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`rounded-[13px] px-[10px] py-[4px] font-medium ${
                active === id &&
                'border border-[#0F6CBD] bg-[#EBF3FC] text-[#115EA3]'
              }`}
            >
              {id}
            </a>
          </li>
        ))}
        <li>
          <button>
            <Image
              src="/icons/optional-icon.svg"
              alt="optional-icon"
              width={12.5}
              height={2.5}
            />
          </button>
        </li>
      </ul>
    </section>
  )
}

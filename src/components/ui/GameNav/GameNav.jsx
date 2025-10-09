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
  }, [])

  return (
    <section>
      <ul className="flex gap-[20px] text-[var(--color-neutral-foreground)] mb-[25px]">
        {sections.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`px-[10px] py-[4px] rounded-[13px] font-medium ${
                active === id &&
                'text-[#115EA3] border border-[#0F6CBD] bg-[#EBF3FC]'
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

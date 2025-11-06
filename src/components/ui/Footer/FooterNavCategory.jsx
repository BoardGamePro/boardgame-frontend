import { Link } from '@/i18n/navigation'
import React from 'react'

export default function FooterNavCategory({ category }) {
  return (
    <li>
      <h3 className="mb-[20px] !text-[18px]/[1.5]">{category.title}</h3>
      <ul className="flex flex-col gap-[10px]">
        {category.items.map(({ name, link }) => (
          <li key={name}>
            <Link
              href={link}
              className="transition-custom text-[12px] text-(--color-text-light-gray) hover:text-white"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

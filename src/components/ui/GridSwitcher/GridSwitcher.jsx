'use client'

import React from 'react'

export default function GridSwitcher({ viewMode, onChange }) {
  return (
    <div className="ml-auto">
      <button type="button" onClick={() => onChange('grid')}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3106_11409)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 2V7.33333H7.33333V2H2ZM6 6H3.33333V3.33333H6V6ZM2 8.66667V14H7.33333V8.66667H2ZM6 12.6667H3.33333V10H6V12.6667ZM8.66667 2V7.33333H14V2H8.66667ZM12.6667 6H10V3.33333H12.6667V6ZM8.66667 8.66667V14H14V8.66667H8.66667ZM12.6667 12.6667H10V10H12.6667V12.6667Z"
              fill={`${viewMode === 'grid' ? '#323232' : '#8A8894'}`}
            />
          </g>
          <defs>
            <clipPath id="clip0_3106_11409">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button type="button" onClick={() => onChange('list')}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3106_11410)">
            <path
              d="M2 8.66663H3.33333V7.33329H2V8.66663ZM2 11.3333H3.33333V9.99996H2V11.3333ZM2 5.99996H3.33333V4.66663H2V5.99996ZM4.66667 8.66663H14V7.33329H4.66667V8.66663ZM4.66667 11.3333H14V9.99996H4.66667V11.3333ZM4.66667 4.66663V5.99996H14V4.66663H4.66667Z"
              fill={`${viewMode === 'list' ? '#323232' : '#8A8894'}`}
            />
          </g>
          <defs>
            <clipPath id="clip0_3106_11410">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  )
}

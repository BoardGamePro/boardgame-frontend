'use client'

import { useState, useEffect, useRef } from 'react'

export default function ZoomControls({ zoomPluginInstance }) {
  const [zoomInput, setZoomInput] = useState('100')
  const [currentZoom, setCurrentZoom] = useState(100)
  const zoomInputRef = useRef(null)
  const lastScaleRef = useRef(1)

  const { ZoomIn, ZoomOut, CurrentScale, zoomTo } = zoomPluginInstance

  useEffect(() => {
    if (document.activeElement !== zoomInputRef.current) {
      setZoomInput(currentZoom.toString())
    }
  }, [currentZoom])

  const handleZoomSubmit = (e) => {
    e.preventDefault()
    const zoom = parseInt(zoomInput, 10)
    if (!isNaN(zoom) && zoom >= 10 && zoom <= 500) {
      zoomTo(zoom / 100)
    } else {
      setZoomInput(currentZoom.toString())
    }
    zoomInputRef.current?.blur()
  }

  return (
    <div className="flex items-center gap-[15px]">
      <ZoomOut>
        {(props) => (
          <button
            type="button"
            className="h-[18px] w-[18px]"
            onClick={props.onClick}
          >
            <svg
              width="18"
              height="2"
              viewBox="0 0 18 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 0H0V1.50001H18V0Z" fill="#212121" />
            </svg>
          </button>
        )}
      </ZoomOut>

      <div className="flex w-[69px] items-center rounded-[100px] border border-(--color-text-light-gray-border) px-[12px] py-[9px]">
        <form onSubmit={handleZoomSubmit}>
          <input
            ref={zoomInputRef}
            type="text"
            value={zoomInput}
            onChange={(e) => setZoomInput(e.target.value)}
            onBlur={() => setZoomInput(currentZoom.toString())}
            className="w-full text-end"
          />
        </form>
        <span className="">%</span>
      </div>

      <CurrentScale>
        {(props) => {
          const newZoom = Math.round(props.scale * 100)
          if (Math.abs(props.scale - lastScaleRef.current) > 0.001) {
            lastScaleRef.current = props.scale
            if (newZoom !== currentZoom) {
              setTimeout(() => setCurrentZoom(newZoom), 0)
            }
          }
          return null
        }}
      </CurrentScale>

      <ZoomIn>
        {(props) => (
          <button
            type="button"
            className="h-[18px] w-[18px]"
            onClick={props.onClick}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.25 8.25H9.75V0.75C9.75 0.551088 9.67098 0.360322 9.53033 0.21967C9.38968 0.0790176 9.19891 0 9 0V0C8.80109 0 8.61032 0.0790176 8.46967 0.21967C8.32902 0.360322 8.25 0.551088 8.25 0.75V8.25H0.75C0.551088 8.25 0.360322 8.32902 0.21967 8.46967C0.0790176 8.61032 0 8.80109 0 9H0C0 9.19891 0.0790176 9.38968 0.21967 9.53033C0.360322 9.67098 0.551088 9.75 0.75 9.75H8.25V17.25C8.25 17.4489 8.32902 17.6397 8.46967 17.7803C8.61032 17.921 8.80109 18 9 18C9.19891 18 9.38968 17.921 9.53033 17.7803C9.67098 17.6397 9.75 17.4489 9.75 17.25V9.75H17.25C17.4489 9.75 17.6397 9.67098 17.7803 9.53033C17.921 9.38968 18 9.19891 18 9C18 8.80109 17.921 8.61032 17.7803 8.46967C17.6397 8.32902 17.4489 8.25 17.25 8.25Z"
                fill="#212121"
              />
            </svg>
          </button>
        )}
      </ZoomIn>
    </div>
  )
}

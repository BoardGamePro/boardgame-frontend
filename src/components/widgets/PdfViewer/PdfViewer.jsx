'use client'

import { useEffect, useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import { getFilePlugin } from '@react-pdf-viewer/get-file'
import { printPlugin } from '@react-pdf-viewer/print'
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation'

import ZoomControls from './ZoomControls'
import PdfActions from './PdfActions'
import ThumbnailSidebar from './ThumbnailSidebar'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/thumbnail/lib/styles/index.css'
import '@react-pdf-viewer/zoom/lib/styles/index.css'
import '@react-pdf-viewer/page-navigation/lib/styles/index.css'
import NoteList from '../NoteList'

export default function PdfViewer({ fileUrl, title, gameName }) {
  const [mounted, setMounted] = useState(false)
  const [page, setPage] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const thumbnailPluginInstance = thumbnailPlugin()
  const zoomPluginInstance = zoomPlugin()
  const getFilePluginInstance = getFilePlugin()
  const printPluginInstance = printPlugin()
  const pageNavigationPluginInstance = pageNavigationPlugin()

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-[calc(100vh-81px)] flex-col">
      <div className="my-[8px] flex items-center justify-between">
        <h1 className="text-[16px]/1.5">{title}</h1>
        <ZoomControls zoomPluginInstance={zoomPluginInstance} />
        <PdfActions
          getFilePluginInstance={getFilePluginInstance}
          printPluginInstance={printPluginInstance}
        />
      </div>

      <div className="flex overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="flex max-w-[80%] flex-1 overflow-hidden border border-[#E5E5E5] bg-transparent">
            <ThumbnailSidebar
              thumbnailPluginInstance={thumbnailPluginInstance}
              pageNavigationPluginInstance={pageNavigationPluginInstance}
            />

            <main className="mx-auto w-full overflow-hidden">
              <Viewer
                fileUrl={fileUrl}
                plugins={[
                  thumbnailPluginInstance,
                  zoomPluginInstance,
                  getFilePluginInstance,
                  printPluginInstance,
                  pageNavigationPluginInstance,
                ]}
                onPageChange={(e) => {
                  setPage(e.currentPage + 1)
                }}
              />
            </main>
          </div>
        </Worker>
        <NoteList page={page} gameName={gameName} />
      </div>
    </div>
  )
}

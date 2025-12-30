'use client'

import PageNavigation from './PageNavigation'

export default function ThumbnailSidebar({
  thumbnailPluginInstance,
  pageNavigationPluginInstance,
}) {
  const { Thumbnails } = thumbnailPluginInstance

  return (
    <aside className="w-[200px] overflow-y-auto border-r border-[#E5E5E5]">
      <PageNavigation
        pageNavigationPluginInstance={pageNavigationPluginInstance}
      />
      <div className="p-[20px]">
        <Thumbnails />
      </div>
    </aside>
  )
}
